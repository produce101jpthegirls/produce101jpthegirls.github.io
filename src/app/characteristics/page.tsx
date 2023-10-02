"use client";

import { countBy } from "lodash";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { BarChart } from "@/components/charts";
import { TRAINEES } from "@/constants";
import Panel from "@/components/panel";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { decodeSelection } from "@/utils";

const getItemTopImage = (item: Trainee) => {
  return {
    src: "/assets/trainees/top/" + item.code + ".jpg",
    alt: item.nameEn,
  };
};

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

  let selectedTrainees: Trainee[]|undefined = undefined;
  let mbtiEntries: [string, number][]|undefined = undefined;
  let birthyearEntries: [string, number][]|undefined = undefined;
  if (selected !== undefined) {
    selectedTrainees = selected.map((index) => TRAINEES[index]);
    mbtiEntries = createMbtiDataEntries(selectedTrainees);
    birthyearEntries = createBirthyearDataEntries(selectedTrainees);
  }

  return (
    <main className="h-full">
      <Header />
      <div className="bg-body-background bg-contain sm:bg-cover">
        {selectedTrainees && (
          <div className="sm:px-48 pt-10 sm:pt-20 text-center text-pd-gray-400">
            <h2 className="text-pd-pink-400 font-bold text-base sm:text-xl">MY TOP 11</h2>
            <ul className="flex pt-2 sm:pt-6">{selectedTrainees.map((trainee) => {
              const image = getItemTopImage(trainee);
              return (
                <li key={trainee.id}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={300}
                    height={800}
                  />
                </li>
              );
            })}</ul>
          </div>
        )}
        <div className="my-6 sm:my-10 px-4 text-center">
          <h2 className="mb-2 text-pd-pink-400 font-bold text-base sm:text-xl">PRODUCE 101 CHARACTERISTICS</h2>
          <p className="text-pd-gray-400 text-sm sm:text-base">Visualiztion of the MBTI and birthyear distributions.</p>
          {selected === undefined && (
            <p className="text-pd-gray-400 text-sm sm:text-base">
              See the characteristics of your top 11. Pick them
              {" "}
              <Link href="/" className="text-pd-pink-400 hover:text-pd-pink-100 after:content-['_↗'] after:text-xs sm:after:text-sm after:font-bold">here</Link>
            </p>
          )}
        </div>
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
                  title="MBTI"
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
                  title="Birthyears"
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
                title="MBTI"
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
                title="Birthyears"
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
