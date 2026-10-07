import { apiClient } from "@/lib/api-client";
import { CollectorReportFilterValues } from "@/types";
import { CustomersQuery } from "@/types/customers-types";


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


export function getCollectorCustomers(filters: CustomersQuery) {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value) params.set(key, String(value));
  });

  return apiClient(`/customers/my-customers?${params.toString()}`, { method: "GET" });
}
