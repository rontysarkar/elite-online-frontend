import type { Metadata } from "next";

import { CollectorDashboardPageProps } from "@/types";
import { CollectorReportFilters } from "@/components/dashboard/collector/collector-reports-filters";
import { CollectorReportsOverviewData } from "@/components/dashboard/collector/collector-reports-verview-data";

export const metadata: Metadata = {
  title: "Collector Dashboard",
};

export default async function CollectorDashboardPage({
  searchParams,
}: CollectorDashboardPageProps) {
  const { year, month } = await searchParams;
  const filters = { year, month };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Dashboard
        </h1>
        <p className="text-sm text-muted-foreground">
          A quick look at your billing and collection performance.
        </p>
      </div>
      <CollectorReportFilters values={filters} />
      <CollectorReportsOverviewData filters={filters} />
    </div>
  );
}
