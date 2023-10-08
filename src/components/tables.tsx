import { useSiteContext } from "@/context/site";
import { CONTENTS } from "@/i18n";
import { parseHumanNumber } from "@/utils";
import Link from "next/link";
import { FC } from "react";
import DataTable, { TableColumn, TableStyles } from "react-data-table-component";

export type AnalyticsDataRow = {
  id: string;
  name: string;
  displayName?: string;
  img?: {
    src: string;
    alt: string;
  };
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

export type AnalyticsData = AnalyticsDataRow[];

export type AnalyticsDataResponse = {
  updatedAt: number;
  items: AnalyticsData;
};

export type ViewCountDataRow = {
  displayName: string;
  img: {
    src: string;
    alt: string;
  };
  rank: number;
  viewCount: string;
  videoId: string;
};

const DATA_TABLE_CUSTOM_STYLES: TableStyles = {
  header: {
    style: {
      fontSize: "18px",
      padding: "0",
      color: "#ff67b3",
    },
  },
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
};

type TopNDataTableProps = {
  pending: boolean;
  data: ViewCountDataRow[];
  n: number;
  filterSelected: boolean;
  title: string;
};

export const TopNDataTable: FC<TopNDataTableProps> = ({ pending, data, n, filterSelected, title }) => {
  const { selected, language } = useSiteContext();
  const filteredData = filterSelected ? data.filter((_, index) => selected.includes(index)) : data;
  const sortedData = [...filteredData].sort((a, b) => a.rank - b.rank);
  const topNData = sortedData.slice(0, n);
  const columns: TableColumn<ViewCountDataRow>[] = [
    {
      name: CONTENTS[language]["analytics"]["viewCountTable"]["columns"][0],
      selector: (row: ViewCountDataRow) => row.rank,
      width: "32px",
    },
    {
      name: CONTENTS[language]["analytics"]["viewCountTable"]["columns"][1],
      cell: (row: ViewCountDataRow) => (
        <TraineeCell img={row.img} name={row.displayName} />
      ),
    },
    {
      name: CONTENTS[language]["analytics"]["viewCountTable"]["columns"][2],
      cell: (row: ViewCountDataRow) => (
        <ViewCountCell viewCount={row.viewCount} videoId={row.videoId} />
      ),
      width: "96px",
    },
  ];
  return (
    <div>
      <DataTable
        columns={columns}
        data={topNData}
        progressPending={pending}
        striped
        highlightOnHover
        customStyles={DATA_TABLE_CUSTOM_STYLES}
        title={title}
      />
    </div>
  );
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

type TraineeCellProps = {
  img: {
    src: string;
    alt: string;
  };
  name: string;
};

const TraineeCell: FC<TraineeCellProps> = ({ img, name }) => (
  <div className="flex items-center gap-2 truncate">
    <img className="rounded-full w-8 h-8 hidden sm:block" src={img.src} alt={img.alt} />
    <span className="truncate">{name}</span>
  </div>
);

type ViewCountCellProps = {
  viewCount: string;
  videoId: string;
  rank?: number;
};

const ViewCountCell: FC<ViewCountCellProps> = ({ viewCount, videoId, rank }) => (
  <div className="flex gap-2 sm:gap-4">
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

type TraineeDataTableProps = {
  pending: boolean;
  data: AnalyticsDataRow[];
  filterSelected: boolean;
};

export const TraineeDataTable: FC<TraineeDataTableProps> = ({ pending, data, filterSelected }) => {
  const { selected, language } = useSiteContext();

  const filteredData = filterSelected ? data?.filter((_, index) => selected?.includes(index)) : data;

  const columns: TableColumn<AnalyticsDataRow>[] = [
    {
      name: CONTENTS[language]["analytics"]["viewCountTable"]["columns"][1],
      cell: (row: AnalyticsDataRow) => (
        <TraineeCell img={{ src: row.img?.src ?? "", alt: row.img?.alt ?? ""}} name={row.displayName ?? ""} />
      ),
      sortable: true,
    },
    {
      name: CONTENTS[language]["analytics"]["viewCountTable"]["columns"][2],
      cell: (row: AnalyticsDataRow) => (
        <ViewCountCell viewCount={row.fancamCount} videoId={row.fancamVideoId} rank={row.fancamCountRank} />
      ),
      minWidth: "60px",
      sortable: true,
      sortFunction: fancamCountSort,
    },
    {
      name: CONTENTS[language]["analytics"]["viewCountTable"]["columns"][3],
      cell: (row: AnalyticsDataRow) => (
        <ViewCountCell viewCount={row.prCount} videoId={row.prVideoId} rank={row.prCountRank} />
      ),
      minWidth: "60px",
      sortable: true,
      sortFunction: prCountSort,
    },
    {
      name: CONTENTS[language]["analytics"]["viewCountTable"]["columns"][4],
      cell: (row: AnalyticsDataRow) => (
        <ViewCountCell viewCount={row.eyeContactCount} videoId={row.eyeContactVideoId} rank={row.eyeContactCountRank} />
      ),
      minWidth: "60px",
      sortable: true,
      sortFunction: eyeContactCountSort,
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={filteredData || []}
      progressPending={pending}
      striped
      highlightOnHover
      customStyles={DATA_TABLE_CUSTOM_STYLES}
    />
  );
};
