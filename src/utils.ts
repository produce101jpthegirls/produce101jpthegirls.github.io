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

export const formatHumanNumber = (num: number, digits: number) => {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "K" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" }
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup.slice().reverse().find(function(item) {
    return num >= item.value;
  });
  return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
};

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

export const getLanguageId = (id: string | null) => {
  if (id && ["ja", "en", "zh"].includes(id)) {
    return id;
  }
  return "ja";
};
