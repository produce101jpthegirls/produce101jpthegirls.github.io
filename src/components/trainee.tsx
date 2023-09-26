import domtoimage from "dom-to-image";
import { Archivo_Black } from "next/font/google";
import Image from "next/image";
import { Dispatch, FC, SetStateAction, useState } from "react";
import trainees_en from "@/data/trainees_en.json";
import trainees_jp  from "@/data/trainees_jp.json";

const archivo_black_jp = Archivo_Black({
  weight: ["400"],
  subsets: ["latin"],
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

export const getItemImage = (item: any) => {
  return {
    src: "/assets/trainees/" + item.code + ".jpg",
    alt: item.nameEn,
  };
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

export const Avatar: FC<AvatarProps> = ({ index, traineeIndex, size, name, image, setSelected }) => {
  const STYLES = size == "large" ? "w-14 h-14 sm:w-[4.5rem] sm:h-[4.5rem] rounded-full" : "w-12 h-12 sm:w-14 sm:h-14 rounded-full";
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
          className={`${draggable ? "cursor-pointer" : ""} h-full w-full flex items-center justify-center`}
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
          {image ? (
            <Image
              className={`${STYLES} border-2 sm:border-4 border-pd-pink-400`}
              src={image.src}
              alt={image.alt}
              width={550}
              height={550}
              draggable={false}
            />
          ) : (
            <span
              className={`${archivo_black_jp.className} select-none text-gray-50 text-lg sm:text-2xl`}
            >{index+1}</span>
          )}
        </div>
        {name && (
          <div className="absolute -bottom-4 sm:-bottom-5 text-xs sm:text-xs whitespace-nowrap">{name}</div>
        )}
        {index === 0 && (
          <div className="absolute -top-6 sm:-top-8">
            {/* Crown Icon */}
            <svg width="174" height="169" viewBox="0 0 174 169" fill="#ff99be" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-7 sm:w-7">
              <path d="M33.2439 64.8072C30.4146 64.8072 15.9146 64.0911 3.89021 50.8432L1.76829 48.3369L0 48.6949L45.622 142.504V169H128.378V142.504L174 48.3369L172.585 47.9788L170.11 50.8432C158.085 64.0911 143.585 64.8072 140.756 64.8072H138.281L142.878 83.0678C132.622 97.3898 119.183 101.686 116 102.403C113.524 99.5381 105.39 88.4385 101.854 83.7839V73.4004L116 60.5106L115.293 59.4365C96.5488 38.3115 88.7683 0.358051 88.7683 0H87.3536H85.939C85.939 0.358051 77.8049 38.3115 59.4146 59.4365L58 60.1525L71.7927 73.0424V83.4258C68.2561 88.0805 60.1219 99.1801 57.6463 102.044C54.4634 101.328 41.0244 97.0318 30.7683 82.7098L35.3659 64.4491L33.2439 64.8072Z" />
            </svg>
          </div>
        )}
    </div>
  )
};

const TRAINEE_VIEW_HEIGHT = "h-[23.8rem] sm:h-[30rem]"

type ListViewProps = {
  items: any[];
  selected: number[];
  setSelected: Dispatch<SetStateAction<number[]>>;
};

const ListView: FC<ListViewProps> = ({ items, selected, setSelected }) => {
  return (
    <ul className={`${TRAINEE_VIEW_HEIGHT} flex flex-col overflow-y-auto text-pd-gray-900`}>
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

type TraineeViewProps = {
  selected: number[];
  setSelected: Dispatch<SetStateAction<number[]>>;
}

export const TraineeView: FC<TraineeViewProps> = ({ selected, setSelected }) => {
  const [query, setQuery] = useState<string>("");
  const [display, setDisplay] = useState<string>("list");
  return (
    <>
      <div className="p-3 flex gap-2 items-center justify-between border-b">
        {/* <div className="px-4 py-2 border-b border-gray-100 text-pd-pink-100 font-bold">PICK YOUR TOP 11</div> */}
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
    </>
  );
};

type PaletteRowProps = {
  items: any[];
  startIndex: number;
  setSelected: Dispatch<SetStateAction<number[]>>;
}

const PaletteRow: FC<PaletteRowProps> = ({ items, startIndex, setSelected }) => {
  return (
    <div className="flex py-3 gap-2 sm:py-3.5 sm:gap-3 justify-center">{items.map((item, index) => (
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
      <div id="palette-header" className="mx-3 sm:mx-6 border-b sm:border-b-2 border-gray-200 pt-2 pb-3 hidden">
        <h2 className="text-pd-pink-400 font-bold text-center">PRODUCE 101 JAPAN THE GIRLS<br />RANKER</h2>
      </div>
      <PaletteRow startIndex={0} items={[items[0]]} setSelected={setSelected} />
      <PaletteRow startIndex={1} items={[items[1], items[2]]} setSelected={setSelected} />
      <PaletteRow startIndex={3} items={[items[3], items[4], items[5]]} setSelected={setSelected} />
      <PaletteRow startIndex={6} items={[items[6], items[7], items[8], items[9], items[10]]} setSelected={setSelected} />
    </div>
  )
};

type SelectionViewProps = {
  selected: number[];
  setSelected: Dispatch<SetStateAction<number[]>>;
};

const createDownloadSelection = (): HTMLElement|undefined => {
  const element = document.getElementById("palette-wrapper");
  if (element) {
    console.log(element)
    const cloned = element.cloneNode(true) as HTMLElement;
    const _header = cloned.querySelector("#palette-header");
    if (_header) {
      const header = _header as HTMLElement;
      header.style.setProperty("display", "block");
    }
    cloned.style.setProperty("position", "absolute");
    cloned.style.setProperty("top", "0");
    return cloned;
  }
  return undefined;
};

export const SelectionView: FC<SelectionViewProps> = ({ selected, setSelected }) => {
  const selectedTrainees = selected.map((index) => index === -1 ? undefined : trainees[index]);
  const selectionCompleted = !selected.some((value) => value < 0);
  const disabled = !selectionCompleted;
  return (
    <>
      <div className="px-4 py-[0.85rem] sm:py-[0.96rem] border-b flex justify-between items-center">
        <div className="text-pd-pink-100 font-bold text-base sm:text-base">SHARE YOUR TOP 11</div>
        <div>
          <button
            className={`ml-3 ${disabled ? "text-gray-200" : "text-pd-pink-400 hover:text-pd-pink-100"}`}
            disabled={disabled}
            onClick={() => {
              navigator.clipboard.writeText(window.location.href)
                .then(() => {
                  alert("Copied the URL!");
                });
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M7.5 3.375c0-1.036.84-1.875 1.875-1.875h.375a3.75 3.75 0 013.75 3.75v1.875C13.5 8.161 14.34 9 15.375 9h1.875A3.75 3.75 0 0121 12.75v3.375C21 17.16 20.16 18 19.125 18h-9.75A1.875 1.875 0 017.5 16.125V3.375z" />
              <path d="M15 5.25a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963A5.23 5.23 0 0017.25 7.5h-1.875A.375.375 0 0115 7.125V5.25zM4.875 6H6v10.125A3.375 3.375 0 009.375 19.5H16.5v1.125c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V7.875C3 6.839 3.84 6 4.875 6z" />
            </svg>
          </button>
          <button
            className={`ml-3 ${disabled ? "text-gray-200" : "text-pd-pink-400 hover:text-pd-pink-100"}`}
            disabled={disabled}
            onClick={() => {
              const tmp = createDownloadSelection();
              if (tmp) {
                tmp.id = "tmp";
                document.body.appendChild(tmp);
                const node = document.getElementById("tmp");
                if (node) {
                  // https://github.com/tsayen/dom-to-image/issues/69#issuecomment-486146688
                  const scale = 2;
                  domtoimage.toPng(node, {
                    width: node.offsetWidth * scale,
                    height: node.offsetHeight * scale,
                    style: {
                      fontFamily: "Noto Sans JP",
                      transform: "scale(" + scale + ")",
                      transformOrigin: "top left",
                      width: node.offsetWidth + "px",
                      height: node.offsetHeight + "px"
                    },
                  })
                    .then((dataUrl) => {
                      console.log("Creating hidden element");
                      const link = document.createElement('a');
                      link.download = 'pick.png';
                      link.href = dataUrl;
                      link.click();
                      document.body.removeChild(tmp);
                    });
                }
              }
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M12 1.5a.75.75 0 01.75.75V7.5h-1.5V2.25A.75.75 0 0112 1.5zM11.25 7.5v5.69l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V7.5h3.75a3 3 0 013 3v9a3 3 0 01-3 3h-9a3 3 0 01-3-3v-9a3 3 0 013-3h3.75z" />
            </svg>
          </button>
        </div>
      </div>
      <div id="palette-wrapper" className="py-8 sm:py-10 bg-white">
        <Palette items={selectedTrainees} setSelected={setSelected} />
      </div>
    </>
  );
};
