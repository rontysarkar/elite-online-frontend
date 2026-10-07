import { apiClient } from "@/lib/api-client";
import { AdminReportFilters, CustomerStatus, UsersQuery } from "@/types";
import { CustomersQuery } from "@/types/customers-types";
import { TConnectionRequestValues, TCreateAreaPayload, TCreateCollectorPayload, TCreatePackagePayload } from "@/validation";



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



export function getCollectors() {
  return apiClient("/collectors", { method: "GET" });
}


export function createCollector(payload: TCreateCollectorPayload) {
  return apiClient(`/collectors`, {
    method: "POST",
    body: JSON.stringify(payload),
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

export function createCustomer(payload: TConnectionRequestValues) {
  return apiClient(`/customers`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function getAdminCustomers(filters: CustomersQuery) {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value) params.set(key, String(value));
  });

  return apiClient(`/customers?${params.toString()}`, { method: "GET" });
}



export function getCustomerById(id: string) {
  return apiClient(`/customers/${id}`, { method: "GET" });
}

export function changeCustomerStatus(id: string, status: CustomerStatus) {
  return apiClient(`/customers/status/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}



export function getConnectionRequests() {
  return apiClient("/connection-request", { method: "GET" });
}

export function acceptConnectionRequest(id: string) {
  return apiClient(`/connection-request/${id}`, {
    method: "POST",
  });
}


export function createPackage(payload: TCreatePackagePayload) {
  return apiClient(`/packages`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
} 


export function createArea(payload: TCreateAreaPayload) {
  return apiClient(`/areas`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}



