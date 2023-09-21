import { Noto_Sans_JP } from "next/font/google";
import Footer from "@/components/footer";
import Header from "@/components/header";

const noto_sans_jp = Noto_Sans_JP({
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export default function Home() {
  return (
    <main className={`${noto_sans_jp.className} h-full`}>
      <Header />
      <div
        className="flex flex-col gap-4 justify-center items-center
        my-36 sm:my-40 px-4 text-center"
      >
        <h1
          className="text-pd-pink-100 sm:text-xl font-bold">PRODUCE 101 JAPAN THE GIRLS RANKER</h1>
        <p className="text-pd-gray">COMING SOON...</p>
      </div>
      <Footer />
    </main>
  )
}