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

export interface IApiResponse{
    success: boolean;
    statusCode: number;
    message: string;
    data: any;  
}


export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

