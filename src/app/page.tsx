"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { CompleteModal, DownloadModal } from "@/components/modals";
import Panel from "@/components/panel";
import Section from "@/components/section";
import { SelectionView, TraineeView } from "@/components/views";
import { EMPTY_SELECTION } from "@/constants";
import { decodeSelection, encodeSelection, getLanguageId } from "@/utils";
import { CONTENTS } from "@/i18n";

export default function Home() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const decodedSelected = decodeSelection(searchParams.get("code"));
  const lang = getLanguageId(searchParams.get("lang"));
  const [selected, setSelected] = useState<number[]>(decodedSelected || EMPTY_SELECTION);
  const selectionCode = encodeSelection(selected);
  const [completeModalIsOpen, setCompleteModalIsOpen] = useState<boolean>(false);
  const [downloadModalIsOpen, setDownloadModalIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const currentCode = new URL(window.location.toString()).searchParams.get("code");
    if (selectionCode !== currentCode) {
      if (selectionCode === "26Uw2Vvq8EnJ7hRG") {
        if (currentCode !== null) {
          // Reset URL if no trainees
          router.push(pathname, { scroll: false });
        }
      } else {
        // Set code in params
        const currentUrlParams = new URLSearchParams(searchParams);
        currentUrlParams.set("code", selectionCode);
        router.push(`${pathname}?${currentUrlParams.toString()}`, { scroll: false });
      }
    }
  }, [selectionCode, pathname, router, searchParams]);

  return (
    <main className="h-full">
      <Header />
      <Section>
        <h2
          className="mb-2 text-pd-pink-400 text-base sm:text-xl font-bold break-keep"
        >{CONTENTS[lang]["home"]["title"]}
        </h2>
        <div
          className="text-pd-gray-400 text-center text-sm sm:text-base whitespace-pre-line break-keep"
        >{CONTENTS[lang]["home"]["description"]}</div>
      </Section>
      <div
        className="mb-10 sm:mb-20 px-4 text-pd-gray-400 flex
        flex-col sm:flex-row gap-4 sm:gap-8 justify-center items-center sm:items-stretch"
      >
        <Panel>
          <TraineeView selected={selected} setSelected={setSelected} />
        </Panel>
        <Panel>
          <SelectionView
            selected={selected}
            setSelected={setSelected}
            setCompleteModalIsOpen={setCompleteModalIsOpen}
            setDownloadModalIsOpen={setDownloadModalIsOpen}
          />
        </Panel>
      </div>
      <Footer />
      <CompleteModal isOpen={completeModalIsOpen} setIsOpen={setCompleteModalIsOpen} />
      <DownloadModal isOpen={downloadModalIsOpen} setIsOpen={setDownloadModalIsOpen} />
    </main>
  );
}