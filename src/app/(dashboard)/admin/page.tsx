import type { Metadata } from "next";

import { BillsOverviewData } from "@/components/dashboard/admin/bills-overview-data";
import { BillsFilters } from "@/components/dashboard/admin/bills-filters";
import { AdminDashboardPageProps } from "@/types";

export const metadata: Metadata = {
  title: "Admin Dashboard",
};

export default async function AdminDashboardPage({
  searchParams,
}: AdminDashboardPageProps) {
  const { year, month, collectorId } = await searchParams;
  const filters = { year, month, collectorId };

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

      <BillsFilters values={filters} />

      <BillsOverviewData filters={filters} />
    </div>
  );
}
