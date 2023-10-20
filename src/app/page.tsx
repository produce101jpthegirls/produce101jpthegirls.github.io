"use client";

import Footer from "@/components/footer";
import Header from "@/components/header";
import { StableLink } from "@/components/links";
import { CompleteModal, DownloadModal } from "@/components/modals";
import Panel from "@/components/panel";
import Section from "@/components/section";
import { SelectionView, TraineeView } from "@/components/views";
import { FIREBASE_CONFIG } from "@/constants";
import { useSiteContext } from "@/context/site";
import { CONTENTS } from "@/i18n";
import { initializeApp } from "firebase/app";
import { get, getDatabase, ref } from "firebase/database";
import Link from "next/link";
import { useEffect, useState } from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type NewsItem = {
  shortText: string;
  longText: string;
  stableLink?: string;
  link?: string;
};

type NewsResponse = {
  items: NewsItem[];
};

export default function Home() {
  const [completeModalIsOpen, setCompleteModalIsOpen] = useState<boolean>(false);
  const [downloadModalIsOpen, setDownloadModalIsOpen] = useState<boolean>(false);
  const { language, isDev } = useSiteContext();
  const [ newsItems, setNewsItems ] = useState<NewsItem[]>([]);

  const refPath = isDev ? "/data/dev/news" : "/data/news";

  useEffect(() => {
    initializeApp(FIREBASE_CONFIG);
    const db = getDatabase();
    get(ref(db, refPath))
      .then((snapshot) => {
        const response: NewsResponse = snapshot.val();
        if (response) {
          setNewsItems(response.items);
          console.log(response.items);
        }
      });
  }, [refPath]);

  return (
    <main className="h-full">
      <Header />
        <div className={`mx-4 sm:mx-auto sm:max-w-[980px] flex items-center gap-4 transition-all ${newsItems.length > 0 ? "border-b h-[43px] sm:h-[59px] py-2 sm:py-4" : "h-[0px] py-0"}`}>
          {newsItems.length > 0 && (
            <>
              <span className="text-sm sm:text-base text-pd-pink-400">NEWS</span>
              <Slider
                adaptiveHeight
                infinite
                vertical
                autoplay
                autoplaySpeed={6000}
                arrows={false}
              >
                {newsItems.map((item, index) => (
                  item.stableLink ? (
                    <StableLink key={index} className="text-sm sm:text-base text-pd-gray-400 hover:text-pd-pink-100 flex gap-2 items-center min-h-[24px]" pathname={item.stableLink}>
                      <span className="sm:hidden">{item.shortText}</span>
                      <span className="hidden sm:inline">{item.longText}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 hidden sm:block">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" />
                      </svg>
                    </StableLink>
                  ) : item.link ? (
                    <Link key={index} className="text-sm sm:text-base text-pd-gray-400 hover:text-pd-pink-100 flex gap-2 items-center" href={item.link} target="_blank">
                      <span className="sm:hidden">{item.shortText}</span>
                      <span className="hidden sm:inline">{item.longText}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 hidden sm:block">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" />
                      </svg>
                    </Link>
                  ) : (
                    <div key={index} className="text-sm sm:text-base text-pd-gray-400 flex gap-2 items-center">
                      <span className="sm:hidden">{item.shortText}</span>
                      <span className="hidden sm:inline">{item.longText}</span>
                    </div>
                  )
                ))}
              </Slider>
            </>
          )}
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