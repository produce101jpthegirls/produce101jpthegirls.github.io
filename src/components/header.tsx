import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

const Header: FC = () => {
  return (
    <header
      className="bg-header-banner bg-no-repeat bg-center bg-cover
      h-[180px] sm:h-[300px] flex flex-col justify-center items-center"
    >
      <h1 className="w-[100px] h-[100px] sm:w-[170px] sm:h-[170px]">
        <Link href="/" className='block relative w-full h-full'>
          <Image src="/logo_new.svg" alt="Logo" fill style={{ objectFit: "contain" }} />
        </Link>
      </h1>
    </header>
  );
};

export default Header;
