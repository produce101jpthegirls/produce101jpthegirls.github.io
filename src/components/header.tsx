import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { FC } from "react";
import { LanguageDropdown } from "./dropdowns";

const NAV_ITEMS = [
  {
    "name": "HOME",
    "href": "/",
  },
  {
    "name": "CHARACTERISTICS",
    "href": "/characteristics",
  },
  {
    "name": "ANALYTICS",
    "href": "/analytics",
  },
]

const Header: FC = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  return (
    <header
      className="relative bg-header-banner bg-no-repeat bg-center bg-cover
      h-[120px] sm:h-[300px] flex flex-col justify-center items-center"
    >
      <h1 className="mt-1 w-[70px] h-[70px] sm:w-[170px] sm:h-[170px]">
        <Link href="/" className='block relative w-full h-full'>
          <Image src="/logo_new.svg" alt="Logo" fill style={{ objectFit: "contain" }} />
        </Link>
      </h1>
      <ul className="sm:mt-7 flex gap-8">
        {NAV_ITEMS.map((item) => (
          <li key={item.href}>
            <Link
              href={{
                pathname: item.href,
                query: searchParams.toString(),
              }}
              className={`${pathname === item.href ? (
                  "text-pd-pink-100 pointer-events-none"
                ) : (
                  "text-pd-pink-400"
                )} font-bold text-sm tracking-wide`}
            >{item.name}</Link>
          </li>
        ))}
      </ul>
      <div className="absolute top-[16px] sm:top-[30px] right-6 sm:right-[30px] z-10">
        <LanguageDropdown />
      </div>
    </header>
  );
};

export default Header;
