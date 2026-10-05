import { deleteUser, getAdminReports, getCollectors, getUsers } from "@/api/admin.api";
import {  AdminReportFilters, IApiResponse, UsersQuery } from "@/types";

import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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