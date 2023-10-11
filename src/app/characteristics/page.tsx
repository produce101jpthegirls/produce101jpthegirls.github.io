"use client";

import { BarChart } from "@/components/charts";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { StableLink } from "@/components/links";
import MyPick from "@/components/my_pick";
import Panel from "@/components/panel";
import Section from "@/components/section";
import { TRAINEES } from "@/constants";
import { useSiteContext } from "@/context/site";
import { CONTENTS } from "@/i18n";
import { isCompletedSelection } from "@/utils";
import { countBy } from "lodash";

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
    if (a[0] < b[0]) {
      return 1;
    }
    if (a[0] > b[0]) {
      return -1;
    }
    return 0;
  });
  return birthyearEntries;
};
const allBirthyearEntries = createBirthyearDataEntries(TRAINEES);

const createHeightDataEntries = (trainees: Trainee[]) => {
  const heights = trainees.map((trainee) => trainee.height.toFixed(0));
  const heightCount = countBy(heights);
  const heightEntries = Object.entries(heightCount).sort((a, b) => parseInt(b[0]) - parseInt(a[0]));
  return heightEntries
};
const allHeightEntries = createHeightDataEntries(TRAINEES);

const getEntryLabels = (entries: [string, number][]): string[] => entries.map((entry) => entry[0]);
const getEntryData = (entries: [string, number][]): number[] => entries.map((entry) => entry[1]);

export default function Characteristics() {
  const { selected, language } = useSiteContext();

  let selectedTrainees: Trainee[] | undefined = undefined;
  let mbtiEntries: [string, number][] | undefined = undefined;
  let birthyearEntries: [string, number][] | undefined = undefined;
  let heightEntries: [string, number][] | undefined = undefined;
  if (selected !== undefined && isCompletedSelection(selected)) {
    selectedTrainees = selected.map((index) => TRAINEES[index]);
    mbtiEntries = createMbtiDataEntries(selectedTrainees);
    birthyearEntries = createBirthyearDataEntries(selectedTrainees);
    heightEntries = createHeightDataEntries(selectedTrainees);
  }

  return (
    <main className="h-full">
      <Header />
      <div className="bg-body-background bg-contain sm:bg-cover">
        {selectedTrainees && <MyPick selectedTrainees={selectedTrainees} />}
        <Section>
          <h2 className="mb-2 text-pd-pink-400 font-bold text-base sm:text-xl break-keep"
          >{CONTENTS[language]["characteristics"]["title"]}</h2>
          <p className="text-pd-gray-400 text-sm sm:text-base whitespace-pre-line break-keep"
          >{CONTENTS[language]["characteristics"]["description"]}</p>
          {(selected === undefined || !isCompletedSelection(selected)) && (
            <p className="text-pd-gray-400 text-sm sm:text-base">
              See the characteristics of your top 11. Pick them
              {" "}
              <StableLink
                pathname="/"
                className="text-pd-pink-400 hover:text-pd-pink-100 after:content-['_↗'] after:text-xs sm:after:text-sm after:font-bold"
              >here</StableLink>
            </p>
          )}
        </Section>
        {selectedTrainees && mbtiEntries && birthyearEntries && heightEntries && (
          <div
            className="pb-4 sm:pb-8 px-4 text-pd-gray-400 flex
            flex-col sm:flex-row gap-4 sm:gap-8 justify-center items-center sm:items-stretch"
          >
            <Panel>
              <div className="p-2 sm:p-4 flex justify-center">
                <BarChart
                  labels={getEntryLabels(mbtiEntries)}
                  data={getEntryData(mbtiEntries)}
                  title={CONTENTS[language]["characteristics"]["mbtiChart"]["title"]}
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
                  title={CONTENTS[language]["characteristics"]["birthyearChart"]["title"]}
                  height={180}
                  datasetLabel="My Top 11"
                />
              </div>
            </Panel>
            <Panel>
              <div className="p-2 sm:p-4 flex justify-center">
                <BarChart
                  labels={getEntryLabels(heightEntries)}
                  data={getEntryData(heightEntries)}
                  title={CONTENTS[language]["characteristics"]["heightChart"]["title"]}
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
                title={CONTENTS[language]["characteristics"]["mbtiChart"]["title"]}
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
                title={CONTENTS[language]["characteristics"]["birthyearChart"]["title"]}
                height={400}
                datasetLabel="All Trainees"
              />
            </div>
          </Panel>
          <Panel>
            <div className="p-2 sm:p-4 flex justify-center">
              <BarChart
                labels={getEntryLabels(allHeightEntries)}
                data={getEntryData(allHeightEntries)}
                title={CONTENTS[language]["characteristics"]["heightChart"]["title"]}
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
