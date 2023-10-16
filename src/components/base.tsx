import { useSiteContext } from "@/context/site";
import { CONTENTS } from "@/i18n";
import { FC, ReactNode, useEffect, useState } from "react";
import { isCompletedSelection } from "@/utils";
import { TRAINEES } from "@/constants";
import Header from "./header";
import MyPick from "./my_pick";
import Section from "./section";
import { getAnalyticsData } from "@/core";
import Footer from "./footer";
// import Toggle from "./toggle";
import { StableLink } from "./links";

type AnalyticsBaseProps = {
  title?: ReactNode[] | ReactNode | string;
  description?: ReactNode[] | ReactNode | string;
  createTables?: (
    pending: boolean,
    response: AnalyticsDataResponse | undefined,
    filterEnabled: boolean,
  ) => (
    ReactNode[] | ReactNode | string
  );
  backButton?: {
    icon: ReactNode[] | ReactNode | string;
    pathname: string;
  };
};

export const AnalyticsBase: FC<AnalyticsBaseProps> = ({ title, description, createTables, backButton }) => {
  const { selected, language, isDev } = useSiteContext();
  const [pending, setPending] = useState<boolean>(true);
  const [response, setResponse] = useState<AnalyticsDataResponse | undefined>(undefined);
  const [filterEnabled, setFilterEnabled] = useState<boolean>(false);

  const isCompleted = selected && isCompletedSelection(selected);
  let selectedTrainees: Trainee[] | undefined = undefined;
  if (selected !== undefined && isCompletedSelection(selected)) {
    selectedTrainees = selected.map((index) => TRAINEES[index]);
  }

  useEffect(() => {
    getAnalyticsData(isDev).then((response) => {
      setResponse(response);
      setPending(false);
    });
  }, [isDev]);

  return (
    <main className="h-full">
      <Header />
      <div className="bg-body-background bg-contain sm:bg-cover">
        {selectedTrainees && <MyPick selectedTrainees={selectedTrainees} />}
        <Section>
          <h2 className="mb-2 text-pd-pink-400 font-bold text-base sm:text-xl break-keep"
          >{CONTENTS[language]["analytics"]["title"]}</h2>
          <p className="text-pd-gray-400 text-sm sm:text-base whitespace-pre-line break-keep"
          >{CONTENTS[language]["analytics"]["description"]}</p>
        </Section>
        <div className="px-4 sm:px-20 text-pd-gray-400">
          <div className="px-4 py-4 sm:p-8 mx-auto max-w-[1200px] bg-white border border-4 sm:border-8 border-pd-pink-400">
            <div className="mb-3 sm:mb-6 flex justify-between items-center flex-row gap-3">
              {title && (
                <h3 className="text-pd-pink-400 font-bold text-base sm:text-xl"
                >{title}</h3>
              )}
              {backButton && (
                <StableLink pathname={backButton.pathname}>{backButton.icon}</StableLink>
              )}
              {/* {isCompleted && (
                <div className="flex items-center gap-2 sm:flex-row-reverse">
                  <Toggle
                    enabled={filterEnabled}
                    setEnabled={setFilterEnabled}
                    size="h-[20px] w-[40px]"
                    buttonSize="h-[16px] w-[16px]"
                    translate="translate-x-5"
                  />
                  <label className="text-pd-gray-300 text-sm">SHOW MY TOP 11</label>
                </div>
              )} */}
            </div>
            <div className="mb-3">
              {description && <p className="mb-3">{description}</p>}
              {response?.updatedAt && (
                <p className="mb-3 text-sm">{
                  CONTENTS[language]["analytics"]["updatedAtFn"](
                    new Intl.DateTimeFormat("en-US", {
                      "year": "numeric",
                      "month": "short",
                      "day": "numeric",
                      "hour": "2-digit",
                      "minute": "2-digit",
                    },
                    ).format(new Date(response.updatedAt)))
                }</p>
              )}
            </div>
            {createTables && createTables(pending, response, filterEnabled)}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};
