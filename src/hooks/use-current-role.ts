
import { useGetMe } from "./auth.hook";

export type CurrentRole = "ADMIN" | "COLLECTOR" | "CUSTOMER";

export function useCurrentRole() {
  const { data, isPending, isError } = useGetMe();

  const role = (data?.role ?? null) as CurrentRole | null;

  return {
    role,
    isPending,
    isError,
    isAuthenticated: Boolean(data),
    isAdmin: role === "ADMIN",
    isCollector: role === "COLLECTOR",
    isCustomer: role === "CUSTOMER",
  };
}
