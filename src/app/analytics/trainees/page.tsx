"use client";

import { AnalyticsBase } from "@/components/base";
import { DetailedDataTable } from "@/components/tables";
import { useSiteContext } from "@/context/site";
import { CONTENTS } from "@/i18n";

export default function Analytics() {
  const { language } = useSiteContext();
  return (
    <AnalyticsBase
      title={CONTENTS[language]["analytics"]["traineePage"]["title"]}
      backButton={{
        pathname: "/analytics",
        icon: (
          <div className="rounded p-1 text-white bg-pd-pink-400 hover:bg-pd-pink-100">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
              <path fillRule="evenodd" d="M9.53 2.47a.75.75 0 010 1.06L4.81 8.25H15a6.75 6.75 0 010 13.5h-3a.75.75 0 010-1.5h3a5.25 5.25 0 100-10.5H4.81l4.72 4.72a.75.75 0 11-1.06 1.06l-6-6a.75.75 0 010-1.06l6-6a.75.75 0 011.06 0z" clipRule="evenodd" />
            </svg>
          </div>
        ),
      }}
      createTables={(
        pending: boolean,
        response: AnalyticsDataResponse | undefined,
        filterEnabled: boolean,
      ) => (
        <>
          <DetailedDataTable
            pending={pending}
            tables={response?.sections.flatMap((section) => section.tables) ?? []}
            filterSelected={filterEnabled}
          />
        </>
      )}
    />
  );
}
