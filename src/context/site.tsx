"use client";

import { EMPTY_SELECTION } from "@/constants";
import { decodeSelection, encodeSelection, getLanguageId } from "@/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Dispatch, FC, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from "react";

type SiteContextProps = {
  selected: number[];
  setSelected: Dispatch<SetStateAction<number[]>>;
  lang: string;
  setLang: Dispatch<SetStateAction<string>>;
  language: string;
};

const SiteContext = createContext<SiteContextProps>({
  selected: [],
  setSelected: () => { },
  lang: "",
  setLang: () => { },
  language: "ja",
});

type SiteContextProviderProps = {
  children: ReactNode[] | ReactNode | string;
};

export const SiteContextProvider: FC<SiteContextProviderProps> = ({ children }) => {
  // Get URL
  const router = useRouter();
  const searchParams = useSearchParams();
  const decodedSelected = decodeSelection(searchParams.get("code"));
  const initLang = searchParams.get("lang") ?? "";

  // Initailize states
  const [selected, setSelected] = useState<number[]>(decodedSelected || EMPTY_SELECTION);
  const [lang, setLang] = useState<string>(initLang);
  const language = getLanguageId(lang);

  const selectionCode = encodeSelection(selected);

  // Update URL search params
  useEffect(() => {
    const currentSearchParams = new URL(window.location.toString()).searchParams;
    const currentCode = currentSearchParams.get("code");
    if (selectionCode !== currentCode) {
      if (selectionCode === "26Uw2Vvq8EnJ7hRG") {
        if (currentCode !== null) {
          // Reset URL if no trainees
          router.push(window.location.pathname, { scroll: false });
        }
      } else {
        // Set code in params
        currentSearchParams.set("code", selectionCode);
        router.push(`${window.location.pathname}?${currentSearchParams.toString()}`, { scroll: false });
      }
    }
  }, [selectionCode, router]);

  useEffect(() => {
    const currentSearchParams = new URL(window.location.toString()).searchParams;
    const currentLang = currentSearchParams.get("lang");
    if (lang !== "" && lang !== currentLang) {
      // Set lang in params
      currentSearchParams.set("lang", lang);
      router.push(`${window.location.pathname}?${currentSearchParams.toString()}`, { scroll: false });
    }
  }, [lang, router]);

  return (
    <SiteContext.Provider value={{ selected, setSelected, lang, setLang, language }}>
      {children}
    </SiteContext.Provider>
  )
};

export const useSiteContext = () => useContext(SiteContext);
