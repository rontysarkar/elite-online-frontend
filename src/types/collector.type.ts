


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


export interface ICollector {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "COLLECTOR";
  createdAt: string;
  totalAreas: number;
  totalCustomers: number;
  areas: string[];
}