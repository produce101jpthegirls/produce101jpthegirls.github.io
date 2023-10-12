import trainees_en from "@/data/trainees_en.json";
import trainees_jp from "@/data/trainees_jp.json";

export const EMPTY_SELECTION = [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255];

// Trainee index is derived from the order in the json file.
// Please ensure the trainees are already sorted by the id and there are 96 trainees in total.
export const TRAINEES: Trainee[] = Array.from(Array(trainees_en.length).keys()).map((index) => ({
  index,
  id: trainees_jp[index].id.split("_")[0],
  code: trainees_jp[index].id,
  nameEn: trainees_en[index].name,
  nameJp: trainees_jp[index].name,
  birthday: trainees_jp[index].birthday.replaceAll("/", "."),
  birthPlace: trainees_jp[index].birth_place,
  mbtiType: trainees_jp[index].mbti_type,
  height: trainees_jp[index].height,
  classes: trainees_jp[index].classes,
  profileUrl: `https://produce101.jp/profile/detail/?id=${trainees_jp[index].id}`,
  videoUrls: {
    eyeContact: trainees_jp[index].eye_contact_video_url,
    pr: trainees_jp[index].pr_video_url,
    fancam: trainees_jp[index].fancam_video_url,
  },
}));

export const LANGUAGES = [
  {
    "id": "ja",
    "name": "日本語",
  },
  {
    "id": "en",
    "name": "English",
  },
  {
    "id": "zh",
    "name": "繁體中文",
  },
];

export const getLanguageName = (id: string) => {
  for (const lang of LANGUAGES) {
    if (lang.id === id) {
      return lang.name;
    }
  }
  return LANGUAGES[0].name;
};

export const firebaseConfig = {
  apiKey: "AIzaSyCnJN3v7t2x-R0PfCGHsH7hobkAIKIbXbc",
  authDomain: "produce101jpthegirls.firebaseapp.com",
  databaseURL: "https://produce101jpthegirls-default-rtdb.firebaseio.com",
  projectId: "produce101jpthegirls",
  storageBucket: "produce101jpthegirls.appspot.com",
  messagingSenderId: "1019355306647",
  appId: "1:1019355306647:web:c518f2a8fc5669402527d2",
  measurementId: "G-ZJG5KYF35L",
};
