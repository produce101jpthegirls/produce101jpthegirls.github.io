import { TRAINEES } from "@/constants";
import { useSiteContext } from "@/context/site";
import { CONTENTS } from "@/i18n";
import { formatHumanNumber, isCompletedSelection } from "@/utils";
import Link from "next/link";
import { FC } from "react";
import DataTable, { TableColumn, TableStyles } from "react-data-table-component";
import { getThumbnail } from "./views";

type AnalyticsTrainee = {
  id: string;
  nameEn: string;
  nameJp: string;
  img?: {
    src: string;
    alt: string;
  };
};

type AnalyticsVideo = {
  id: string;
  viewCount: string;
};

export type AnalyticsDataRow = {
  nameEn?: string;
  nameJp?: string;
  rank: number;
  video: AnalyticsVideo;
  trainees: AnalyticsTrainee[];
};

export type AnalyticsData = {
  [category: string]: AnalyticsDataRow[];
};

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

type DetailedAnalyticsDataRow = {
  trainee: AnalyticsTrainee;
  level_division: AnalyticsVideo;
  speed_eating: AnalyticsVideo;
  eye_contact: AnalyticsVideo;
  pr: AnalyticsVideo;
  fancam: AnalyticsVideo;
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
  data: AnalyticsDataRow[];
  n: number;
  filterSelected: boolean;
  title: string;
};

