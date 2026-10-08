import type { BillStatus } from "@/types/customers-types";

export interface CollectorBill {
  id: string;
  month: number;
  year: number;
  amount: string;
  status: BillStatus;
  customer: {
    address: string;
    user: {
      name: string;
      phone: string;
    };
    package: {
      price: string;
    };
    area: {
      name: string;
    };
  };
}

export interface BillsQuery {
  page: number;
  limit: number;
  searchTerm?: string;
  status?: string;
  month?: string;
  year?: string;
  areaId?: string;
}