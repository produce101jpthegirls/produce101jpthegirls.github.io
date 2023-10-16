type Trainee = {
  index: number;
  id: string;
  code: string;
  nameEn: string;
  nameJp: string;
  birthday: string;
  birthPlace: string;
  mbtiType: string;
  height: number;
  classes: string[];
  profileUrl: string;
  videoUrls: {
    eyeContact: string,
    pr: string,
    fancam: string,
  };
};

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

type AnalyticsDataRow = {
  nameEn?: string;
  nameJp?: string;
  rank: number;
  video: AnalyticsVideo;
  trainees?: AnalyticsTrainee[];
};

type AnalyticsTable = {
  titles: {
    ja: string;
    en: string;
    zh: string;
  };
  uploadedAt: string;
  data: AnalyticsDataRow[];
};

type AnalyticsSection = {
  titles: {
    ja: string;
    en: string;
    zh: string;
  };
  tables: AnalyticsTable[],
};

type AnalyticsDataResponse = {
  updatedAt: number;
  sections: AnalyticsSection[];
};
