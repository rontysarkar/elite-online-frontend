import { UserRole } from "@/types";
import { FilterItem } from "@/types/customers-types";

export const ALL = "all";
export const LIMIT = 10;


export const ROLE_LABELS: Record<UserRole, string> = {
  ADMIN: "Admin",
  COLLECTOR: "Collector",
  CUSTOMER: "Customer",
};

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const currentYear = new Date().getFullYear();
export const yearItems = [
  { value: ALL, label: "All years" },
  ...Array.from({ length: 5 }, (_, i) => {
    const year = String(currentYear - i);
    return { value: year, label: year };
  }),
];

export const monthItems = [
  { value: ALL, label: "All months" },
  ...MONTHS.map((name, i) => ({ value: String(i + 1), label: name })),
];



export const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const ROLE_ITEMS = [
  { value: ALL, label: "All roles" },
  { value: "ADMIN", label: "Admin" },
  { value: "COLLECTOR", label: "Collector" },
  { value: "CUSTOMER", label: "Customer" },
];


export const CUSTOMER_STATUS_ITEMS: FilterItem[] = [
  { value: ALL, label: "All status" },
  { value: "ACTIVE", label: "Active" },
  { value: "INACTIVE", label: "Inactive" },
];


export const BILL_STATUS_ITEMS: FilterItem[] = [
  { value: ALL, label: "All status" },
  { value: "PAID", label: "Paid" },
  { value: "UNPAID", label: "Unpaid" },
  { value: "OVERDUE", label: "Overdue" },
];