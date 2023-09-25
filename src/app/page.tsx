"use client";
import { Noto_Sans_JP } from "next/font/google";
import Image from "next/image";
import { Dispatch, FC, ReactNode, SetStateAction, useEffect, useState } from "react";
import Footer from "@/components/footer";
import Header from "@/components/header";
import trainees_en from "@/data/trainees_en.json";
import trainees_jp  from "@/data/trainees_jp.json";

const noto_sans_jp = Noto_Sans_JP({
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

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
  traineeIndex: number;
  size: string;
  name?: string;
  image?: {
    src: string;
    alt: string;
  };
  setSelected?: Dispatch<SetStateAction<number[]>>;
};

const Avatar: FC<AvatarProps> = ({ index, traineeIndex, size, name, image, setSelected }) => {
  const STYLES = size == "large" ? "w-14 h-14 sm:w-16 sm:h-16 rounded-full" : "w-12 h-12 sm:w-14 sm:h-14 rounded-full";
  const draggable = image !== undefined && setSelected !== undefined;
  return (
    <div
      id={`avatar-${index}`}
      className={`${STYLES} relative bg-gray-200 flex items-center justify-center`}
      onClick={() => {
        if (setSelected) {
          setSelected((prev) => {
            const next = [...prev];
            next[next.indexOf(traineeIndex)] = -1;
            return next;
          });
        }
      }}
    >
      <div
          className={`${draggable ? "cursor-pointer" : ""} h-full w-full`}
          draggable={draggable}
          onDragEnd={(e) => {
            if (setSelected) {
              for (let i = 0; i < 11; i++) {
                const element = document.getElementById(`avatar-${i}`);
                if (element) {
                  const rect = element.getBoundingClientRect(); 
                  const radius = rect.width / 2;
                  const centerX = rect.x + radius;
                  const centerY = rect.y + radius;
                  const distance = Math.sqrt(Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2));
                  const overlapped = distance < radius;
                  if (overlapped) {
                    setSelected((prev) => {
                      const next = [...prev];
                      next[next.indexOf(traineeIndex)] = next[i];
                      next[i] = traineeIndex;
                      return next;
                    });
                    break;
                  }
                }
              }
            }
          }}
          onDragOver={(e) => e.preventDefault()}
        >
          {image && (
            <Image
              className={`${STYLES} border-2 sm:border-4 border-pd-pink-400`}
              src={image.src}
              alt={image.alt}
              width={550}
              height={550}
              draggable={false}
            />
          )}
        </div>
        {name && (
          <div className="absolute -bottom-4 sm:-bottom-5 text-xs sm:text-sm whitespace-nowrap">{name}</div>
        )}
    </div>
  )
};

type PaletteRowProps = {
  items: any[];
  startIndex: number;
  setSelected: Dispatch<SetStateAction<number[]>>;
}

