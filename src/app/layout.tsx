import './globals.css'
import type { Metadata } from 'next'
import { Noto_Sans_JP } from "next/font/google";
import Script from 'next/script'

const noto_sans_jp = Noto_Sans_JP({
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  title: 'PRODUCE 101 JAPAN THE GIRLS RANKER',
  description: 'PRODUCE 101 JAPAN THE GIRLS RANKER',
}

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
