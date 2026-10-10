import type { Metadata } from "next";
import { AdminDashboardPageProps } from "@/types";
import { AdminReportsFilters } from "@/components/dashboard/admin/reports/admin-reports-filters";
import { AdminReportsOverviewData } from "@/components/dashboard/admin/reports/admin-reports-overview-data";
import { GenerateBillsButton } from "@/components/dashboard/components/generate-bills-button";

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
      <div className="space-y-1 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Dashboard
          </h1>
          <p className="text-sm text-muted-foreground">
            A quick look at your billing and collection performance.
          </p>
        </div>
        <GenerateBillsButton />
      </div>

      <AdminReportsFilters values={filters} />

      <AdminReportsOverviewData filters={filters} />
    </div>
  );
}
