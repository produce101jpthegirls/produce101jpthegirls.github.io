import type { Metadata } from "next";
import HomeLayout from "../../layout";

export const metadata: Metadata = {
  metadataBase: new URL("https://produce101jpthegirls.github.io"),
  title: "ANALYTICS (DETAILS) | PRODUCE 101 JAPAN THE GIRLS RANKER",
  description: "Aggregated video statistics of the stage videos, fancam videos, promotion videos, etc. of the Produce 101 Japan Season 3",
  openGraph: {
    title: "ANALYTICS (DETAILS) | PRODUCE 101 JAPAN THE GIRLS RANKER",
    description: "Aggregated video statistics of the stage videos, fancam videos, promotion videos, etc. of the Produce 101 Japan Season 3",
    url: "https://produce101jpthegirls.github.io/analytics/details",
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

export default HomeLayout;
