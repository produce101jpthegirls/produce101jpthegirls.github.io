import type { Metadata } from "next";
import RootLayout from "../layout";

export const metadata: Metadata = {
  metadataBase: new URL("https://produce101jpthegirls.github.io"),
  title: "CHARACTERISTICS | PRODUCE 101 JAPAN THE GIRLS RANKER",
  description: "CHARACTERISTICS | PRODUCE 101 JAPAN THE GIRLS RANKER, 推しメンメーカー, 出道組金字塔",
  openGraph: {
    title: "CHARACTERISTICS | PRODUCE 101 JAPAN THE GIRLS RANKER",
    description: "CHARACTERISTICS | PRODUCE 101 JAPAN THE GIRLS RANKER, 推しメンメーカー, 出道組金字塔",
    url: "https://produce101jpthegirls.github.io/characteristics",
    siteName: "PRODUCE 101 JAPAN THE GIRLS RANKER",
    type: "website",
    locale: "en-US",
    images: [
      {
        url: "https://produce101jpthegirls.github.io/og_preview.png",
        width: 800,
        height: 600,
        alt: "Preview",
      },
    ],
  },
};

export default RootLayout;
