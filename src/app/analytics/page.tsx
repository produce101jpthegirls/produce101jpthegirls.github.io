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
  prCount: string;
  prVideoId: string;
  eyeContactCount: string;
  eyeContactVideoId: string;
};

type AnalyticsData = AnalyticsDataRow[];

type AnalyticsDataResponse = {
  updatedAt: number;
  items: AnalyticsData;
};

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
}

const ViewCountCell: FC<ViewCountCellProps> = ({ viewCount, videoId }) => (
  <div className="flex gap-3">
    {viewCount}
    <Link className="text-pd-gray-300 hover:text-pd-pink-100" href={`https://youtu.be/${videoId}`} target="_blank">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 461.001 461.001" fill="currentColor" className="w-4 h-4 mt-[2.5px]">
          <path d="M365.257,67.393H95.744C42.866,67.393,0,110.259,0,163.137v134.728
            c0,52.878,42.866,95.744,95.744,95.744h269.513c52.878,0,95.744-42.866,95.744-95.744V163.137
            C461.001,110.259,418.135,67.393,365.257,67.393z M300.506,237.056l-126.06,60.123c-3.359,1.602-7.239-0.847-7.239-4.568V168.607
            c0-3.774,3.982-6.22,7.348-4.514l126.06,63.881C304.363,229.873,304.298,235.248,300.506,237.056z"/>
        </svg>
    </Link>
  </div>
);

const columns: TableColumn<AnalyticsDataRow>[] = [
  {
    name: "#",
    selector: (row: AnalyticsDataRow) => row.id,
    width: "60px",
    sortable: true,
  },
  {
    name: "TRAINEE",
    selector: (row: AnalyticsDataRow) => row.name,
    width: "240px",
    sortable: true,
  },
  {
    name: "LEAP HIGH FANCAM",
    cell: (row: AnalyticsDataRow) => <ViewCountCell viewCount={row.fancamCount} videoId={row.fancamVideoId} />,
    sortable: true,
    sortFunction: fancamCountSort,
  },
  {
    name: "1分PR",
    cell: (row: AnalyticsDataRow) => <ViewCountCell viewCount={row.prCount} videoId={row.prVideoId} />,
    sortable: true,
    sortFunction: prCountSort,
  },
  {
    name: "LEAP HIGHアイコンタクト",
    cell: (row: AnalyticsDataRow) => <ViewCountCell viewCount={row.eyeContactCount} videoId={row.eyeContactVideoId} />,
    sortable: true,
    sortFunction: eyeContactCountSort,
  },
];

export default function Characteristics() {
  const [pending, setPending] = useState<boolean>(true);
  const [data, setData] = useState<AnalyticsData|undefined>(undefined);
  const [updatedAt, setUpdatedAt] = useState<number|undefined>(undefined);
  useEffect(() => {
    // setPending(false);
    // setData(mockDb.data.analytics.items);
    // setUpdatedAt(mockDb.data.analytics.updatedAt);
    const app = initializeApp(firebaseConfig);
    console.log(app.name);
    const db = getDatabase();
    get(ref(db, "/data/analytics"))
      .then((snapshot) => {
        const response: AnalyticsDataResponse = snapshot.val();
        setPending(false);
        setData(response.items);
        setUpdatedAt(response.updatedAt);
      });
  }, []);
  return (
    <main className="h-full">
      <Header />
      <div className="px-4 sm:px-20 text-pd-gray-400">
        <div className="p-8 mx-auto my-20 max-w-[1200px] border border-8 border-pd-pink-400">
          <h2 className="mb-6 text-pd-pink-400 font-bold text-base sm:text-xl">PRODUCE 101 ANALYTICS</h2>
          {updatedAt && (
            <p className="mb-6 text-sm">Updated at {new Date(updatedAt).toLocaleString()}</p>
          )}
          <DataTable
            columns={columns}
            data={data || []}
            progressPending={pending}
            customStyles={{
              headCells: {
                style: {
                  color: "#767676",
                },
              },
              cells: {
                style: {
                  color: "#767676"
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
      <Footer />
    </main>
  );
}
