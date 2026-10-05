import { apiClient } from "@/lib/api-client"
import { AdminReportFilters } from "@/types";


export function getCollectors() {
    return apiClient("/collectors",{method: "GET"})
}

export function getAdminReports(filters: AdminReportFilters = {}) {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value) params.set(key, value);
  });

  const query = params.toString();

  return apiClient(`/reports/admin${query ? `?${query}` : ""}`, {
    method: "GET",
  });
}

