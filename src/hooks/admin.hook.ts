import { getAdminReports, getCollectors } from "@/api/admin.api";
import {  AdminReportFilters, IApiResponse } from "@/types";

import { useQuery } from "@tanstack/react-query";

export function useGetCollectors() {
  return useQuery({
    queryKey: ["collectors"],
    queryFn: getCollectors,
  });
}

export function useGetAdminReports(filters: AdminReportFilters) {
  return useQuery({
    queryKey: ["admin-reports", filters],
    queryFn: async () => {
      const res: IApiResponse = await getAdminReports(filters);
      return res.data; 
    },
  });
}