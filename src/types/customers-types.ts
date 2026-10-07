import { ALL } from "@/constant";

export type CustomerStatus = "ACTIVE" | "INACTIVE";

export interface ICustomerResponse {
  id: string;
  name: string;
  address: string;
  status: CustomerStatus;
  createdAt: string;
  updatedAt: string;
  userId: string;
  packageId: string;
  areaId: string;
  user: {
    phone: string;
  };
  area: {
    id: string;
    name: string;
  };
  package: {
    id: string;
    name: string;
    speed: string;
    price: string;
  };
  _count:{
    bill: number;
  }
}

export interface CustomersReport {
  totalCustomers: number;
  activeCustomers: number;
  inactiveCustomers: number;
  customers: ICustomerResponse[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
}

export interface CustomersQuery {
  page: number;
  limit: number;
  searchTerm?: string;
  collectorId?: string;
  areaId?: string;
  status?: string;
}

export interface AreaOption {
  id: string;
  name: string;
}

export interface PackageOption {
  id: string;
  name: string;
  speed: string;
  price: string;
}


export interface CustomersUrlParams {
  page?: string;
  searchTerm?: string;
  collectorId?: string;
  areaId?: string;
  status?: string;
}

export interface CollectorCustomersUrlParams {
  page?: string;
  searchTerm?: string;
  areaId?: string;
  status?: string;
}

export interface FilterItem {
  value: string;
  label: string;
}


