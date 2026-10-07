import { CalendarDays, Wallet } from "lucide-react";

import { Button } from "@/components/ui/button";
import { MONTH_NAMES } from "@/constant";
import { formatAmount } from "@/helper";
import type { BillStatus, CustomerBill } from "@/types/customers-types";
import { cn } from "@/utils/cn";

const BILL_STATUS_STYLES: Record<
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

interface BillRowProps {
  bill: CustomerBill;
  onPay?: (bill: CustomerBill) => void;
}

export function BillRow({ bill, onPay }: BillRowProps) {
  const style = BILL_STATUS_STYLES[bill.status] ?? BILL_STATUS_STYLES.UNPAID;
  const canPay = Boolean(onPay) && bill.status !== "PAID";

  return (
    <li
      className={cn(
        "flex flex-wrap items-center gap-3 rounded-xl border border-l-4 border-border bg-card p-4 transition-colors hover:bg-muted/40",
        style.border,
      )}
    >
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground">
          <CalendarDays className="size-4" />
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-foreground">
            {MONTH_NAMES[bill.month - 1] ?? bill.month} {bill.year}
          </p>
          <p className="text-xs text-muted-foreground">Monthly bill</p>
        </div>
      </div>

      <div className="flex shrink-0 flex-col items-end gap-1.5 sm:flex-row sm:items-center sm:gap-4">
        <p className="text-base font-bold text-foreground">
          {formatAmount(bill.amount)}
        </p>
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
            style.badge,
          )}
        >
          <span className={cn("size-1.5 rounded-full", style.dot)} />
          {style.label}
        </span>
      </div>

      {canPay && onPay && (
        <Button
          type="button"
          size="sm"
          className="w-full sm:w-auto"
          onClick={() => onPay(bill)}
        >
          <Wallet className="size-4" />
          Pay
        </Button>
      )}
    </li>
  );
}
