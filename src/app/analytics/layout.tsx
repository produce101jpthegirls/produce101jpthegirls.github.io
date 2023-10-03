import type { Metadata } from "next";
import RootLayout from "../layout";

export const metadata: Metadata = {
  title: "ANALYTICS | PRODUCE 101 JAPAN THE GIRLS RANKER",
  description: "ANALYTICS | PRODUCE 101 JAPAN THE GIRLS RANKER",
  openGraph: {
    title: "ANALYTICS | PRODUCE 101 JAPAN THE GIRLS RANKER",
    description: "ANALYTICS | PRODUCE 101 JAPAN THE GIRLS RANKER",
    url: "https://produce101jpthegirls.github.io/analytics",
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
