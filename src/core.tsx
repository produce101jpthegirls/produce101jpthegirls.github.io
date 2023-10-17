import { initializeApp } from "firebase/app";
import { get, getDatabase, ref } from "firebase/database";
import { FIREBASE_CONFIG, TRAINEES } from "./constants";
// import mockDb from "@/data/mock_db.json";

export const getItemImage = (item: Trainee) => {
  return {
    src: "/assets/trainees/profile/" + item.code + ".jpg",
    alt: item.nameEn,
  };
};

export const getThumbnail = (traineeId: string, alt: string) => ({
  src: "/assets/trainees/profile_thumbnail/" + traineeId + ".jpg",
  alt: alt,
});

export const getItemThumbnail = (item: Trainee) => getThumbnail(item.code, item.nameEn);

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

export const getAnalyticsData = async (isDev?: boolean): Promise<AnalyticsDataResponse> => {
  // const response: AnalyticsDataResponse = mockDb.data.dev.analytics;
  // response.sections.forEach((section) => {
  //   section.tables.forEach((table) => preprocessTable(table));
  // });
  // return response;
  const refPath = isDev ? "/data/dev/analytics" : "/data/analytics";
  initializeApp(FIREBASE_CONFIG);
  const db = getDatabase();
  return get(ref(db, refPath))
    .then((snapshot) => {
      const response: AnalyticsDataResponse = snapshot.val();
      response.sections.forEach((section) => {
        section.tables.forEach((table) => preprocessTable(table));
      });
      return response;
    });
};
