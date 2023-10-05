import bs58 from "bs58";

export const encodeSelection = (selected: number[]): string => {
  return bs58.encode(selected);
};

export const decodeSelection = (code: any): number[] | undefined => {
  if (typeof code === "string") {
    try {
      return Array.from(bs58.decode(code));
    } catch {
      return undefined;
    }
  }
  return undefined;
};

export const isValidTraineeIndex = (index: number): boolean => index >= 0 && index < 96;

export const isEmptyTraineeIndex = (index: number): boolean => index === 255;

export const isValidSelection = (selected: number[]): boolean => {
  return selected.length === 11 && selected.every((i) => isValidTraineeIndex(i) || isEmptyTraineeIndex(i));
}

export const isEmptySelection = (selected: number[]): boolean => {
  return isValidSelection(selected) && selected.every((i) => isEmptyTraineeIndex(i));
}

export const isCompletedSelection = (selected: number[]): boolean => {
  return isValidSelection(selected) && selected.every((i) => isValidTraineeIndex(i));
}

export const parseHumanNumber = (s: string) => {
  let magnitude = 4;
  for (const suffix of ["T", "B", "M", "K"]) {
    const _s = s.trim().toUpperCase()
    if (_s.endsWith(suffix)) {
      return parseFloat(_s.slice(0, -1)) * Math.pow(1000, magnitude);
    }
    magnitude--;
  };
  return parseFloat(s);
};

export const getItemTopImage = (item: Trainee) => {
  return {
    src: "/assets/trainees/top/" + item.code + ".jpg",
    alt: item.nameEn,
  };
};