const PaletteRow: FC<PaletteRowProps> = ({ items, startIndex, setSelected }) => {
  return (
    <div className="flex py-3 gap-2 sm:py-4 sm:gap-4 justify-center">{items.map((item, index) => (
      item ? (
        <Avatar
          key={index}
          index={startIndex + index}
          traineeIndex={item.index}
          size="large"
          name={item.nameJp}
          image={getItemImage(item)}
          setSelected={setSelected}
        />
      ) : (
        <Avatar
          key={index}
          index={startIndex + index}
          traineeIndex={-1}
          size="large"
          setSelected={setSelected}
        />
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
    <div className="px-2">
      <PaletteRow startIndex={0} items={[items[0]]} setSelected={setSelected} />
      <PaletteRow startIndex={1} items={[items[1], items[2]]} setSelected={setSelected} />
      <PaletteRow startIndex={3} items={[items[3], items[4], items[5]]} setSelected={setSelected} />
      <PaletteRow startIndex={6} items={[items[6], items[7], items[8], items[9], items[10]]} setSelected={setSelected} />
    </div>
  )
};

const addTrainee = (
  isSelected: boolean,
  selected: number[], 
  setSelected: Dispatch<SetStateAction<number[]>>,
  itemIndex: number,
) => {
  if (!isSelected && !selected.includes(itemIndex) && selected.some((index) => index === -1)) {
    // Add item to selected
    const newSelected = [...selected];
    const emptyIndex = newSelected.indexOf(-1);
    if (emptyIndex !== undefined) {
      newSelected[emptyIndex] = itemIndex;
      setSelected(newSelected);
    }
  }
};

type ListViewProps = {
  items: any[];
  selected: number[];
  setSelected: Dispatch<SetStateAction<number[]>>;
};

const ListView: FC<ListViewProps> = ({ items, selected, setSelected }) => {
  return (
    <ul className="flex flex-col h-[24rem] sm:h-[26rem] overflow-y-auto text-pd-gray-900">
      {items.map((item) => {
        const isSelected = selected.includes(item.index);
        return (
        <li
          key={item.id}
          className={`flex gap-4 items-center hover:bg-gray-100 px-3 py-2 sm:py-3 sm:px-4 sm:py-4 ${isSelected ? "bg-gray-100" : "cursor-pointer"}`}
          onClick={() => addTrainee(isSelected, selected, setSelected, item.index)}
        >
          <Avatar index={-1} traineeIndex={item.index} size="medium" image={getItemImage(item)} />
          <div className="grow">
            <div className="flex justify-between">
              <div className="select-none">{item.nameEn} ({item.nameJp})</div>
              <div className="select-none">{item.id}</div>
            </div>
            <div className="select-none">{item.birthday} {item.birthPlace}</div>
          </div>
        </li>
      )})}
    </ul>
  )
};

type GridViewProps = {
  items: any[];
  selected: number[];
  setSelected: Dispatch<SetStateAction<number[]>>;
};

const GridView: FC<GridViewProps> = ({ items, selected, setSelected }) => {
  return (
    <ul className="grid grid-cols-4 gap-1 h-[24rem] sm:h-[26rem] overflow-y-auto text-pd-gray-900">
      {items.map((item, index) => {
        const image = getItemImage(item);
        const isSelected = selected.includes(item.index);
        return (
          <li
            key={index}
            className={`text-center ${isSelected ? "text-pd-gray-300 grayscale" : "cursor-pointer"}`}
            onClick={() => addTrainee(isSelected, selected, setSelected, item.index)}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={550}
              height={550}
            />
            <div>{item.nameJp}</div>
          </li>
        );
      })}
    </ul>
  );
};

type PanelProps = {
  children: ReactNode[]|ReactNode|string;
}

const Panel: FC<PanelProps> = ({ children }) => {
  return (
    <div
      className="w-full sm:w-[480px] border border-gray-100 shadow
      rounded-2xl my-4 sm:my-0 text-sm sm:text-base"
    >{children}</div>
  )
};

export default function Home() {
  const [selected, setSelected] = useState<number[]>([-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]);
  const [query, setQuery] = useState<string>("");
  const [display, setDisplay] = useState<string>("list");

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
        className="text-pd-gray-400 flex flex-col sm:flex-row gap-0 sm:gap-8
        justify-center items-center sm:items-stretch my-4 sm:my-20 px-4"
      >
        <Panel>
          {/* <div className="px-4 py-2 border-b border-gray-100 text-pd-pink-100 font-bold">PICK YOUR TOP 11</div> */}
          <div className="p-3 flex gap-2 items-center justify-between border-b">
            <input
              className="grow bg-gray-100 px-3 py-1.5 rounded-lg focus:outline-none"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
            />
            <div className="flex gap-1">
              <button
                className={`rounded p-1 ${display == "list" ? "text-white bg-pd-gray-300" : ""}`}
                disabled={display == "list"}
                onClick={() => setDisplay("list")}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path fillRule="evenodd" d="M2.625 6.75a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875 0A.75.75 0 018.25 6h12a.75.75 0 010 1.5h-12a.75.75 0 01-.75-.75zM2.625 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zM7.5 12a.75.75 0 01.75-.75h12a.75.75 0 010 1.5h-12A.75.75 0 017.5 12zm-4.875 5.25a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875 0a.75.75 0 01.75-.75h12a.75.75 0 010 1.5h-12a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                </svg>
              </button>
              <button
                className={`rounded p-1 ${display == "grid" ? "text-white bg-pd-gray-300" : ""}`}
                disabled={display == "grid"}
                onClick={() => setDisplay("grid")}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                </svg>
              </button>
            </div>
          </div>
          {display === "list" ? (
            <ListView items={trainees} selected={selected} setSelected={setSelected} />
          ) : (
            <GridView items={trainees} selected={selected} setSelected={setSelected} />
          )}
        </Panel>
        <Panel>
          <div className="px-4 py-[0.96rem] border-b flex justify-between items-center">
            <div className="text-pd-pink-100 font-bold">SHARE YOUR TOP 11</div>
            <div>
              <button className="px-2 hover:text-pd-pink-100">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M7.5 3.375c0-1.036.84-1.875 1.875-1.875h.375a3.75 3.75 0 013.75 3.75v1.875C13.5 8.161 14.34 9 15.375 9h1.875A3.75 3.75 0 0121 12.75v3.375C21 17.16 20.16 18 19.125 18h-9.75A1.875 1.875 0 017.5 16.125V3.375z" />
                  <path d="M15 5.25a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963A5.23 5.23 0 0017.25 7.5h-1.875A.375.375 0 0115 7.125V5.25zM4.875 6H6v10.125A3.375 3.375 0 009.375 19.5H16.5v1.125c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V7.875C3 6.839 3.84 6 4.875 6z" />
                </svg>
              </button>
              <button className="px-2 hover:text-pd-pink-100">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M12 1.5a.75.75 0 01.75.75V7.5h-1.5V2.25A.75.75 0 0112 1.5zM11.25 7.5v5.69l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V7.5h3.75a3 3 0 013 3v9a3 3 0 01-3 3h-9a3 3 0 01-3-3v-9a3 3 0 013-3h3.75z" />
                </svg>
              </button>
            </div>
          </div>
          <div className="py-4">
            <Palette items={selectedTrainees} setSelected={setSelected} />
          </div>
        </Panel>
      </div>
      <Footer />
    </main>
  )
}