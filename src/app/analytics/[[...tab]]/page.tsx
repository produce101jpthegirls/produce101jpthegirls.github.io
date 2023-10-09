"use client";

import Footer from "@/components/footer";
import Header from "@/components/header";
import { StableLink } from "@/components/links";
import MyPick from "@/components/my_pick";
import Section from "@/components/section";
import { AnalyticsData, AnalyticsDataResponse, AnalyticsDataRow, TopNDataTable, TraineeDataTable } from "@/components/tables";
import Toggle from "@/components/toggle";
import { getItemThumbnail } from "@/components/views";
import { TRAINEES, firebaseConfig } from "@/constants";
import { useSiteContext } from "@/context/site";
import { CONTENTS } from "@/i18n";
import { isCompletedSelection, parseHumanNumber } from "@/utils";
import { initializeApp } from "firebase/app";
import { get, getDatabase, ref } from "firebase/database";
import { GetStaticPaths } from "next/types";
import { useEffect, useState } from "react";
// import mockDb from "@/data/mock_db.json";

const preprocessAnalyticsResponse = (items: AnalyticsDataRow[], language: string, calcRank?: boolean) => {
  // Set display names
  items.forEach((row) => {
    const m = /(?<jp>.+)\((?<en>.+)\)/.exec(row.name);
    return row.displayName = row.id + " / " + (language === "en" ? m?.groups?.en : m?.groups?.jp);
  });
  // Set profile thumbnails
  items.forEach((row, index) => {
    row.img = getItemThumbnail(TRAINEES[index]);
  })
  // Calculate ranking
  if (calcRank) {
    items.sort((a, b) => parseHumanNumber(b.fancamCount) - parseHumanNumber(a.fancamCount));
    items.forEach((item, index) => item.fancamCountRank = index + 1);
    items.sort((a, b) => parseHumanNumber(b.prCount) - parseHumanNumber(a.prCount));
    items.forEach((item, index) => item.prCountRank = index + 1);
    items.sort((a, b) => parseHumanNumber(b.eyeContactCount) - parseHumanNumber(a.eyeContactCount));
    items.forEach((item, index) => item.eyeContactCountRank = index + 1);
    items.sort((a, b) => parseInt(a.id) - parseInt(b.id));
  }
};

export const getStaticPaths = (async () => {
  return {
    paths: [
      {
        params: {
          tab: "",
        },
      },
      {
        params: {
          tab: "overview",
        },
      },
      {
        params: {
          tab: "details",
        },
      },
    ],
    fallback: false,  // If fallback is false, then any paths not returned by getStaticPaths will result in a 404 page.
  }
}) satisfies GetStaticPaths;

