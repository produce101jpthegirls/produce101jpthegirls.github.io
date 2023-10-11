import type { Metadata } from "next";
import RootLayout from "../../layout";

export const metadata: Metadata = {
  metadataBase: new URL("https://produce101jpthegirls.github.io"),
  title: "ANALYTICS | PRODUCE 101 JAPAN THE GIRLS RANKER",
  description: "ANALYTICS | PRODUCE 101 JAPAN THE GIRLS RANKER, 推しメンメーカー, 出道組金字塔",
  openGraph: {
    title: "ANALYTICS | PRODUCE 101 JAPAN THE GIRLS RANKER",
    description: "ANALYTICS | PRODUCE 101 JAPAN THE GIRLS RANKER, 推しメンメーカー, 出道組金字塔",
    url: "https://produce101jpthegirls.github.io/analytics/overview",
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

export function generateStaticParams() {
  return [
    { tab: "overview" },
    { tab: "details" },
  ];
}

export default RootLayout;
