import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

const Header: FC = () => {
  return (
    <header
      className="bg-header-banner bg-no-repeat bg-center bg-cover
      h-[90px] sm:h-[300px] flex flex-col justify-center items-center"
    >
      <h1 className="mt-1 sm:mt-0 w-[70px] h-[70px] sm:w-[170px] sm:h-[170px]">
        <Link href="/" className='block relative w-full h-full'>
          <Image src="/logo_new.svg" alt="Logo" fill style={{ objectFit: "contain" }} />
        </Link>
      </h1>
    </header>
  );
};

export default Header;
