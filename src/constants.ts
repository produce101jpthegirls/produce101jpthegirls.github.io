import trainees_en from "@/data/trainees_en.json";
import trainees_jp  from "@/data/trainees_jp.json";

export const TRAINEES: Trainee[] = Array.from(Array(trainees_en.length).keys()).map((index) => ({
  index,
  id: trainees_jp[index].id.split("_")[0],
  code: trainees_jp[index].id,
  nameEn: trainees_en[index].name,
  nameJp: trainees_jp[index].name,
  birthday: trainees_jp[index].birthday.replaceAll("/", "."),
  birthPlace: trainees_jp[index].birth_place,
  mbtiType: trainees_jp[index].mbti_type,
  profileUrl: `https://produce101.jp/profile/detail/?id=${trainees_jp[index].id}`,
  videoUrl: trainees_jp[index].video_url,
}));
