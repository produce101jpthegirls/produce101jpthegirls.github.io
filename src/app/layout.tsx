import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

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
      <body className={inter.className}>{children}</body>
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
