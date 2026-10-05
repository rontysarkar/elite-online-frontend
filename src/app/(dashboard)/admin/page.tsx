import type { Metadata } from "next";

import { BillsOverviewData } from "@/components/dashboard/admin/bills-overview-data";
import {
  BillsFilters,

} from "@/components/dashboard/admin/bills-filters";
import { BillsFilterValues, CollectorOption } from "@/types";

export const metadata: Metadata = {
  title: "Admin Dashboard",
};

interface AdminDashboardPageProps {
  // Next.js 15+: searchParams is a Promise. (On Next.js 14, remove Promise and the await.)
  searchParams: Promise<BillsFilterValues>;
}

// TODO: Replace with your real collectors list from the API (e.g. another hook).
const placeholderCollectors: CollectorOption[] = [
  { id: "collector-1-placeholder", name: "Karim Uddin" },
  { id: "collector-2-placeholder", name: "Rahim Ahmed" },
  { id: "collector-3-placeholder", name: "Sumon Hossain" },
];

// NOTE: No "use client" here. This page must stay a server component.
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

      <BillsFilters values={filters} collectors={placeholderCollectors} />

      <BillsOverviewData filters={filters} />
    </div>
  );
}