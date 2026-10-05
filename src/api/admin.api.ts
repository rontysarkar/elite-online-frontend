import { apiClient } from "@/lib/api-client"
import { AdminReportFilters, CustomersQuery, UsersQuery } from "@/types";


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

export function getUsers(filters: UsersQuery) {
  const params = new URLSearchParams();
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value) params.set(key, String(value));
  });
  
  return apiClient(`/users?${params.toString()}`, { method: "GET" }); 
}

export function deleteUser(id: string) {
  return apiClient(`/users/${id}`, { method: "DELETE" });
}


export function getCustomers(filters: CustomersQuery) {
  const params = new URLSearchParams();
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value) params.set(key, String(value));
  });
  
  return apiClient(`/customers?${params.toString()}`, { method: "GET" }); 
}

export function getCustomerById(id: string) {
  return apiClient(`/customers/${id}`, { method: "GET" }); 
}

