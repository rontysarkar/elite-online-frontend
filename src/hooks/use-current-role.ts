import { useGetMe } from "./auth.hook";

export type CurrentRole = "ADMIN" | "COLLECTOR" | "CUSTOMER";

export function useCurrentRole() {
  const { data, isPending } = useGetMe();
  const role = (data?.data?.role ?? null) as CurrentRole | null;
  return {
    role,
    isPending,
    isAdmin: role === "ADMIN",
    isCollector: role === "COLLECTOR",
    isCustomer: role === "CUSTOMER",
  };
}
