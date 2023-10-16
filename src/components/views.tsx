import { EMPTY_SELECTION, TRAINEES } from "@/constants";
import { useSiteContext } from "@/context/site";
import { getItemImage, getItemThumbnail } from "@/core";
import { CONTENTS } from "@/i18n";
import { isCompletedSelection, isEmptySelection, isValidTraineeIndex } from "@/utils";
import { debounce } from "lodash";
import { Archivo_Black } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Dispatch, FC, SetStateAction, useCallback, useMemo, useState } from "react";
import { AvatarDropdown } from "./dropdowns";
import Select, { SelectOption } from "./select";
import Toggle from "./toggle";

const archivo_black_jp = Archivo_Black({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

const addTrainee = (
  isSelected: boolean,
  selected: number[],
  setSelected: Dispatch<SetStateAction<number[]>>,
  itemIndex: number,
) => {
  if (!isSelected && !selected.includes(itemIndex) && !isCompletedSelection(selected)) {
    // Add item to selected
    const newSelected = [...selected];
    const emptyIndex = newSelected.indexOf(255);
    if (emptyIndex !== undefined) {
      newSelected[emptyIndex] = itemIndex;
      setSelected(newSelected);
    }
  }
};

type AvatarProps = {
  rankIndex: number;
  traineeIndex: number;
  size: string;
  name?: string;
  fullName?: string;
  image?: {
    src: string;
    alt: string;
  };
  editable?: boolean;
};

export const Avatar: FC<AvatarProps> = ({
  rankIndex,
  traineeIndex,
  size,
  name,
  fullName,
  image,
  editable
}) => {
  const sizeClassName = size == "large" ? (
    "w-14 h-14 sm:w-[4.5rem] sm:h-[4.5rem] rounded-full"
  ) : size == "toDownload" ? (
    "w-12 h-12 sm:w-[4.5rem] sm:h-[4.5rem] rounded-full"
  ) : (
    "w-12 h-12 sm:w-14 sm:h-14 rounded-full"
  );

  const { setSelected } = useSiteContext();

  const draggable = image !== undefined && editable;

  let menuPosition = "top-0 left-16 sm:ml-6 origin-top-right";
  if ([2, 5].includes(rankIndex)) {
    menuPosition = "top-0 right-16 sm:mr-6 origin-top-right";
  } else if ([6, 7, 8].includes(rankIndex)) {
    menuPosition = "bottom-0 left-16 sm:ml-6 origin-top-right";
  } else if ([9, 10].includes(rankIndex)) {
    menuPosition = "bottom-0 right-16 sm:mr-6 origin-top-right";
  }

  const removeTrainee = useCallback(() => {
    if (draggable) {
      setSelected((prev) => {
        const next = [...prev];
        next[next.indexOf(traineeIndex)] = 255;
        return next;
      });
    }
  }, [draggable, setSelected, traineeIndex]);

  const swapTrainees = useCallback((toPositionIndex: number) => {
    if (draggable) {
      setSelected((prev) => {
        const next = [...prev];
        next[next.indexOf(traineeIndex)] = next[toPositionIndex];
        next[toPositionIndex] = traineeIndex;
        return next;
      });
    }
  }, [draggable, setSelected, traineeIndex]);

  return (
    <div
      id={`avatar-${traineeIndex}`}
      className={`${sizeClassName} relative bg-gray-200 flex items-center justify-center`}
    >
      <div
        className={`${draggable ? "cursor-pointer" : ""} h-full w-full flex items-center justify-center`}
        onClick={(e) => {
          if (e.type === "click") {
            removeTrainee();
          }
        }}
        draggable={draggable}
        onDragEnd={(e) => {
          for (let i = 0; i < 11; i++) {
            const element = document.getElementById(`avatar-${i}`);
            if (element) {
              const rect = element.getBoundingClientRect();
              const radius = rect.width / 2;
              const centerX = rect.x + radius;
              const centerY = rect.y + radius;
              const distance = (
                Math.sqrt(Math.pow(e.clientX - centerX, 2) +
                  Math.pow(e.clientY - centerY, 2))
              );
              const overlapped = distance < radius;
              if (overlapped) {
                swapTrainees(i);
                break;
              }
            }
          }
        }}
        onDragOver={(e) => e.preventDefault()}
      >
        {image ? (
          <Image
            className={`${sizeClassName} border-2 sm:border-4 border-pd-pink-400`}
            src={image.src}
            alt={image.alt}
            width={550}
            height={550}
            draggable={false}
          />
        ) : (
          <span
            className={`${archivo_black_jp.className} select-none text-gray-50 text-lg sm:text-2xl`}
          >{rankIndex + 1}</span>
        )}
      </div>
      {name && (
        <div className="absolute -bottom-[1.4rem] sm:-bottom-6 text-[11px] sm:text-xs whitespace-nowrap">{name}</div>
      )}
      {rankIndex === 0 && (
        <div className="absolute -top-6 sm:-top-8">
          {/* Crown Icon */}
          <svg width="174" height="169" viewBox="0 0 174 169" fill="#ff99be" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-7 sm:w-7">
            <path d="M33.2439 64.8072C30.4146 64.8072 15.9146 64.0911 3.89021 50.8432L1.76829 48.3369L0 48.6949L45.622 142.504V169H128.378V142.504L174 48.3369L172.585 47.9788L170.11 50.8432C158.085 64.0911 143.585 64.8072 140.756 64.8072H138.281L142.878 83.0678C132.622 97.3898 119.183 101.686 116 102.403C113.524 99.5381 105.39 88.4385 101.854 83.7839V73.4004L116 60.5106L115.293 59.4365C96.5488 38.3115 88.7683 0.358051 88.7683 0H87.3536H85.939C85.939 0.358051 77.8049 38.3115 59.4146 59.4365L58 60.1525L71.7927 73.0424V83.4258C68.2561 88.0805 60.1219 99.1801 57.6463 102.044C54.4634 101.328 41.0244 97.0318 30.7683 82.7098L35.3659 64.4491L33.2439 64.8072Z" />
          </svg>
        </div>
      )}
      {name && (
        <div
          className="absolute -bottom-[6px] sm:-bottom-[6px] text-[9px] sm:text-[10px] leading-3
            select-none bg-pd-pink-400 text-white font-bold w-3.5 sm:w-4 h-3.5 sm:h-4 text-center
            pt-[0.5px] sm:pt-[1.5px] rounded-full"
        >{rankIndex + 1}</div>
      )}
      {rankIndex >= 0 && isValidTraineeIndex(traineeIndex) && draggable && (
        <div className={`absolute ${sizeClassName}`} title={fullName}>
          <AvatarDropdown position={menuPosition} fns={[
            () => {
              if (rankIndex > 0) {
                swapTrainees(rankIndex - 1);
              }
            },
            () => {
              if (rankIndex < 10) {
                swapTrainees(rankIndex + 1);
              }
            },
            () => removeTrainee(),
          ]} />
        </div>
      )}
    </div>
  )
};

const TRAINEE_VIEW_HEIGHT = "h-[23.8rem] sm:h-[28.6rem]";

const getClassColor = (c: string): string => {
  if (c === "A") {
    return "bg-[#ed00e6]";
  }
  if (c === "B") {
    return "bg-[#f48919]";
  }
  if (c === "C") {
    return "bg-[#d8dc25]";
  }
  if (c === "D") {
    return "bg-[#4eeb19]";
  }
  if (c === "F") {
    return "bg-[#727073]";
  }
  return "bg-[#cdcdcd]";
};

type ListViewProps = {
  items: Trainee[];
};

const ListView: FC<ListViewProps> = ({ items }) => {
  const { selected, setSelected } = useSiteContext();
  return (
    <ul className={`${TRAINEE_VIEW_HEIGHT} flex flex-col overflow-y-auto text-pd-gray-900`}>
      {items.map((item) => {
        const isSelected = selected.includes(item.index);
        const traineeClass = item.classes.length > 0 ? item.classes[item.classes.length - 1] : "?";
        const traineeClassClassName = getClassColor(traineeClass);
        return (
          <li
            key={item.id}
            className={`flex gap-4 items-center hover:bg-zinc-100 px-3 py-2 sm:px-4 sm:py-2.5 ${isSelected ? "bg-zinc-100" : "cursor-pointer"}`}
            onClick={() => addTrainee(isSelected, selected, setSelected, item.index)}
          >
            <Avatar rankIndex={-1} traineeIndex={item.index} size="medium" image={getItemThumbnail(item)} />
            <div className="grow">
              <div className="flex justify-between">
                <div>
                  <span className="select-none">{item.nameJp}</span>
                  <span className="select-none ml-2 text-xs sm:text-base">({item.nameEn})</span>
                </div>
                <div className="select-none">{item.id}</div>
              </div>
              <div className="sm:mt-0.5 flex gap-4 items-center">
                <span className="select-none">{item.birthday}</span>
                <span className="select-none">{item.birthPlace}</span>
                <span className="select-none grow">{item.mbtiType}</span>
                <span className={`select-none text-white font-bold opacity-95 ${traineeClassClassName} w-[23.33px] sm:w-[26.66px] text-center rounded`}>{traineeClass}</span>
              </div>
              <div className="sm:mt-0.5 flex justify-between items-end text-sm">
                <div className="flex gap-3 item-centers">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mt-[2.5px] text-pd-pink-100 -mr-1">
                    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                  </svg>
                  <Link
                    className="text-pd-gray-300 hover:text-pd-pink-400 sm:font-medium text-sm"
                    href={item.profileUrl}
                    target="_blank"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span className="sm:inline sm:after:content-['_↗'] after:text-xs after:font-bold">Profile</span>
                  </Link>
                </div>
                <div className="flex gap-3 item-centers">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 461.001 461.001" fill="currentColor" className="w-4 h-4 mt-[2.5px] text-pd-pink-100 -mr-1">
                    <path d="M365.257,67.393H95.744C42.866,67.393,0,110.259,0,163.137v134.728
                    c0,52.878,42.866,95.744,95.744,95.744h269.513c52.878,0,95.744-42.866,95.744-95.744V163.137
                    C461.001,110.259,418.135,67.393,365.257,67.393z M300.506,237.056l-126.06,60.123c-3.359,1.602-7.239-0.847-7.239-4.568V168.607
                    c0-3.774,3.982-6.22,7.348-4.514l126.06,63.881C304.363,229.873,304.298,235.248,300.506,237.056z"/>
                  </svg>
                  <Link
                    className="text-pd-gray-300 hover:text-pd-pink-400 sm:font-medium"
                    href={item.videoUrls.pr}
                    target="_blank"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span className="sm:inline sm:after:content-['_↗'] after:text-xs after:font-bold">PR</span>
                  </Link>
                  <Link
                    className="text-pd-gray-300 hover:text-pd-pink-400 sm:font-medium"
                    href={item.videoUrls.fancam}
                    target="_blank"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span className="sm:inline sm:after:content-['_↗'] after:text-xs after:font-bold">Fancam</span>
                  </Link>
                  <Link
                    className="text-pd-gray-300 hover:text-pd-pink-400 sm:font-medium"
                    href={item.videoUrls.eyeContact}
                    target="_blank"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span className="sm:inline sm:after:content-['_↗'] after:text-xs after:font-bold">
                      <span className="hidden sm:inline">Eye Contact</span>
                      <span className="sm:hidden">Eye</span>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
};

type GridViewProps = {
  items: Trainee[];
};

const GridView: FC<GridViewProps> = ({ items }) => {
  const { selected, setSelected } = useSiteContext();
  return (
    <ul className={`${TRAINEE_VIEW_HEIGHT} grid grid-cols-3 sm:grid-cols-4 gap-1 overflow-y-auto text-pd-gray-900`}>
      {items.map((item, index) => {
        const image = getItemImage(item);
        const isSelected = selected.includes(item.index);
        return (
          <li
            key={index}
            className={`relative text-center`}
            onClick={() => addTrainee(isSelected, selected, setSelected, item.index)}
          >
            <div className={`${isSelected ? "" : "cursor-pointer"}`}>
              <Image
                className={`${isSelected ? "grayscale contrast-50" : ""}`}
                src={image.src}
                alt={image.alt}
                width={550}
                height={550}
              />
              <div className={`${isSelected ? "text-pd-gray-300" : ""}`}>{item.nameJp}</div>
            </div>
            {/* {isSelected && (
              <div className="absolute top-0 left-0 w-max before:absolute before:left-0 before:right-0 before:top-0 before:z-10 before:h-full before:w-full before:bg-[#e3ebf5] before:opacity-50 before:mix-blend-screen">
                <div className="w-[116px] h-[136px]" />
              </div>
            )} */}
          </li>
        );
      })}
    </ul>
  );
};

export const TraineeView: FC = () => {
  const sortByOptions: SelectOption[] = [
    { name: "ID" },
    { name: "CLASS" },
  ];
  const [queryText, setQueryText] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  const [display, setDisplay] = useState<string>("list");
  const [filterEnabled, setFilterEnabled] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>(sortByOptions[0].name);
  const { selected } = useSiteContext();

  const debouncedSetQuery = useMemo(() => debounce((value) => setQuery(value), 500), []);

  let filteredTrainees = filterEnabled ? selected.filter((index) => index !== 255).map((index) => TRAINEES[index]) : TRAINEES;
  filteredTrainees = query === "" ? filteredTrainees : filteredTrainees.filter((trainee) => {
    const _query = query.toLowerCase().replaceAll(" ", "");
    return (
      trainee.nameEn.toLowerCase().replaceAll(" ", "").includes(_query) ||
      trainee.nameJp.toLowerCase().replaceAll(" ", "").includes(_query) ||
      trainee.birthPlace.toLowerCase().replaceAll(" ", "").includes(_query) ||
      trainee.birthday.toLowerCase().replaceAll(" ", "").includes(_query) ||
      trainee.id.toLowerCase().replaceAll(" ", "").includes(_query)
    );
  });

  let sortedTrainees = filteredTrainees;
  if (sortBy === "ID") {
    sortedTrainees.sort((a, b) => a.index - b.index);
  } else if (sortBy === "CLASS") {
    sortedTrainees.sort((a, b) => {
      const classA = a.classes.length > 0 ? a.classes[a.classes.length - 1] : "Z";
      const classB = b.classes.length > 0 ? b.classes[b.classes.length - 1] : "Z";
      if (classA > classB) {
        return 1;
      }
      if (classA < classB) {
        return -1;
      }
      return 0;
    });
  }


  return (
    <>
      <div className="px-3 py-2 sm:p-2.5 flex gap-2 items-center justify-between border-b">
        {/* <div className="px-4 py-2 border-b border-gray-100 text-pd-pink-100 font-bold">PICK YOUR TOP 11</div> */}
        <div className="grow flex items-center bg-zinc-100 px-3 py-1 sm:px-3 sm:py-1.5 rounded-lg overflow-hidden">
          <input
            id="search"
            className="grow bg-zinc-100 focus:outline-none text-base"
            type="text"
            value={queryText}
            onChange={(e) => {
              setQueryText(e.target.value);
              debouncedSetQuery(e.target.value);
            }}
            placeholder="SEARCH"
          />
          <button
            className={`group -mr-1 ${query === "" ? "hidden" : "text-pd-pink-400"}`}
            title="Clear query"
            disabled={query === ""}
            onClick={() => {
              setQueryText("");
              setQuery("");
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 transition duration-300 group-hover:flip-y">
              <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        <div className="flex gap-1">
          <button
            className={`rounded p-1 ${display == "list" ? "text-white bg-pd-pink-400" : "hover:text-pd-pink-400"}`}
            title="List view"
            disabled={display == "list"}
            onClick={() => setDisplay("list")}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M2.625 6.75a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875 0A.75.75 0 018.25 6h12a.75.75 0 010 1.5h-12a.75.75 0 01-.75-.75zM2.625 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zM7.5 12a.75.75 0 01.75-.75h12a.75.75 0 010 1.5h-12A.75.75 0 017.5 12zm-4.875 5.25a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875 0a.75.75 0 01.75-.75h12a.75.75 0 010 1.5h-12a.75.75 0 01-.75-.75z" clipRule="evenodd" />
            </svg>
          </button>
          <button
            className={`rounded p-1 ${display == "grid" ? "text-white bg-pd-pink-400" : "hover:text-pd-pink-400"}`}
            title="Grid view"
            disabled={display == "grid"}
            onClick={() => setDisplay("grid")}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
            </svg>
          </button>
        </div>
      </div>
      <div className="pl-3 pr-4 py-2 sm:py-2.5 flex gap-2 items-center justify-between border-b">
        <div className="flex items-center gap-2 grow">
          <Toggle
            enabled={filterEnabled}
            setEnabled={setFilterEnabled}
            size="h-[20px] w-[40px]"
            buttonSize="h-[16px] w-[16px]"
            translate="translate-x-5"
          />
          <label className="text-pd-gray-300 text-sm">SHOW MY TOP 11</label>
        </div>
        <span className="text-pd-gray-300 text-sm">SORT BY</span>
        <Select selected={sortBy} setSelected={setSortBy} options={sortByOptions} />
      </div>
      {display === "list" ? (
        <ListView items={filteredTrainees} />
      ) : (
        <GridView items={filteredTrainees} />
      )}
    </>
  );
};

type PaletteRowProps = {
  items: (Trainee | undefined)[];
  startIndex: number;
  toDownload?: boolean;
}

const PaletteRow: FC<PaletteRowProps> = ({ items, startIndex, toDownload }) => {
  const gapXClassName = toDownload ? "gap-x-3 sm:gap-x-6" : "gap-x-2 sm:gap-x-3";
  const { language } = useSiteContext();
  return (
    <div className={`flex py-3.5 sm:py-4 ${gapXClassName} justify-center`}>{items.map((item, index) => (
      item ? (
        <Avatar
          key={index}
          rankIndex={startIndex + index}
          traineeIndex={item.index}
          size={toDownload ? "toDownload" : "large"}
          name={language === "en" ? item.nameEn.split(" ")[1] : item.nameJp}
          fullName={language === "en" ? item.nameEn : item.nameJp}
          image={getItemImage(item)}
          editable={!toDownload}
        />
      ) : (
        <Avatar
          key={index}
          rankIndex={startIndex + index}
          traineeIndex={-1}
          size={toDownload ? "toDownload" : "large"}
          editable={!toDownload}
        />
      )
    ))}</div>
  )
};

type PaletteProps = {
  items: (Trainee | undefined)[];
  toDownload?: boolean;
};

export const Palette: FC<PaletteProps> = ({ items, toDownload }) => {
  const { language } = useSiteContext();
  return (
    <div className="px-2">
      {toDownload && (
        <div className="mx-4 border-b sm:border-b-2 border-gray-200 pb-3 mb-8">
          <h2 className="text-pd-pink-400 text-sm sm:text-xl font-bold text-center break-keep">{CONTENTS[language]["home"]["title"]}</h2>
        </div>
      )}
      <PaletteRow startIndex={0} items={[items[0]]} toDownload={toDownload} />
      <PaletteRow startIndex={1} items={[items[1], items[2]]} toDownload={toDownload} />
      <PaletteRow startIndex={3} items={[items[3], items[4], items[5]]} toDownload={toDownload} />
      <PaletteRow startIndex={6} items={[items[6], items[7], items[8], items[9], items[10]]} toDownload={toDownload} />
      {toDownload && (
        <div className="text-right text-black mt-5 sm:mt-6 mr-2.5 sm:mr-3.5 text-xs sm:text-sm">
          at {new Date().toLocaleString("ja-JP").slice(0, -3)}
        </div>
      )}
    </div>
  )
};

type SelectionViewProps = {
  setCompleteModalIsOpen: Dispatch<SetStateAction<boolean>>;
  setDownloadModalIsOpen: Dispatch<SetStateAction<boolean>>;
};

export const SelectionView: FC<SelectionViewProps> = ({
  setCompleteModalIsOpen,
  setDownloadModalIsOpen,
}) => {
  const router = useRouter();
  const { selected, setSelected, language } = useSiteContext();
  const selectedTrainees: (Trainee | undefined)[] = selected.map((index) => index === 255 ? undefined : TRAINEES[index]);
  const isEmpty = isEmptySelection(selected);
  const isNotCompleted = !isCompletedSelection(selected);

  return (
    <>
      <div className="px-4 py-[0.85rem] sm:py-[1rem] border-b flex justify-between items-center">
        <div className={`${isNotCompleted ? "text-pd-pink-100" : "text-pd-pink-400"} font-bold text-base sm:text-base`}
        >{CONTENTS[language]["home"]["selectionPanel"]["title"]}</div>
        <div className="flex items-center">
          <button
            className="ml-3 mr-0.5 text-pd-pink-400 group"
            title="Random"
            onClick={() => {
              const unshuffled = Array.from(Array(TRAINEES.length).keys());
              const shuffled = unshuffled
                .map(value => ({ value, sort: Math.random() }))
                .sort((a, b) => a.sort - b.sort)
                .map(({ value }) => value)
              setSelected(shuffled.slice(0, 11));
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 1.5 28 28" fill="currentColor" className="w-6 h-6 transition duration-300 group-hover:flip-y">
              <path d="M0 20.688v2c0 0.281 0.219 0.5 0.5 0.5h2.875c1.688 0 3.094-0.781 4.25-1.969 1.188-1.188 2.156-2.781 3.125-4.313 0.781-1.25 1.563-2.438 2.375-3.344 0.781-0.938 1.563-1.5 2.5-1.5h2.656v2.281c0 0.719 0.5 0.844 1.094 0.375l4.344-3.625c0.375-0.313 0.375-0.906 0-1.219l-4.344-3.594c-0.594-0.5-1.094-0.375-1.094 0.375v2.406h-2.656c-1.719 0-3.063 0.75-4.25 1.969-1.156 1.188-2.219 2.781-3.156 4.281-0.813 1.281-1.563 2.5-2.375 3.406-0.781 0.906-1.563 1.469-2.469 1.469h-2.875c-0.281 0-0.5 0.219-0.5 0.5zM0 9.531v2c0 0.281 0.219 0.5 0.5 0.5h2.875c1.406 0 2.531 1.375 3.75 3.156 0.031-0.094 0.063-0.156 0.094-0.219 0.031-0.031 0.125-0.094 0.156-0.156 0.469-0.781 1-1.531 1.5-2.344-0.75-0.969-1.469-1.844-2.406-2.438-0.906-0.625-1.906-0.969-3.094-0.969h-2.875c-0.344 0-0.5 0.156-0.5 0.469zM18.281 20.125h-2.656c-1.375 0-2.563-1.344-3.75-3.094-0.063 0.094-0.094 0.156-0.125 0.219-0.063 0.063-0.094 0.125-0.156 0.219-0.219 0.375-0.5 0.781-0.719 1.156-0.25 0.344-0.5 0.75-0.719 1.094 0.719 0.969 1.469 1.813 2.375 2.406 0.875 0.625 1.906 1.031 3.094 1.031h2.656v2.188c0 0.719 0.5 0.875 1.094 0.375l4.344-3.656c0.375-0.313 0.375-0.875 0-1.188l-4.344-3.594c-0.594-0.469-1.094-0.375-1.094 0.375v2.469z"></path>
            </svg>
            {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mt-0.5 transition duration-300 group-hover:flip-y">
              <path d="M18 9v-3c-1 0-3.308-.188-4.506 2.216l-4.218 8.461c-1.015 2.036-3.094 3.323-5.37 3.323h-3.906v-2h3.906c1.517 0 2.903-.858 3.58-2.216l4.218-8.461c1.356-2.721 3.674-3.323 6.296-3.323v-3l6 4-6 4zm-9.463 1.324l1.117-2.242c-1.235-2.479-2.899-4.082-5.748-4.082h-3.906v2h3.906c2.872 0 3.644 2.343 4.631 4.324zm15.463 8.676l-6-4v3c-3.78 0-4.019-1.238-5.556-4.322l-1.118 2.241c1.021 2.049 2.1 4.081 6.674 4.081v3l6-4z" />
            </svg> */}
          </button>
          <button
            className={`ml-3 ${isEmpty ? "text-gray-200" : "text-pd-pink-400 group"}`}
            title="Clear"
            disabled={isEmpty}
            onClick={() => {
              if (!isEmpty) {
                setSelected(EMPTY_SELECTION);
              }
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 transition duration-300 group-hover:flip-y">
              <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
            </svg>
          </button>
          <button
            className={`ml-3 ${isNotCompleted ? "text-gray-200" : "text-pd-pink-400 group"}`}
            title="Copy URL"
            disabled={isNotCompleted}
            onClick={() => {
              navigator.clipboard.writeText(window.location.href)
                .then(() => setCompleteModalIsOpen(true));
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 transition duration-300 group-hover:flip-y">
              <path d="M7.5 3.375c0-1.036.84-1.875 1.875-1.875h.375a3.75 3.75 0 013.75 3.75v1.875C13.5 8.161 14.34 9 15.375 9h1.875A3.75 3.75 0 0121 12.75v3.375C21 17.16 20.16 18 19.125 18h-9.75A1.875 1.875 0 017.5 16.125V3.375z" />
              <path d="M15 5.25a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963A5.23 5.23 0 0017.25 7.5h-1.875A.375.375 0 0115 7.125V5.25zM4.875 6H6v10.125A3.375 3.375 0 009.375 19.5H16.5v1.125c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V7.875C3 6.839 3.84 6 4.875 6z" />
            </svg>
          </button>
          <button
            className={`ml-3 ${isNotCompleted ? "text-gray-200" : "text-pd-pink-400 group"}`}
            title="Download image"
            disabled={isNotCompleted}
            onClick={() => setDownloadModalIsOpen(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-[26px] h-[26px] -mt-[1px] transition duration-300 group-hover:flip-y">
              <path d="M12 1.5a.75.75 0 01.75.75V7.5h-1.5V2.25A.75.75 0 0112 1.5zM11.25 7.5v5.69l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V7.5h3.75a3 3 0 013 3v9a3 3 0 01-3 3h-9a3 3 0 01-3-3v-9a3 3 0 013-3h3.75z" />
            </svg>
          </button>
          <button
            className={`ml-3 ${isNotCompleted ? "text-gray-200" : "text-pd-pink-400 group"}`}
            title="View characteristics"
            disabled={isNotCompleted}
            onClick={() => router.push("/characteristics" + location.search)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 transition duration-300 group-hover:flip-y">
              <path fillRule="evenodd" d="M2.25 13.5a8.25 8.25 0 018.25-8.25.75.75 0 01.75.75v6.75H18a.75.75 0 01.75.75 8.25 8.25 0 01-16.5 0z" clipRule="evenodd" />
              <path fillRule="evenodd" d="M12.75 3a.75.75 0 01.75-.75 8.25 8.25 0 018.25 8.25.75.75 0 01-.75.75h-7.5a.75.75 0 01-.75-.75V3z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
      <div className="py-8 sm:py-10 bg-white">
        <Palette items={selectedTrainees} />
      </div>
    </>
  );
};
