"use client";

import { countBy } from "lodash";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { BarChart } from "@/components/charts";
import Footer from "@/components/footer";
import Header from "@/components/header";
import MyPick from "@/components/my_pick";
import Panel from "@/components/panel";
import Section from "@/components/section";
import { TRAINEES } from "@/constants";
import { decodeSelection, getLanguageId, isCompletedSelection } from "@/utils";
import { CONTENTS } from "@/i18n";

// Create MBTI data entries
const createMbtiDataEntries = (trainees: Trainee[]) => {
  const mbtis = trainees.map((trainee) => trainee.mbtiType);
  const mbtiCount = countBy(mbtis);
  const mbtiEntries = Object.entries(mbtiCount).sort((a, b) => {
    if (a[1] === b[1]) {
      if (a[0] < b[0]) {
        return -1;
      }
      if (a[0] > b[0]) {
        return 1;
      }
      return 0;
    }
    return b[1] - a[1];
  });
  return mbtiEntries;
}
const allMbtiEntries = createMbtiDataEntries(TRAINEES);

// Create birthyear data entries
const createBirthyearDataEntries = (trainees: Trainee[]) => {
  const birthyears = trainees.map((trainee) => trainee.birthday.split(".")[0]);
  const birthyearCount = countBy(birthyears);
  const birthyearEntries = Object.entries(birthyearCount).sort((a, b) => {
    if (a < b) {
      return 1;
    }
    if (a > b) {
      return -1;
    }
    return 0;
  });
  return birthyearEntries;
};
const allBirthyearEntries = createBirthyearDataEntries(TRAINEES);

const getEntryLabels = (entries: [string, number][]): string[] => entries.map((entry) => entry[0]);
const getEntryData = (entries: [string, number][]): number[] => entries.map((entry) => entry[1]);

export default function Characteristics() {
  const searchParams = useSearchParams();
  const selected = decodeSelection(searchParams.get("code"));
  const lang = getLanguageId(searchParams.get("lang"));

  let selectedTrainees: Trainee[] | undefined = undefined;
  let mbtiEntries: [string, number][] | undefined = undefined;
  let birthyearEntries: [string, number][] | undefined = undefined;
  if (selected !== undefined && isCompletedSelection(selected)) {
    selectedTrainees = selected.map((index) => TRAINEES[index]);
    mbtiEntries = createMbtiDataEntries(selectedTrainees);
    birthyearEntries = createBirthyearDataEntries(selectedTrainees);
  }

  return (
    <main className="h-full">
      <Header />
      <div className="bg-body-background bg-contain sm:bg-cover">
        {selectedTrainees && <MyPick selectedTrainees={selectedTrainees} />}
        <Section>
          <h2 className="mb-2 text-pd-pink-400 font-bold text-base sm:text-xl break-keep">{CONTENTS[lang]["characteristics"]["title"]}</h2>
          <p className="text-pd-gray-400 text-sm sm:text-base whitespace-pre-line break-keep">{CONTENTS[lang]["characteristics"]["description"]}</p>
          {(selected === undefined || !isCompletedSelection(selected)) && (
            <p className="text-pd-gray-400 text-sm sm:text-base">
              See the characteristics of your top 11. Pick them
              {" "}
              <Link
                href={{
                  pathname: "/",
                  query: searchParams.toString(),
                }}
                className="text-pd-pink-400 hover:text-pd-pink-100 after:content-['_↗'] after:text-xs sm:after:text-sm after:font-bold"
              >here</Link>
            </p>
          )}
        </Section>
        {selectedTrainees && mbtiEntries && birthyearEntries && (
          <div
            className="pb-4 sm:pb-8 px-4 text-pd-gray-400 flex
            flex-col sm:flex-row gap-4 sm:gap-8 justify-center items-center sm:items-stretch"
          >
            <Panel>
              <div className="p-2 sm:p-4 flex justify-center">
                <BarChart
                  labels={getEntryLabels(mbtiEntries)}
                  data={getEntryData(mbtiEntries)}
                  title={CONTENTS[lang]["characteristics"]["mbtiChart"]["title"]}
                  height={180}
                  datasetLabel="My Top 11"
                />
              </div>
            </Panel>
            <Panel>
              <div className="p-2 sm:p-4 flex justify-center">
                <BarChart
                  labels={getEntryLabels(birthyearEntries)}
                  data={getEntryData(birthyearEntries)}
                  title={CONTENTS[lang]["characteristics"]["birthyearChart"]["title"]}
                  height={180}
                  datasetLabel="My Top 11"
                />
              </div>
            </Panel>
          </div>
        )}
        <div
          className="mb-4 sm:mb-10 pb-4 sm:pb-10 px-4 text-pd-gray-400 flex
          flex-col sm:flex-row gap-4 sm:gap-8 justify-center items-center sm:items-stretch"
        >
          <Panel>
            <div className="p-2 sm:p-4 flex justify-center">
              <BarChart
                labels={getEntryLabels(allMbtiEntries)}
                data={getEntryData(allMbtiEntries)}
                title={CONTENTS[lang]["characteristics"]["mbtiChart"]["title"]}
                height={400}
                datasetLabel="All Trainees"
              />
            </div>
          </Panel>
          <Panel>
            <div className="p-2 sm:p-4 flex justify-center">
              <BarChart
                labels={getEntryLabels(allBirthyearEntries)}
                data={getEntryData(allBirthyearEntries)}
                title={CONTENTS[lang]["characteristics"]["birthyearChart"]["title"]}
                height={400}
                datasetLabel="All Trainees"
              />
            </div>
          </Panel>
        </div>
      </div>
      <Footer />
    </main>
  );
}
