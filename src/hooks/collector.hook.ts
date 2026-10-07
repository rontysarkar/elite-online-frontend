import { getCollectorAreas, getCollectorCustomers, getCollectorReports, paymentByCollector } from "@/api/collector.api";
import { CollectorReportFilterValues, IApiResponse } from "@/types";
import { CustomersQuery } from "@/types/customers-types";
import {  useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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


export function usePaymentByCollector(){
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ billId }: { billId: string }) => paymentByCollector(billId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collector-customers"] });
      queryClient.invalidateQueries({ queryKey: ["collector-reports"] });
    },
  });
}


export function useGetCollectorAreas() {
  return useQuery({
    queryKey: ["collector-areas"],
    queryFn: async() => {
      const res = await getCollectorAreas();
      return res.data;
    },
  });
}
