"use client";

import Footer from "@/components/footer";
import Header from "@/components/header";
import { StableLink } from "@/components/links";
import MyPick from "@/components/my_pick";
import Section from "@/components/section";
import { AnalyticsDataResponse, AnalyticsTable, DetailedDataTable, TopNDataTable } from "@/components/tables";
import Toggle from "@/components/toggle";
import { getItemThumbnail } from "@/components/views";
import { TRAINEES, firebaseConfig } from "@/constants";
import { useSiteContext } from "@/context/site";
import { CONTENTS } from "@/i18n";
import { isCompletedSelection } from "@/utils";
import { initializeApp } from "firebase/app";
import { get, getDatabase, ref } from "firebase/database";
import { useEffect, useState } from "react";
// import mockDb from "@/data/mock_db.json";

const id2trainees = TRAINEES.reduce((acc, cur, i) => {
  acc[cur.code] = cur;
  return acc;
}, {} as { [id: string]: any });

const preprocessTable = (table: AnalyticsTable) => {
  // Set profile thumbnails
  table.data.forEach((row) => {
    row.trainees?.forEach((trainee) => {
      trainee.img = getItemThumbnail(id2trainees[trainee.id]);
    });
  });
};

export default function Analytics({ params }: { params: { tab: string } }) {
  const tab = params.tab;
  const { selected, language } = useSiteContext();
  const [pending, setPending] = useState<boolean>(true);
  const [response, setResponse] = useState<AnalyticsDataResponse | undefined>(undefined);
  const [filterEnabled, setFilterEnabled] = useState<boolean>(false);

  const isCompleted = selected && isCompletedSelection(selected);
  let selectedTrainees: Trainee[] | undefined = undefined;
  if (selected !== undefined && isCompletedSelection(selected)) {
    selectedTrainees = selected.map((index) => TRAINEES[index]);
  }

  useEffect(() => {
    // setPending(false);
    // const response: AnalyticsDataResponse = mockDb.data.dev.analytics;
    // response.sections.forEach((section) => {
    //   section.tables.forEach((table) => preprocessTable(table));
    // });
    // setResponse(response);
    initializeApp(firebaseConfig);
    const db = getDatabase();
    get(ref(db, "/data/analytics"))
      .then((snapshot) => {
        const response: AnalyticsDataResponse = snapshot.val();
        response.sections.forEach((section) => {
          section.tables.forEach((table) => preprocessTable(table));
        });
        setResponse(response);
        setPending(false);
      });
  }, []);

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
                {tab === "overview" && (
                  <>
                    <span>The following show the video analytics of the top 11 videos in each category.</span>
                    {" "}
                  </>
                )}
                <span>{tab === "overview" ? "Also check out the detailed analytics" : "Check out the overview"}</span>
                {" "}
                <StableLink
                  className="text-pd-pink-400 hover:text-pd-pink-100"
                  pathname={tab === "overview" ? "/analytics/details" : "/analytics/overview"}
                >here</StableLink>
              </p>
              {response?.updatedAt && (
                <p className="mb-3 text-sm">{
                  CONTENTS[language]["analytics"]["updatedAtFn"](
                    new Intl.DateTimeFormat("en-US", {
                      "year": "numeric",
                      "month": "short",
                      "day": "numeric",
                      "hour": "2-digit",
                      "minute": "2-digit",
                    },
                    ).format(new Date(response.updatedAt)))
                }</p>
              )}
            </div>
            {tab === "overview" ? (
              pending ? (
                <div>Loading...</div>
              ) : (
                response?.sections.map((section, index) => (
                  <div key={index} className="mt-4">
                    <h4 className="text-pd-pink-400 sm:text-lg font-bold">{section.titles[language]}</h4>
                    <div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                      {section.tables.map((table, index) => (
                        <TopNDataTable
                          key={index}
                          pending={pending}
                          data={table.data}
                          n={11}
                          filterSelected={filterEnabled}
                          title={`${table.titles[language]} (${table.uploadedAt})`}
                        />
                      ))}
                    </div>
                  </div>
                ))
              )
            ) : (
              <DetailedDataTable
                pending={pending}
                tables={response?.sections.flatMap((section) => section.tables) ?? []}
                filterSelected={filterEnabled}
              />
              // <></>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
