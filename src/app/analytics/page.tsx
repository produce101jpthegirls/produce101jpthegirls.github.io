"use client";

import Footer from "@/components/footer";
import Header from "@/components/header";
import MyPick from "@/components/my_pick";
import Section from "@/components/section";
import Toggle from "@/components/toggle";
import { TRAINEES, firebaseConfig } from "@/constants";
import { CONTENTS } from "@/i18n";
import { decodeSelection, getLanguageId, isCompletedSelection, parseHumanNumber } from "@/utils";
import { initializeApp } from "firebase/app";
import { get, getDatabase, ref } from "firebase/database";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FC, useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
// import mockDb from "@/data/mock_db.json";

type AnalyticsDataRow = {
  id: string;
  name: string;
  fancamCount: string;
  fancamVideoId: string;
  fancamCountRank?: number;
  prCount: string;
  prVideoId: string;
  prCountRank?: number;
  eyeContactCount: string;
  eyeContactVideoId: string;
  eyeContactCountRank?: number;
};

type AnalyticsData = AnalyticsDataRow[];

type AnalyticsDataResponse = {
  updatedAt: number;
  items: AnalyticsData;
};

const nameSort = (a: AnalyticsDataRow, b: AnalyticsDataRow) => {
  const [nameJpA, nameEnA] = a.name.split("(");
  const [nameJpB, nameEnB] = b.name.split("(");
  if (nameEnA > nameEnB) {
    return 1;
  }
  if (nameEnB > nameEnA) {
    return -1;
  }
  if (nameJpA > nameJpB) {
    return 1;
  }
  if (nameJpB > nameJpA) {
    return -1;
  }
  return 0;
}

const fancamCountSort = (a: AnalyticsDataRow, b: AnalyticsDataRow) => {
  return parseHumanNumber(b.fancamCount) - parseHumanNumber(a.fancamCount);
};

const prCountSort = (a: AnalyticsDataRow, b: AnalyticsDataRow) => {
  return parseHumanNumber(b.prCount) - parseHumanNumber(a.prCount);
};

const eyeContactCountSort = (a: AnalyticsDataRow, b: AnalyticsDataRow) => {
  return parseHumanNumber(b.eyeContactCount) - parseHumanNumber(a.eyeContactCount);
};

type ViewCountCellProps = {
  viewCount: string;
  videoId: string;
  rank?: number;
}

const ViewCountCell: FC<ViewCountCellProps> = ({ viewCount, videoId, rank }) => (
  <div className="flex gap-4">
    <span className="w-[36px]">{viewCount}</span>
    <Link className="text-pd-gray-300 hover:text-pd-pink-100" href={`https://youtu.be/${videoId}`} target="_blank">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 461.001 461.001" fill="currentColor" className="w-4 h-4 mt-[2.5px]">
        <path d="M365.257,67.393H95.744C42.866,67.393,0,110.259,0,163.137v134.728
            c0,52.878,42.866,95.744,95.744,95.744h269.513c52.878,0,95.744-42.866,95.744-95.744V163.137
            C461.001,110.259,418.135,67.393,365.257,67.393z M300.506,237.056l-126.06,60.123c-3.359,1.602-7.239-0.847-7.239-4.568V168.607
            c0-3.774,3.982-6.22,7.348-4.514l126.06,63.881C304.363,229.873,304.298,235.248,300.506,237.056z"/>
      </svg>
    </Link>
    {rank && rank <= 5 && (
      <span>{rank}</span>
    )}
  </div>
);

const preprocessAnalyticsResponse = (response: AnalyticsDataResponse) => {
  // Calculate ranking
  response.items.sort((a, b) => parseHumanNumber(b.fancamCount) - parseHumanNumber(a.fancamCount));
  response.items.forEach((item, index) => item.fancamCountRank = index + 1);
  response.items.sort((a, b) => parseHumanNumber(b.prCount) - parseHumanNumber(a.prCount));
  response.items.forEach((item, index) => item.prCountRank = index + 1);
  response.items.sort((a, b) => parseHumanNumber(b.eyeContactCount) - parseHumanNumber(a.eyeContactCount));
  response.items.forEach((item, index) => item.eyeContactCountRank = index + 1);
  response.items.sort((a, b) => parseInt(a.id) - parseInt(b.id));
};

