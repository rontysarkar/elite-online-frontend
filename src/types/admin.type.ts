import { BillsFilterValues } from "./report.type";

export interface AdminReportFilters {
  year?: string;
  month?: string;
  collectorId?: string;
}

export interface AdminDashboardPageProps {
  searchParams: Promise<BillsFilterValues>;
}