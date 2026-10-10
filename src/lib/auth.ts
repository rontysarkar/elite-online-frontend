import { CurrentRole } from "@/hooks";


export const LOGIN_PATH = "/login";

export const ROLE_HOME: Record<CurrentRole, string> = {
  ADMIN: "/admin",
  COLLECTOR: "/collector",
  CUSTOMER: "/customer",
};