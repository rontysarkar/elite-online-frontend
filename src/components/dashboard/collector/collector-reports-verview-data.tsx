"use client";
import { useGetAdminReports, useGetCollectorReports } from "@/hooks";
import { Button } from "@/components/ui/button";
import { ReportsOverview } from "../reports-overview";
import { CollectorReportsOverviewDataProps } from "@/types";
import { ReportsOverviewSkeleton } from "../skeleton/reports-overview-skeleton";

export function CollectorReportsOverviewData({
  filters,
}: CollectorReportsOverviewDataProps) {
  const { data, isPending, isError, refetch } = useGetCollectorReports(filters);
  

  if (isPending) {
    return <ReportsOverviewSkeleton />; 
  }

  if (isError || !data) {
    return (
      <div className="rounded-xl border border-border bg-card p-8 text-center text-card-foreground shadow-sm">
        <p className="text-sm font-semibold text-foreground">
          Couldn&apos;t load the report
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Something went wrong. Please try again.
        </p>
        <Button variant="outline" className="mt-4" onClick={() => refetch()}>
          Try again
        </Button>
      </div>
    );
  }

  return <ReportsOverview data={data} />;
}
