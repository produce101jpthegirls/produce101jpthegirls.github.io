"use client";

import Footer from "@/components/footer";
import Header from "@/components/header";
import { firebaseConfig } from "@/constants";
import { parseHumanNumber } from "@/utils";
import { initializeApp } from "firebase/app";
import { get, getDatabase, ref } from "firebase/database";
import { FC, useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
// import mockDb from "@/data/mock_db.json";
import Link from "next/link";

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

const columns: TableColumn<AnalyticsDataRow>[] = [
  {
    name: "#",
    selector: (row: AnalyticsDataRow) => row.id,
    width: "54px",
    sortable: true,
  },
  {
    name: "TRAINEE",
    selector: (row: AnalyticsDataRow) => row.name,
    sortable: true,
    sortFunction: nameSort,
  },
  {
    name: "LEAP HIGH FANCAM",
    cell: (row: AnalyticsDataRow) => (
      <ViewCountCell viewCount={row.fancamCount} videoId={row.fancamVideoId} rank={row.fancamCountRank} />
    ),
    minWidth: "60px",
    sortable: true,
    sortFunction: fancamCountSort,
  },
  {
    name: "1分PR",
    cell: (row: AnalyticsDataRow) => (
      <ViewCountCell viewCount={row.prCount} videoId={row.prVideoId} rank={row.prCountRank} />
    ),
    minWidth: "60px",
    sortable: true,
    sortFunction: prCountSort,
  },
  {
    name: "LEAP HIGHアイコンタクト",
    cell: (row: AnalyticsDataRow) => (
      <ViewCountCell viewCount={row.eyeContactCount} videoId={row.eyeContactVideoId} rank={row.eyeContactCountRank} />
    ),
    minWidth: "60px",
    sortable: true,
    sortFunction: eyeContactCountSort,
  },
];

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

export default function Characteristics() {
  const [pending, setPending] = useState<boolean>(true);
  const [data, setData] = useState<AnalyticsData | undefined>(undefined);
  const [updatedAt, setUpdatedAt] = useState<number | undefined>(undefined);
  useEffect(() => {
    // setPending(false);
    // const response: AnalyticsDataResponse = mockDb.data.analytics;
    // preprocessAnalyticsResponse(response);
    // setData(response.items);
    // setUpdatedAt(response.updatedAt);
    const app = initializeApp(firebaseConfig);
    console.log(app.name);
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
        <div className="px-4 sm:px-20 my-8 sm:my-20 text-pd-gray-400">
          <h2 className="mb-8 text-pd-pink-400 font-bold text-base sm:text-xl text-center">PRODUCE 101 ANALYTICS</h2>
          <div className="px-1 py-4 sm:p-8 mx-auto max-w-[1200px] bg-white border border-4 sm:border-8 border-pd-pink-400">
            <div className="px-3 sm:px-0">
              <h3 className="mb-3 sm:mb-6 text-pd-pink-400 font-bold text-base sm:text-xl">VIDEO ANALYTICS</h3>
              {updatedAt && (
                <p className="mb-6 text-sm">Updated at {new Date(updatedAt).toLocaleString()}</p>
              )}
            </div>
            <DataTable
              columns={columns}
              data={data || []}
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
