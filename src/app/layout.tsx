import "./globals.css";
import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import Script from "next/script";

const noto_sans_jp = Noto_Sans_JP({
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://produce101jpthegirls.github.io"),
  title: "PRODUCE 101 JAPAN THE GIRLS RANKER",
  description: "PRODUCE 101 JAPAN THE GIRLS RANKER, 推しメンメーカー, 出道組金字塔",
  openGraph: {
    title: "PRODUCE 101 JAPAN THE GIRLS RANKER",
    description: "PRODUCE 101 JAPAN THE GIRLS RANKER, 推しメンメーカー, 出道組金字塔",
    url: "https://produce101jpthegirls.github.io/",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={noto_sans_jp.className}>{children}</body>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-ZJG5KYF35L" />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', 'G-ZJG5KYF35L');
        `}
      </Script>
    </html>
  )
}