export const TopNDataTable: FC<TopNDataTableProps> = ({ pending, data, n, filterSelected, title }) => {
  const { selected, language } = useSiteContext();
  const filteredData = filterSelected && isCompletedSelection(selected) ? (
    data.filter((row) => row.trainees.some((trainee) => selected.map((index) => TRAINEES[index].code).includes(trainee.id)))
  ) : data;
  // const sortedData = [...filteredData].sort((a, b) => a.rank - b.rank);
  const topNData = filteredData.slice(0, n);
  const columns: TableColumn<AnalyticsDataRow>[] = [
    {
      name: CONTENTS[language]["analytics"]["overviewTab"]["table"]["columns"][0],
      selector: (row: AnalyticsDataRow) => row.rank,
      width: "28px",
    },
    {
      name: CONTENTS[language]["analytics"]["overviewTab"]["table"]["columns"][1],
      cell: (row: AnalyticsDataRow) => (
        <TraineesCell trainees={row.trainees} customName={language === "en" ? row.nameEn : row.nameJp} />
      ),
    },
    {
      name: CONTENTS[language]["analytics"]["overviewTab"]["table"]["columns"][2],
      cell: (row: AnalyticsDataRow) => (
        <ViewCountCell viewCount={row.video.viewCount} videoId={row.video.id} />
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

type TraineeIconsProps = {
  trainees: AnalyticsTrainee[];
};

const TraineeIcons: FC<TraineeIconsProps> = ({ trainees }) => {
  return (
    <div className="mt-1 flex gap-1">
      {trainees.map((trainee) => {
        const img = trainee.img ? trainee.img : { "src": "", "alt": "" };
        return (
          <img key={trainee.id} className="rounded-full w-7 h-7 sm:w-8 sm:h-8 sm:hidden" src={img.src} alt={img.alt} />
        );
      })}
    </div>
  );
};

const renderCustomName = (trainees: AnalyticsTrainee[], customName: string) => {
  if (customName.includes(" ✧ ")) {
    const [team, artistSong] = customName.split(" ✧ ");
    return (
      <div>
        <div className="font-bold">{artistSong}</div>
        <div>{team}</div>
        <TraineeIcons trainees={trainees} />
      </div>
    );
  }
  return (
    <>
      <div className="flex items-center gap-1">
        <TraineeIcons trainees={trainees} />
        <span className="pl-1">{customName}</span>
      </div>
      <TraineeIcons trainees={trainees} />
    </>
  );
};

const getViewCountNumber = (viewCountStr: string): number => {
  if (viewCountStr) {
    return parseInt(viewCountStr);
  }
  return 0;
}

type TraineesCellProps = {
  trainees: AnalyticsTrainee[];
  customName?: string;
};

const TraineesCell: FC<TraineesCellProps> = ({ trainees, customName }) => {
  const { language } = useSiteContext();
  return (
    <div className="flex flex-col gap-0.5 py-1.5 truncate">
      {customName ? renderCustomName(trainees, customName) : (
        trainees.map((trainee) => {
          const displayId = trainee.id.split("_")[0];
          const img = trainee.img ? trainee.img : { "src": "", "alt": "" };
          return (
            <div key={trainee.id} className="flex items-center gap-2 truncate">
              <img className="rounded-full w-8 h-8 hidden sm:block" src={img.src} alt={img.alt} />
              <span className="truncate">
                <span className="hidden sm:inline">{displayId}🌸</span>
                <span></span>{language === "en" ? trainee.nameEn : trainee.nameJp}</span>
            </div>
          );
        })
      )}
    </div>
  );
};

type ViewCountCellProps = {
  viewCount?: string;
  videoId?: string;
  rank?: number;
};

const ViewCountCell: FC<ViewCountCellProps> = ({ viewCount, videoId, rank }) => (
  <div className="flex gap-2 sm:gap-4">
    <span className="w-[36px]">{viewCount ? formatHumanNumber(parseInt(viewCount), 0) : ""}</span>
    {videoId && (
      <Link className="text-pd-gray-300 hover:text-pd-pink-100" href={`https://youtu.be/${videoId}`} target="_blank">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 461.001 461.001" fill="currentColor" className="w-4 h-4 mt-[2.5px]">
          <path d="M365.257,67.393H95.744C42.866,67.393,0,110.259,0,163.137v134.728
              c0,52.878,42.866,95.744,95.744,95.744h269.513c52.878,0,95.744-42.866,95.744-95.744V163.137
              C461.001,110.259,418.135,67.393,365.257,67.393z M300.506,237.056l-126.06,60.123c-3.359,1.602-7.239-0.847-7.239-4.568V168.607
              c0-3.774,3.982-6.22,7.348-4.514l126.06,63.881C304.363,229.873,304.298,235.248,300.506,237.056z"/>
        </svg>
      </Link>
    )}
    {rank && rank <= 5 && (
      <span>{rank}</span>
    )}
  </div>
);

type DetailedDataTableProps = {
  pending: boolean;
  data?: AnalyticsData;
  filterSelected: boolean;
};

export const DetailedDataTable: FC<DetailedDataTableProps> = ({ pending, data, filterSelected }) => {
  const { selected, language } = useSiteContext();

  let detailedData: DetailedAnalyticsDataRow[] = [];

  if (data) {
    console.log(data)
    const columnData = [
      data.level_division,
      data.speed_eating,
      data.eye_contact,
      data.pr,
      data.fancam,
    ].map((table) => {
      const newTable: { [traineeId: string]: AnalyticsVideo } = {};
      table.forEach((row) => {
        row.trainees.map((trainee) => {
          newTable[trainee.id] = row.video;
        })
      });
      return newTable;
    });
  
    const filteredTrainees = filterSelected && isCompletedSelection(selected) ? selected.map((index) => TRAINEES[index]) : TRAINEES;
  
    detailedData = filteredTrainees.map((trainee) => ({
      trainee: {
        id: trainee.code,
        nameEn: trainee.nameEn,
        nameJp: trainee.nameJp,
        img: getThumbnail(trainee.code, trainee.nameEn),
      },
      level_division: columnData[0][trainee.code] ?? ({
        viewCount: undefined,
        id: undefined,
      }),
      speed_eating: columnData[1][trainee.code],
      eye_contact: columnData[2][trainee.code],
      pr: columnData[3][trainee.code],
      fancam: columnData[4][trainee.code],
    }));
  }

  const columns: TableColumn<DetailedAnalyticsDataRow>[] = [
    {
      name: CONTENTS[language]["analytics"]["detailsTab"]["table"]["columns"][1],
      cell: (row: DetailedAnalyticsDataRow) => (
        <TraineesCell trainees={[row.trainee]} />
      ),
      sortable: true,
      sortFunction: (a, b) => parseInt(a.trainee.id.split("_")[0]) - parseInt(b.trainee.id.split("_")[0]),
    },
    {
      name: CONTENTS[language]["analytics"]["detailsTab"]["table"]["columns"][6],
      cell: (row: DetailedAnalyticsDataRow) => (
        <ViewCountCell viewCount={row.speed_eating.viewCount} videoId={row.speed_eating.id} />
      ),
      minWidth: "60px",
      sortable: true,
      sortFunction: (a, b) => getViewCountNumber(b.speed_eating.viewCount) - getViewCountNumber(a.speed_eating.viewCount),
    },
    {
      name: CONTENTS[language]["analytics"]["detailsTab"]["table"]["columns"][5],
      cell: (row: DetailedAnalyticsDataRow) => (
        <ViewCountCell viewCount={row.level_division.viewCount} videoId={row.level_division.id} />
      ),
      minWidth: "60px",
      sortable: true,
      sortFunction: (a, b) => getViewCountNumber(b.level_division.viewCount) - getViewCountNumber(a.level_division.viewCount),
    },
    {
      name: CONTENTS[language]["analytics"]["detailsTab"]["table"]["columns"][4],
      cell: (row: DetailedAnalyticsDataRow) => (
        <ViewCountCell viewCount={row.eye_contact.viewCount} videoId={row.eye_contact.id} />
      ),
      minWidth: "60px",
      sortable: true,
      sortFunction: (a, b) => getViewCountNumber(b.eye_contact.viewCount) - getViewCountNumber(a.eye_contact.viewCount),
    },
    {
      name: CONTENTS[language]["analytics"]["detailsTab"]["table"]["columns"][3],
      cell: (row: DetailedAnalyticsDataRow) => (
        <ViewCountCell viewCount={row.pr.viewCount} videoId={row.pr.id} />
      ),
      minWidth: "60px",
      sortable: true,
      sortFunction: (a, b) => getViewCountNumber(b.pr.viewCount) - getViewCountNumber(a.pr.viewCount),
    },
    {
      name: CONTENTS[language]["analytics"]["detailsTab"]["table"]["columns"][2],
      cell: (row: DetailedAnalyticsDataRow) => (
        <ViewCountCell viewCount={row.fancam.viewCount} videoId={row.fancam.id} />
      ),
      minWidth: "60px",
      sortable: true,
      sortFunction: (a, b) => getViewCountNumber(b.fancam.viewCount) - getViewCountNumber(a.fancam.viewCount),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={detailedData}
      progressPending={pending}
      striped
      highlightOnHover
      customStyles={DATA_TABLE_CUSTOM_STYLES}
    />
  );
};
