import { BillStatus } from "@/types/customers-types";

export const BILL_STATUS_STYLES: Record<
  BillStatus,
  { label: string; badge: string; border: string; dot: string }
> = {
  PAID: {
    label: "Paid",
    badge: "bg-primary/10 text-primary",
    border: "border-l-primary",
    dot: "bg-primary",
  },
  UNPAID: {
    label: "Unpaid",
    badge: "bg-secondary/10 text-secondary",
    border: "border-l-secondary",
    dot: "bg-secondary",
  },
  OVERDUE: {
    label: "Overdue",
    badge: "bg-destructive/10 text-destructive",
    border: "border-l-destructive",
    dot: "bg-destructive",
  },
};