export interface BillsReport {
  totalBills: number;
  totalBillAmount: number;
  paidBills: number;
  paidAmount: number;
  paidMethod: {
    cashCollectedBills: number;
    cashCollectedAmount: number;
    bkashPaidBills: number;
    bkashPaidAmount: number;
  };
  unpaidBills: number;
  unpaidAmount: number;
  overdueBills: number;
  overdueAmount: number;
  collectionRate: number;
}


export interface BillsFilterValues {
  year?: string;
  month?: string;
  collectorId?: string;
}

export interface CollectorOption {
  id: string;
  name: string;
}

export interface BillsFiltersProps {
  values: BillsFilterValues; 
  collectors: CollectorOption[];
}

export interface AdminReportFilters {
  year?: string;
  month?: string;
  collectorId?: string;
}