"use client";

import { AnalyticsBase } from "@/components/base";
import { StableLink } from "@/components/links";
import { AnalyticsDataResponse, DetailedDataTable } from "@/components/tables";
import { useSiteContext } from "@/context/site";
import { CONTENTS } from "@/i18n";

export default function Analytics() {
  const { language } = useSiteContext();
  return (
    <AnalyticsBase
      title={CONTENTS[language]["analytics"]["detailsTab"]["title"]}
      description={
        <>
          <span>Check out the overview</span>
          {" "}
          <StableLink
            className="text-pd-pink-400 hover:text-pd-pink-100"
            pathname="/analytics/overview"
          >here</StableLink>
        </>
      }
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
