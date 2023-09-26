"use client";
import bs58 from "bs58";
import { Noto_Sans_JP } from "next/font/google";
import { FC, ReactNode, useEffect, useState } from "react";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { SelectionView, TraineeView } from "@/components/trainee";

const noto_sans_jp = Noto_Sans_JP({
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

type PanelProps = {
  children: ReactNode[]|ReactNode|string;
}

const Panel: FC<PanelProps> = ({ children }) => {
  return (
    <div
      className="w-full sm:w-[480px] border border-gray-100 shadow
      rounded-2xl my-2 sm:my-0 text-sm sm:text-base overflow-hidden"
    >{children}</div>
  )
};

const encodeSelection = (selected: number[]): string => {
  return bs58.encode(selected);
};

const decodeSelection = (code: any): number[]|undefined => {
  if (typeof code === "string") {
    try {
      return Array.from(bs58.decode(code));
    } catch {
      return undefined;
    }
  }
  return undefined;
};

export default function Home({ params, searchParams }: {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined },
}) {
  const decodedSelected = decodeSelection(searchParams["code"]);
  const [selected, setSelected] = useState<number[]>(decodedSelected || [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]);
  const selectionCode = encodeSelection(selected);

  // useEffect(() => {
  //   console.log(selected);
  //   console.log(selectionCode);
  // }, [selected]);

  useEffect(() => {
    // console.log(searchParams)
  }, []);

  useEffect(() => {
    const currentCode = new URL(window.location.toString()).searchParams.get("code");
    if (selectionCode !== currentCode) {
      if (selectionCode === "26Uw2Vvq8EnJ7hRG") {
        // Reset URL if no trainees
        window.history.replaceState({}, "", location.pathname);
      } else {
        // Set code in params
        window.history.replaceState({}, "", "?code=" + selectionCode);
      }
    }
  }, [selectionCode]);

  return (
    <main className={`${noto_sans_jp.className} h-full`}>
      <Header />
      <div
        className="text-pd-gray-400 flex flex-col sm:flex-row gap-0 sm:gap-8
        justify-center items-center sm:items-stretch my-4 sm:my-20 px-4"
      >
        <Panel>
          <TraineeView selected={selected} setSelected={setSelected} />
        </Panel>
        <Panel>
          <SelectionView selected={selected} setSelected={setSelected} />
        </Panel>
      </div>
      <Footer />
    </main>
  )
}