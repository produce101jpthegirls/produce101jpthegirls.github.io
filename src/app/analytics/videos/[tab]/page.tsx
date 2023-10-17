"use client";

import { AnalyticsBase } from "@/components/base";
import { StableLink } from "@/components/links";
import { TopNDataTable } from "@/components/tables";
import { useSiteContext } from "@/context/site";
import { CONTENTS } from "@/i18n";

export default function Analytics({ params }: { params: { tab: string }}) {
  const tab = params.tab;
  const { language } = useSiteContext();
  return (
    <AnalyticsBase
      title={CONTENTS[language]["analytics"]["videoPage"]["title"]}
      description={
        <>
          <span>The following show the video analytics of the selected category.</span>
        </>
      }
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
      ) => {
        let specificTable: AnalyticsTable | undefined = undefined;
        if (tab !== "overview" && response) {
          const [sectionId, tableId] = tab.split("-").map((x) => parseInt(x));
          specificTable = response.sections[sectionId].tables[tableId];
        }
        return (
          pending ? (
            <div>Loading...</div>
          ) : specificTable ? (
            <div className="mt-4">
              {/* <h4 className="text-pd-pink-400 sm:text-lg font-bold">{specificTable.titles[language]}</h4> */}
              <div className="">
                <TopNDataTable
                  pending={pending}
                  data={specificTable.data}
                  filterSelected={filterEnabled}
                  title={`${specificTable.titles[language]} (${specificTable.uploadedAt})`}
                />
                <div className="mt-4 w-full">
                  <StableLink
                    className="block mx-auto px-1.5 py-0.5 rounded border text-pd-pink-400 border-pd-pink-400 hover:text-pd-pink-100 hover:border-pd-pink-100 text-sm"
                    pathname="/analytics"
                  >Back</StableLink>
                </div>
              </div>
            </div>
          ) : (
            response?.sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="mt-4">
                <h4 className="text-pd-pink-400 sm:text-lg font-bold">{section.titles[language]}</h4>
                <div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {section.tables.map((table, tableIndex) => (
                    <div key={tableIndex}>
                      <TopNDataTable
                        pending={pending}
                        data={table.data}
                        n={3}
                        filterSelected={filterEnabled}
                        title={`${table.titles[language]} (${table.uploadedAt})`}
                      />
                      <div className="mt-4 w-full">
                        <StableLink
                          className="block mx-auto px-1.5 py-0.5 rounded border text-pd-pink-400 border-pd-pink-400 hover:text-pd-pink-100 hover:border-pd-pink-100 text-sm"
                          pathname={`/analytics/videos/${sectionIndex}-${tableIndex}`}
                        >Expand</StableLink>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )
        );
      }}
    />
  );
}
