
export interface AdminReportFilters {
  year?: string;
  month?: string;
  collectorId?: string;
}

export interface AdminReportFilterValues {
  year?: string;
  month?: string;
  collectorId?: string;
}

export interface AdminDashboardPageProps {
  searchParams: Promise<AdminReportFilterValues>;
}

export interface AdminReportsOverviewDataProps {
  filters: AdminReportFilterValues;
}


export interface CollectorOption {
  id: string;
  name: string;
}

export interface AdminReportFiltersProps {
  values: AdminReportFilterValues; 
}


