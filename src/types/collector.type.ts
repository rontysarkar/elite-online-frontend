


export interface CollectorReportFilterValues {
  year?: string;
  month?: string;
}

export interface CollectorDashboardPageProps {
  searchParams: Promise<CollectorReportFilterValues>;
}

export interface CollectorReportsOverviewDataProps {
  filters: CollectorReportFilterValues;
}



export interface CollectorReportFiltersProps {
  values: CollectorReportFilterValues; 
}