export default function Analytics() {
  const searchParams = useSearchParams();
  const lang = getLanguageId(searchParams.get("lang"));
  const [pending, setPending] = useState<boolean>(true);
  const [data, setData] = useState<AnalyticsData | undefined>(undefined);
  const [updatedAt, setUpdatedAt] = useState<number | undefined>(undefined);
  const [filterEnabled, setFilterEnabled] = useState<boolean>(false);

  const selected = decodeSelection(searchParams.get("code"));
  const isCompleted = selected && isCompletedSelection(selected);
  let selectedTrainees: Trainee[] | undefined = undefined;
  if (selected !== undefined && isCompletedSelection(selected)) {
    selectedTrainees = selected.map((index) => TRAINEES[index]);
  }

  const filteredData = filterEnabled ? data?.filter((_, index) => selected?.includes(index)) : data;

  const columns: TableColumn<AnalyticsDataRow>[] = [
    {
      name: CONTENTS[lang]["analytics"]["viewCountTable"]["columns"][0],
      selector: (row: AnalyticsDataRow) => row.id,
      width: "54px",
      sortable: true,
    },
    {
      name: CONTENTS[lang]["analytics"]["viewCountTable"]["columns"][1],
      selector: (row: AnalyticsDataRow) => row.name,
      sortable: true,
      sortFunction: nameSort,
    },
    {
      name: CONTENTS[lang]["analytics"]["viewCountTable"]["columns"][2],
      cell: (row: AnalyticsDataRow) => (
        <ViewCountCell viewCount={row.fancamCount} videoId={row.fancamVideoId} rank={row.fancamCountRank} />
      ),
      minWidth: "60px",
      sortable: true,
      sortFunction: fancamCountSort,
    },
    {
      name: CONTENTS[lang]["analytics"]["viewCountTable"]["columns"][3],
      cell: (row: AnalyticsDataRow) => (
        <ViewCountCell viewCount={row.prCount} videoId={row.prVideoId} rank={row.prCountRank} />
      ),
      minWidth: "60px",
      sortable: true,
      sortFunction: prCountSort,
    },
    {
      name: CONTENTS[lang]["analytics"]["viewCountTable"]["columns"][4],
      cell: (row: AnalyticsDataRow) => (
        <ViewCountCell viewCount={row.eyeContactCount} videoId={row.eyeContactVideoId} rank={row.eyeContactCountRank} />
      ),
      minWidth: "60px",
      sortable: true,
      sortFunction: eyeContactCountSort,
    },
  ];

  useEffect(() => {
    // setPending(false);
    // const response: AnalyticsDataResponse = mockDb.data.analytics;
    // preprocessAnalyticsResponse(response);
    // setData(response.items);
    // setUpdatedAt(response.updatedAt);
    initializeApp(firebaseConfig);
    const db = getDatabase();
    get(ref(db, "/data/analytics"))
      .then((snapshot) => {
        const response: AnalyticsDataResponse = snapshot.val();
        preprocessAnalyticsResponse(response);
        setPending(false);
        setData(response.items);
        setUpdatedAt(response.updatedAt);
      });
  }, []);

  return (
    <main className="h-full">
      <Header />
      <div className="bg-body-background bg-contain sm:bg-cover">
        {selectedTrainees && <MyPick selectedTrainees={selectedTrainees} />}
        <Section>
          <h2 className="mb-2 text-pd-pink-400 font-bold text-base sm:text-xl break-keep">{CONTENTS[lang]["analytics"]["title"]}</h2>
          <p className="text-pd-gray-400 text-sm sm:text-base whitespace-pre-line break-keep">{CONTENTS[lang]["analytics"]["description"]}</p>
        </Section>
        <div className="px-4 sm:px-20 text-pd-gray-400">
          <div className="px-1 py-4 sm:p-8 mx-auto max-w-[1200px] bg-white border border-4 sm:border-8 border-pd-pink-400">
            <div className="px-3 sm:px-0">
              <div className="mb-3 sm:mb-6 flex justify-between sm:items-center flex-col sm:flex-row gap-3">
                <h3 className="text-pd-pink-400 font-bold text-base sm:text-xl">{CONTENTS[lang]["analytics"]["viewCountTable"]["title"]}</h3>
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
              {updatedAt && (
                <p className="mb-6 text-sm">{
                  CONTENTS[lang]["analytics"]["viewCountTable"]["updatedAtFn"](new Intl.DateTimeFormat("en-US", {
                    "year": "numeric",
                    "month": "short",
                    "day": "numeric",
                    "hour": "2-digit",
                    "minute": "2-digit",
                  }).format(new Date(updatedAt)))
                }</p>
              )}
            </div>
            <DataTable
              columns={columns}
              data={filteredData || []}
              progressPending={pending}
              striped
              highlightOnHover
              customStyles={{
                headCells: {
                  style: {
                    color: "#767676",
                    paddingLeft: "8px",
                    paddingRight: "8px",
                  },
                },
                cells: {
                  style: {
                    color: "#767676",
                    paddingLeft: "8px",
                    paddingRight: "8px",
                  },
                },
                noData: {
                  style: {
                    color: "#767676",
                  },
                },
                progress: {
                  style: {
                    color: "#767676",
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
