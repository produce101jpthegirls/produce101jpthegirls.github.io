import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { FC } from "react";

const Header: FC = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  return (
    <header
      className="bg-header-banner bg-no-repeat bg-center bg-cover
      h-[120px] sm:h-[300px] flex flex-col justify-center items-center"
    >
      <h1 className="mt-1 w-[70px] h-[70px] sm:w-[170px] sm:h-[170px]">
        <Link href="/" className='block relative w-full h-full'>
          <Image src="/logo_new.svg" alt="Logo" fill style={{ objectFit: "contain" }} />
        </Link>
      </h1>
      <ul className="sm:mt-7 flex gap-8">
        <li>
          <Link
            href={{
              pathname: "/",
              query: searchParams.toString(),
            }}
            className={`${pathname === "/" ? "text-pd-pink-100 pointer-events-none" : "text-pd-pink-400"} font-bold text-sm tracking-wide`}
          >HOME</Link>
        </li>
        <li>
          <Link 
            href={{
              pathname: "/analytics",
              query: searchParams.toString(),
            }}
            className={`${pathname === "/analytics" ? "text-pd-pink-100 pointer-events-none" : "text-pd-pink-400"} font-bold text-sm tracking-wide`}
          >ANALYTICS</Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
