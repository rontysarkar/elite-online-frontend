import {
  acceptConnectionRequest,
  changeCustomerStatus,
  createArea,
  createCollector,
  createCustomer,
  createPackage,
  deleteUser,
  getAdminReports,
  getCollectors,
  getConnectionRequests,
  getCustomerById,
  getCustomers,
  getUsers,
} from "@/api/admin.api";
import {
  AdminReportFilters,
  CustomerStatus,
  IApiResponse,
  UsersQuery,
} from "@/types";
import { CustomersQuery } from "@/types/customers-types";
import {
  TConnectionRequestValues,
  TCreateAreaPayload,
  TCreateCollectorPayload,
  TCreatePackagePayload,
} from "@/validation";

import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

export function useGetCollectors() {
  return useQuery({
    queryKey: ["collectors"],
    queryFn: async () => {
      const res = await getCollectors();
      return res.data;
    },
  });
}

export function useCreateCollector() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: TCreateCollectorPayload) => createCollector(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collectors"] });
    },
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

export function useGetUsers(filters: UsersQuery) {
  return useQuery({
    queryKey: ["users", filters],
    queryFn: async () => {
      const res = await getUsers(filters);
      return { ...res.data, meta: res.meta };
    },
    placeholderData: keepPreviousData,
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

export function useGetCustomers(filters: CustomersQuery) {
  return useQuery({
    queryKey: ["customers", filters],
    queryFn: async () => {
      const res = await getCustomers(filters);
      return { ...res.data, meta: res.meta };
    },
    placeholderData: keepPreviousData,
  });
}

export function useGetCustomerById(id: string) {
  return useQuery({
    queryKey: ["customer", id],
    queryFn: async () => {
      const res = await getCustomerById(id);
      return res.data;
    },
    placeholderData: null,
  });
}

export function useChangeCustomerStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: CustomerStatus }) =>
      changeCustomerStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });
}

export function useGetConnectionRequests() {
  return useQuery({
    queryKey: ["connection-requests"],
    queryFn: async () => {
      const res = await getConnectionRequests();
      return res.data;
    },
  });
}

export function useAcceptConnectionRequest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => acceptConnectionRequest(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["connection-requests"] });
    },
  });
}

export function useCreateCustomer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: TConnectionRequestValues) => createCustomer(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });
}


export function useCreatePackage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: TCreatePackagePayload) => createPackage(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["packages"] });
    },
  });
}


export function useCreateArea() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: TCreateAreaPayload) => createArea(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["areas"] });
    },
  });
}