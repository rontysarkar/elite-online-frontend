"use client";

import { useGetAdminReports } from "@/hooks";
import { Button } from "@/components/ui/button";


import { BillsOverview } from "./bills-overview";
import { BillsOverviewSkeleton } from "../skeleton/bills-overview-skeleton";
import { BillsFilterValues } from "@/types";


interface BillsOverviewDataProps {
  filters: BillsFilterValues;
}

export function BillsOverviewData({ filters }: BillsOverviewDataProps) {

  const { data, isPending, isError, refetch } = useGetAdminReports(filters);

  if (isPending) {
    return <BillsOverviewSkeleton />;
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

  return <BillsOverview data={data} />;
}