import { getCollectorCustomers, getCollectorReports } from "@/api/collector.api";
import { CollectorReportFilterValues, IApiResponse } from "@/types";
import { CustomersQuery } from "@/types/customers-types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export function useGetCollectorReports(filters: CollectorReportFilterValues) {
  return useQuery({
    queryKey: ["collector-reports", filters],
    queryFn: async () => {
      const res: IApiResponse = await getCollectorReports(filters);
      return res.data;
    },
  });
}


export function useGetCollectorCustomers(filters: CustomersQuery) {
  return useQuery({
    queryKey: ["collector-customers", filters],
    queryFn: async () => {
      const res = await getCollectorCustomers(filters);
      return { ...res.data, meta: res.meta };
    },
  });
}
