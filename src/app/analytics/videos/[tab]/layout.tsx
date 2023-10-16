import type { Metadata } from "next";
import HomeLayout from "../../../layout";
import { getAnalyticsData } from "@/core";

export const metadata: Metadata = {
  metadataBase: new URL("https://produce101jpthegirls.github.io"),
  title: "VIDEO ANALYTICS | PRODUCE 101 JAPAN THE GIRLS RANKER",
  description: "View counts and ranking of the stage videos, fancam videos, promotion videos, etc. of the Produce 101 Japan Season 3",
  openGraph: {
    title: "VIDEO ANALYTICS | PRODUCE 101 JAPAN THE GIRLS RANKER",
    description: "View counts and ranking of the stage videos, fancam videos, promotion videos, etc. of the Produce 101 Japan Season 3",
    url: "https://produce101jpthegirls.github.io/analytics/videos",
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

export async function generateStaticParams() {
  const isDev = false;
  const analyticsData = await getAnalyticsData(isDev);
  return analyticsData.sections
    .flatMap((section, sectionIndex) => section.tables
      .map((_, tableIndex) => ({ tab: `${sectionIndex}-${tableIndex}` })));
}

export default HomeLayout;
