import { apiClient } from "@/lib/api-client";
import { CollectorReportFilterValues } from "@/types";


export function getCollectorReports(filters: CollectorReportFilterValues = {}) {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value) params.set(key, value);
  });

  const query = params.toString();

  return apiClient(`/reports/collector${query ? `?${query}` : ""}`, {
    method: "GET",
  });
}