export default function Analytics({ params }: { params: { tab: string[] } }) {
  const tab = params.tab ? params.tab[0] : "overview";
  const { selected, language } = useSiteContext();
  const [pending, setPending] = useState<boolean>(true);
  const [data, setData] = useState<AnalyticsData | undefined>(undefined);
  const [updatedAt, setUpdatedAt] = useState<number | undefined>(undefined);
  const [filterEnabled, setFilterEnabled] = useState<boolean>(false);

  const isCompleted = selected && isCompletedSelection(selected);
  let selectedTrainees: Trainee[] | undefined = undefined;
  if (selected !== undefined && isCompletedSelection(selected)) {
    selectedTrainees = selected.map((index) => TRAINEES[index]);
  }

  useEffect(() => {
    // setPending(false);
    // const response: AnalyticsDataResponse = mockDb.data.analytics;
    // const items = response.items;
    // preprocessAnalyticsResponse(items, language, true);
    // setData(items);
    // setUpdatedAt(response.updatedAt);
    initializeApp(firebaseConfig);
    const db = getDatabase();
    get(ref(db, "/data/analytics"))
      .then((snapshot) => {
        const response: AnalyticsDataResponse = snapshot.val();
        const items = response.items;
        preprocessAnalyticsResponse(items, language, true);
        setPending(false);
        setData(items);
        setUpdatedAt(response.updatedAt);
      });
  }, []);

  useEffect(() => {
    if (data) {
      preprocessAnalyticsResponse(data, language, false);
      setData(data);
    }
  }, [data, language]);

  return (
    <main className="h-full">
      <Header />
      <div className="bg-body-background bg-contain sm:bg-cover">
        {selectedTrainees && <MyPick selectedTrainees={selectedTrainees} />}
        <Section>
          <h2 className="mb-2 text-pd-pink-400 font-bold text-base sm:text-xl break-keep"
          >{CONTENTS[language]["analytics"]["title"]}</h2>
          <p className="text-pd-gray-400 text-sm sm:text-base whitespace-pre-line break-keep"
          >{CONTENTS[language]["analytics"]["description"]}</p>
        </Section>
        <div className="px-4 sm:px-20 text-pd-gray-400">
          <div className="px-4 py-4 sm:p-8 mx-auto max-w-[1200px] bg-white border border-4 sm:border-8 border-pd-pink-400">
            <div className="mb-3 sm:mb-6 flex justify-between sm:items-center flex-col sm:flex-row gap-3">
              <h3 className="text-pd-pink-400 font-bold text-base sm:text-xl"
              >{tab === "overview" ? CONTENTS[language]["analytics"]["overviewTab"]["title"] : CONTENTS[language]["analytics"]["detailsTab"]["title"]}</h3>
              {isCompleted && (
                <div className="flex items-center gap-2 sm:flex-row-reverse">
                  <Toggle
                    enabled={filterEnabled}
                    setEnabled={setFilterEnabled}
                    size="h-[20px] w-[40px]"
                    buttonSize="h-[16px] w-[16px]"
                    translate="translate-x-5"
                  />
                  <label className="text-pd-gray-300 text-sm">SHOW MY TOP 11</label>
                </div>
              )}
            </div>
            <div className="mb-3">
              <p className="mb-3">
                <span>{tab === "overview" ? "Check out the details" : "Check out the overview"}</span>
                {" "}
                <StableLink
                  className="text-pd-pink-400 hover:text-pd-pink-100"
                  pathname={tab === "overview" ? "/analytics/details" : "/analytics/overview"}
                >here</StableLink>
              </p>
              {updatedAt && (
                <p className="mb-3 text-sm">{
                  CONTENTS[language]["analytics"]["updatedAtFn"](
                    new Intl.DateTimeFormat("en-US", {
                      "year": "numeric",
                      "month": "short",
                      "day": "numeric",
                      "hour": "2-digit",
                      "minute": "2-digit",
                    },
                  ).format(new Date(updatedAt)))
                }</p>
              )}
            </div>
            {tab === "overview" ? (
              <div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <TopNDataTable
                  pending={pending}
                  data={data?.map((row) => ({
                    displayName: row.displayName ?? "",
                    img: {
                      src: row.img?.src ?? "",
                      alt: row.img?.alt ?? "",
                    },
                    rank: row.eyeContactCountRank ?? -1,
                    viewCount: row.eyeContactCount,
                    videoId: row.eyeContactVideoId,
                  })) ?? []}
                  n={11}
                  filterSelected={filterEnabled}
                  title={CONTENTS[language]["analytics"]["overviewTab"]["table"]["titles"][2]}
                />
                <TopNDataTable
                  pending={pending}
                  data={data?.map((row) => ({
                    displayName: row.displayName ?? "",
                    img: {
                      src: row.img?.src ?? "",
                      alt: row.img?.alt ?? "",
                    },
                    rank: row.prCountRank ?? -1,
                    viewCount: row.prCount,
                    videoId: row.prVideoId,
                  })) ?? []}
                  n={11}
                  filterSelected={filterEnabled}
                  title={CONTENTS[language]["analytics"]["overviewTab"]["table"]["titles"][1]}
                />
                <TopNDataTable
                  pending={pending}
                  data={data?.map((row) => ({
                    displayName: row.displayName ?? "",
                    img: {
                      src: row.img?.src ?? "",
                      alt: row.img?.alt ?? "",
                    },
                    rank: row.fancamCountRank ?? -1,
                    viewCount: row.fancamCount,
                    videoId: row.fancamVideoId,
                  })) ?? []}
                  n={11}
                  filterSelected={filterEnabled}
                  title={CONTENTS[language]["analytics"]["overviewTab"]["table"]["titles"][0]}
                />
              </div>
            ) : (
              <TraineeDataTable
                pending={pending}
                data={data ?? []}
                filterSelected={filterEnabled}
              />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
