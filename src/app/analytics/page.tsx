"use client";

import { AnalyticsBase } from "@/components/base";
import { StableLink } from "@/components/links";
import { TopNDataTable } from "@/components/tables";
import { useSiteContext } from "@/context/site";
import { CONTENTS } from "@/i18n";

export default function Analytics() {
  const { language } = useSiteContext();
  return (
    <AnalyticsBase
      title={CONTENTS[language]["analytics"]["videoPage"]["title"]}
      description={
        <>
          <span>The following show the video analytics of the top 3 videos in each category.</span>
          {" "}
          <span>Also check out the analytics based on each trainee</span>
          {" "}
          <StableLink
            className="text-pd-pink-400 hover:text-pd-pink-100"
            pathname="/analytics/trainees"
          >here</StableLink>
        </>
      }
      createTables={(
        pending: boolean,
        response: AnalyticsDataResponse | undefined,
        filterEnabled: boolean,
      ) => {
        return (
          pending ? (
            <div>Loading...</div>
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
                      <div className="mt-2 mb-2 sm:mt-4 sm:mb-0 w-full text-center">
                        <div className="flex">
                          <StableLink
                            className="block mx-auto px-1 sm:px-1.5 sm:py-0.5 rounded border text-pd-pink-400 border-pd-pink-400 hover:text-pd-pink-100 hover:border-pd-pink-100 text-sm"
                            pathname={`/analytics/videos/${sectionIndex}-${tableIndex}`}
                          >Expand</StableLink>
                        </div>
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
