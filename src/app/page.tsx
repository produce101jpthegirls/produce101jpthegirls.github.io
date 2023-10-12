"use client";

import Footer from "@/components/footer";
import Header from "@/components/header";
import { StableLink } from "@/components/links";
import { CompleteModal, DownloadModal } from "@/components/modals";
import Panel from "@/components/panel";
import Section from "@/components/section";
import { SelectionView, TraineeView } from "@/components/views";
import { useSiteContext } from "@/context/site";
import { CONTENTS } from "@/i18n";
import { useState } from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Home() {
  const [completeModalIsOpen, setCompleteModalIsOpen] = useState<boolean>(false);
  const [downloadModalIsOpen, setDownloadModalIsOpen] = useState<boolean>(false);
  const { language } = useSiteContext();

  return (
    <main className="h-full">
      <Header />
      <div className="mx-4 sm:mx-auto sm:max-w-[980px] py-2 sm:py-4 flex items-center gap-4 border-b">
        <span className="text-sm sm:text-base text-pd-pink-400">NEWS</span>
        <Slider
          className=""
          adaptiveHeight
          variableWidth
          infinite
          vertical
          autoplay
          autoplaySpeed={6000}
          arrows={false}
        >
          {[
            (<StableLink className="text-sm sm:text-base text-pd-gray-400 hover:text-pd-pink-100 flex gap-2 items-center" pathname="/analytics/overview">
                <span className="sm:hidden">The analytics of EP2 are available!</span>
                <span className="hidden sm:inline">The video analytics of Episode #2 are available!</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 hidden sm:block">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" />
                </svg>
              </StableLink>),
          ].map((content, index) => (
            <p key={index}>{content}</p>
          ))}
        </Slider>
      </div>
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