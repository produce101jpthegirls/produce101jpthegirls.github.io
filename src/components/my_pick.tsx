import { getItemTopImage } from "@/utils";
import Image from "next/image";
import { FC } from "react";

type MyPickProps = {
  selectedTrainees: Trainee[];
};

const MyPick: FC<MyPickProps> = ({ selectedTrainees }) => {
  return (
    <div className="sm:px-48 pt-10 sm:pt-20 text-center text-pd-gray-400">
      <h2 className="text-pd-pink-400 font-bold text-base sm:text-xl">MY TOP 11</h2>
      <ul className="flex pt-2 sm:pt-6">{selectedTrainees.map((trainee) => {
        const image = getItemTopImage(trainee);
        return (
          <li key={trainee.id}>
            <Image
              src={image.src}
              alt={image.alt}
              width={300}
              height={800}
            />
          </li>
        );
      })}</ul>
    </div>
  );
};

export default MyPick;
