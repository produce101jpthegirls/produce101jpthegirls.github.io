import bs58 from "bs58";

export const encodeSelection = (selected: number[]): string => {
  return bs58.encode(selected);
};

export const decodeSelection = (code: any): number[]|undefined => {
  if (typeof code === "string") {
    try {
      return Array.from(bs58.decode(code));
    } catch {
      return undefined;
    }
  }
  return undefined;
};
