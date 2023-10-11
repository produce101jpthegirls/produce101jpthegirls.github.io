"use client";

import Footer from "@/components/footer";
import Header from "@/components/header";
import { CompleteModal, DownloadModal } from "@/components/modals";
import Panel from "@/components/panel";
import Section from "@/components/section";
import { SelectionView, TraineeView } from "@/components/views";
import { useSiteContext } from "@/context/site";
import { CONTENTS } from "@/i18n";
import { useState } from "react";
import Slider from "react-slick";

export default function Home() {
  const [completeModalIsOpen, setCompleteModalIsOpen] = useState<boolean>(false);
  const [downloadModalIsOpen, setDownloadModalIsOpen] = useState<boolean>(false);
  const { language } = useSiteContext();

  return (
    <main className="h-full">
      <Header />
      <Section>
        <Slider>
          {[
            "News 1",
            "News 2",
            "News 3",
          ].map((content, index) => (
            <p key={index}>{content}</p>
          ))}
        </Slider>
      </Section>
      <Section>
        <h2
          className="mb-2 text-pd-pink-400 text-base sm:text-xl font-bold break-keep"
        >{CONTENTS[language]["home"]["title"]}
        </h2>
        <div
          className="text-pd-gray-400 text-center text-sm sm:text-base whitespace-pre-line break-keep"
        >{CONTENTS[language]["home"]["description"]}</div>
      </Section>
      <div
        className="mb-10 sm:mb-20 px-4 text-pd-gray-400 flex
        flex-col sm:flex-row gap-4 sm:gap-8 justify-center items-center sm:items-stretch"
      >
        <Panel>
          <TraineeView />
        </Panel>
        <Panel>
          <SelectionView
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