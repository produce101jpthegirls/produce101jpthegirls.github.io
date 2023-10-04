import { LANGUAGES, getLanguageName } from "@/constants";
import { Menu, Transition } from "@headlessui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FC, Fragment, SVGProps, useEffect, useState } from "react";

type AvatarDropdownProps = {
  position: string;
  fns: (() => void)[];
};

export const AvatarDropdown: FC<AvatarDropdownProps> = ({ position, fns }) => {
  return (
    <Menu as="div" className="w-full h-full relative inline-block text-left">
      <Menu.Button className="w-full h-full bg-opacity-0 hover:bg-opacity-10 bg-pd-gray-900 rounded-full overflow-hidden">
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className={`z-10 absolute ${position} w-32 sm:w-36 divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}>
          <div className="px-1 py-1 ">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? 'bg-pd-pink-400 text-white' : 'text-gray-900'
                  } group flex w-full items-center rounded-md px-1 py-1 sm:px-2 sm:py-2 text-xs sm:text-sm`}
                  onClick={() => {
                    fns[0]();
                  }}
                >
                  {active ? (
                    <UpActiveIcon
                      className="mr-2 w-4 h-4 sm:w-5 sm:h-5"
                      aria-hidden="true"
                    />
                  ) : (
                    <UpInactiveIcon
                      className="mr-2 w-4 h-4 sm:w-5 sm:h-5"
                      aria-hidden="true"
                    />
                  )}
                  Move Higher
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? 'bg-pd-pink-400 text-white' : 'text-gray-900'
                  } group flex w-full items-center rounded-md px-1 py-1 sm:px-2 sm:py-2 text-xs sm:text-sm`}
                  onClick={() => {
                    fns[1]();
                  }}
                >
                  {active ? (
                    <DownActiveIcon
                      className="mr-2 w-4 h-4 sm:w-5 sm:h-5"
                      aria-hidden="true"
                    />
                  ) : (
                    <DownInactiveIcon
                      className="mr-2 w-4 h-4 sm:w-5 sm:h-5"
                      aria-hidden="true"
                    />
                  )}
                  Move Lower
                </button>
              )}
            </Menu.Item>
          </div>
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? 'bg-pd-pink-400 text-white' : 'text-gray-900'
                  } group flex w-full items-center rounded-md px-1 py-1 sm:px-2 sm:py-2 text-xs sm:text-sm`}
                  onClick={() => {
                    fns[2]();
                  }}
                >
                  {active ? (
                    <DeleteActiveIcon
                      className="mr-2 w-4 h-4 sm:w-5 sm:h-5"
                      aria-hidden="true"
                    />
                  ) : (
                    <DeleteInactiveIcon
                      className="mr-2 w-4 h-4 sm:w-5 sm:h-5"
                      aria-hidden="true"
                    />
                  )}
                  Delete
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

const UpInactiveIcon: FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path fillRule="evenodd" d="M12 20.25a.75.75 0 01-.75-.75V6.31l-5.47 5.47a.75.75 0 01-1.06-1.06l6.75-6.75a.75.75 0 011.06 0l6.75 6.75a.75.75 0 11-1.06 1.06l-5.47-5.47V19.5a.75.75 0 01-.75.75z" clipRule="evenodd" />
    </svg>
  );
};

const UpActiveIcon: FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path fillRule="evenodd" d="M12 20.25a.75.75 0 01-.75-.75V6.31l-5.47 5.47a.75.75 0 01-1.06-1.06l6.75-6.75a.75.75 0 011.06 0l6.75 6.75a.75.75 0 11-1.06 1.06l-5.47-5.47V19.5a.75.75 0 01-.75.75z" clipRule="evenodd" />
    </svg>
  );
};

const DownInactiveIcon: FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v13.19l5.47-5.47a.75.75 0 111.06 1.06l-6.75 6.75a.75.75 0 01-1.06 0l-6.75-6.75a.75.75 0 111.06-1.06l5.47 5.47V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
    </svg>
  );
};

const DownActiveIcon: FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v13.19l5.47-5.47a.75.75 0 111.06 1.06l-6.75 6.75a.75.75 0 01-1.06 0l-6.75-6.75a.75.75 0 111.06-1.06l5.47 5.47V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
    </svg>
  );
};

const DeleteInactiveIcon: FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
  );
};

const DeleteActiveIcon: FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
  );
};


export const LanguageDropdown: FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang") ?? "";
  const [language, setLanguage] = useState<string>(lang);
  useEffect(() => {
    if (language !== "" && language !== lang) {
      // Set lang in params
      const currentUrlParams = new URLSearchParams(searchParams);
      currentUrlParams.set("lang", language);
      router.push(`${pathname}?${currentUrlParams.toString()}`, { scroll: false });
      console.log("dropdown push");
    }
  }, [language]);
  return (
    <div className="text-right">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-[104px] sm:w-[120px] justify-start items-center gap-1 rounded-full px-2 py-1 sm:px-4 sm:py-2 text-sm text-pd-pink-400 border-[1.5px] border-pd-pink-400">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 -mb-[1px]">
              <path d="M21.721 12.752a9.711 9.711 0 00-.945-5.003 12.754 12.754 0 01-4.339 2.708 18.991 18.991 0 01-.214 4.772 17.165 17.165 0 005.498-2.477zM14.634 15.55a17.324 17.324 0 00.332-4.647c-.952.227-1.945.347-2.966.347-1.021 0-2.014-.12-2.966-.347a17.515 17.515 0 00.332 4.647 17.385 17.385 0 005.268 0zM9.772 17.119a18.963 18.963 0 004.456 0A17.182 17.182 0 0112 21.724a17.18 17.18 0 01-2.228-4.605zM7.777 15.23a18.87 18.87 0 01-.214-4.774 12.753 12.753 0 01-4.34-2.708 9.711 9.711 0 00-.944 5.004 17.165 17.165 0 005.498 2.477zM21.356 14.752a9.765 9.765 0 01-7.478 6.817 18.64 18.64 0 001.988-4.718 18.627 18.627 0 005.49-2.098zM2.644 14.752c1.682.971 3.53 1.688 5.49 2.099a18.64 18.64 0 001.988 4.718 9.765 9.765 0 01-7.478-6.816zM13.878 2.43a9.755 9.755 0 016.116 3.986 11.267 11.267 0 01-3.746 2.504 18.63 18.63 0 00-2.37-6.49zM12 2.276a17.152 17.152 0 012.805 7.121c-.897.23-1.837.353-2.805.353-.968 0-1.908-.122-2.805-.353A17.151 17.151 0 0112 2.276zM10.122 2.43a18.629 18.629 0 00-2.37 6.49 11.266 11.266 0 01-3.746-2.504 9.754 9.754 0 016.116-3.985z" />
            </svg>
            <span className="pr-1">{getLanguageName(language)}</span>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-[120px] origin-top-right divide-y divide-gray-100 rounded-md bg-pd-pink-100">
            <div className="px-1 py-1 ">
              {LANGUAGES.map(({ id, name }) => (
                <Menu.Item>
                  {() => (
                    <button
                      key={id}
                      className={`text-white hover:text-[#fffa00] group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      onClick={() => setLanguage(id)}
                    >
                      {name}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
};
