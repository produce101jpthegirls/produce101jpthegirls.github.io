"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { CompleteModal, DownloadModal } from "@/components/modals";
import Panel from "@/components/panel";
import { SelectionView, TraineeView } from "@/components/views";
import { decodeSelection, encodeSelection } from "@/utils";

const EMPTY = [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255];

export default function Home() {
  const searchParams = useSearchParams();
  const decodedSelected = decodeSelection(searchParams.get("code"));
  const [selected, setSelected] = useState<number[]>(decodedSelected || EMPTY);
  const selectionCode = encodeSelection(selected);
  const [completeModalIsOpen, setCompleteModalIsOpen] = useState<boolean>(false);
  const [downloadModalIsOpen, setDownloadModalIsOpen] = useState<boolean>(false);

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
    <main className="h-full">
      <Header />
      <div className="my-12 sm:my-20 px-4 text-center">
        <h2
          className="text-pd-pink-400 text-base sm:text-xl font-bold mb-6"
        >PRODUCE 101 JAPAN THE GIRLS RANKER
        </h2>
        <div
          className="text-pd-gray-400 text-center text-sm sm:text-base"
        >
          初めて羽ばたいた101人の少女たちが
          <br className="sm:hidden" />
          デビューを目指して集ました
          <br />
          <br className="sm:hidden" />
          夢の花道に向かって駆け抜ける
          <br className="sm:hidden" />
          彼女たちを応援していきましょう
        </div>
      </div>
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
  )
}