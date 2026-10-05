"use client";
import { useGetAdminReports } from "@/hooks";
import { Button } from "@/components/ui/button";
import { ReportsOverview } from "../reports-overview";
import {  AdminReportsOverviewDataProps } from "@/types";
import { ReportsOverviewSkeleton } from "../skeleton/reports-overview-skeleton";



export function AdminReportsOverviewData({ filters }: AdminReportsOverviewDataProps) {
  const { data, isPending, isError, refetch } = useGetAdminReports(filters);

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
