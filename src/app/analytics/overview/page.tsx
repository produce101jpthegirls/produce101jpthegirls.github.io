"use client";

import { AnalyticsBase } from "@/components/base";
import { StableLink } from "@/components/links";
import { AnalyticsDataResponse, TopNDataTable } from "@/components/tables";
import { useSiteContext } from "@/context/site";
import { CONTENTS } from "@/i18n";

export default function Analytics() {
  const { language } = useSiteContext();
  return (
    <AnalyticsBase
      title={CONTENTS[language]["analytics"]["overviewTab"]["title"]}
      description={
        <>
          <span>The following show the video analytics of the top 11 videos in each category.</span>
          {" "}
          <span>Also check out the detailed analytics</span>
          {" "}
          <StableLink
            className="text-pd-pink-400 hover:text-pd-pink-100"
            pathname="/analytics/details"
          >here</StableLink>
        </>
      }
      createTables={(
        pending: boolean,
        response: AnalyticsDataResponse | undefined,
        filterEnabled: boolean,
      ) => (
        <>{
          pending ? (
            <div>Loading...</div>
          ) : (
            response?.sections.map((section, index) => (
              <div key={index} className="mt-4">
                <h4 className="text-pd-pink-400 sm:text-lg font-bold">{section.titles[language]}</h4>
                <div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {section.tables.map((table, index) => (
                    <TopNDataTable
                      key={index}
                      pending={pending}
                      data={table.data}
                      n={11}
                      filterSelected={filterEnabled}
                      title={`${table.titles[language]} (${table.uploadedAt})`}
                    />
                  ))}
                </div>
              </div>
            ))
          )}</>
      )}
    />
  );
}
