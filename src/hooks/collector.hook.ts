import { getCollectorReports } from "@/api/collector.api";
import { CollectorReportFilterValues, IApiResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";

export function useGetCollectorReports(filters: CollectorReportFilterValues) {
  return useQuery({
    queryKey: ["collector-reports", filters],
    queryFn: async () => {
      const res: IApiResponse = await getCollectorReports(filters);
      return res.data;
    },
  });
}
