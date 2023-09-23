"use client";
import { Noto_Sans_JP } from "next/font/google";
import Footer from "@/components/footer";
import Header from "@/components/header";

const noto_sans_jp = Noto_Sans_JP({
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

import Image from "next/image";
import Link from "next/link";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import trainees_en from "@/data/trainees_en.json";
import trainees_jp  from "@/data/trainees_jp.json";

const trainees = Array.from(Array(trainees_en.length).keys()).map((index) => ({
  index,
  id: trainees_jp[index].id.split("_")[0],
  code: trainees_jp[index].id,
  nameEn: trainees_en[index].name,
  nameJp: trainees_jp[index].name,
  birthday: trainees_jp[index].birthday,
  birthPlace: trainees_jp[index].birth_place,
}));

const getItemImage = (item: any) => {
  return {
    src: "/assets/trainees/" + item.code + ".jpg",
    alt: item.nameEn,
  };
};

type AvatarProps = {
  index: number;
  image?: {
    src: string;
    alt: string;
  };
  setSelected?: Dispatch<SetStateAction<number[]>>;
};

const Avatar: FC<AvatarProps> = ({ index, image, setSelected }) => {
  return (
    <div
      className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gray-200 flex items-center justify-center ${setSelected ? "cursor-pointer" : ""}`}
      onClick={() => {
        if (setSelected) {
          setSelected((prev) => {
            const next = [...prev];
            next[next.indexOf(index)] = -1;
            return next;
          });
          // setSelected([-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]);
        }
      }}
    >
      {image && (
        <Image
          className="rounded-full border-4 border-[#FF67B3]"
          src={image.src}
          alt={image.alt}
          width={550}
          height={550}
        />
      )}
    </div>
  )
};

type PaletteRowProps = {
  items: any[];
  setSelected: Dispatch<SetStateAction<number[]>>;
}

const PaletteRow: FC<PaletteRowProps> = ({ items, setSelected }) => {
  return (
    <div className="flex py-1 gap-2 sm:py-1.5 sm:gap-3 justify-center">{items.map((item, index) => (
      item ? (
        <Avatar key={index} index={item.index} image={getItemImage(item)} setSelected={setSelected} />
      ) : (
        <Avatar key={index} index={-1} setSelected={setSelected} />
      )
    ))}</div>
  )
};

type PaletteProps = {
  items: any[];
  setSelected: Dispatch<SetStateAction<number[]>>;
};

const Palette: FC<PaletteProps> = ({ items, setSelected }) => {
  return (
    <div>
      <PaletteRow items={[items[0]]} setSelected={setSelected} />
      <PaletteRow items={[items[1], items[2]]} setSelected={setSelected} />
      <PaletteRow items={[items[3], items[4], items[5]]} setSelected={setSelected} />
      <PaletteRow items={[items[6], items[7], items[8], items[9], items[10]]} setSelected={setSelected} />
    </div>
  )
};

type ListViewProps = {
  items: any[];
  selected: number[];
  setSelected: Dispatch<SetStateAction<number[]>>;
};

const ListView: FC<ListViewProps> = ({ items, selected, setSelected }) => {
  return (
    <div className="sm:w-96 border border-gray-100 shadow rounded-2xl my-10 sm:my-0 h-full text-sm sm:text-base">
      <div className="p-3 flex">
        <input
          className="bg-gray-100 px-3 py-1.5 rounded-lg focus:outline-none"
          type="text"
          placeholder="Search"
        />
      </div>
      <ul className="flex flex-col h-96 overflow-y-auto">
        {items.map((item) => {
          const isSelected = selected.includes(item.index);
          return (
          <li
            key={item.id}
            className={`flex gap-4 items-center hover:bg-gray-100 px-3 py-3 sm:px-4 sm:py-4 ${isSelected ? "bg-gray-100" : "cursor-pointer"}`}
            onClick={() => {
              if (!isSelected && !selected.includes(item.index) && selected.some((index) => index === -1)) {
                // Add item to selected
                const newSelected = [...selected];
                const emptyIndex = newSelected.indexOf(-1);
                if (emptyIndex !== undefined) {
                  newSelected[emptyIndex] = item.index;
                  setSelected(newSelected);
                }
              }
            }}
          >
            <Avatar index={item.index} image={getItemImage(item)} />
            <div>
              <div>{item.id}</div>
              <div>{item.nameEn} ({item.nameJp})</div>
              <div>{item.birthday} {item.birthPlace}</div>
            </div>
          </li>
        )})}
      </ul>
    </div>
  )
};

export default function Home() {
  const [selected, setSelected] = useState<number[]>([-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]);

  const selectedTrainees = selected.map((index) => index === -1 ? undefined : trainees[index]);
  const selectionCode = Buffer.from(selected).toString("base64");

  useEffect(() => {
    console.log(selected);
  }, [selected]);

  useEffect(() => {
    console.log(selectionCode);
    window.history.replaceState("", "", "/?=" + selectionCode);
  }, [selectionCode]);

  return (
    <main className={`${noto_sans_jp.className} h-full`}>
      <Header />
      <div
        className="flex flex-col sm:flex-row gap-0 sm:gap-20
        justify-center items-center sm:items-start my-8 px-4"
      >
        <div className="flex flex-col items-center">
          <Palette items={selectedTrainees} setSelected={setSelected} />
          <div className="mt-8 border border-gray-300 rounded-2xl overflow-hidden flex">
            <div className="ml-2 px-2 py-2">Share your top 11</div>
            <button className="px-2 hover:bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
              </svg>
            </button>
          </div>
        </div>
        <ListView items={trainees} selected={selected} setSelected={setSelected} />
      </div>
      <Footer />
    </main>
  )
}