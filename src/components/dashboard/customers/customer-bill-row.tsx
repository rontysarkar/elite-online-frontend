import { CalendarDays, FileText, Wallet } from "lucide-react";


import { Button } from "@/components/ui/button";
import { MONTH_NAMES } from "@/constant";
import { formatAmount } from "@/helper";
import type { CustomerBill } from "@/types/customers-types";
import { cn } from "@/utils/cn";
import { BILL_STATUS_STYLES } from "@/style/dashboard.style";

interface CustomerBillRowProps {
  bill: CustomerBill;
  isPaying: boolean;
  onPay: (bill: CustomerBill) => void;
  onViewInvoice: (bill: CustomerBill) => void;
}

export function CustomerBillRow({
  bill,
  isPaying,
  onPay,
  onViewInvoice,
}: CustomerBillRowProps) {
  const style = BILL_STATUS_STYLES[bill.status] ?? BILL_STATUS_STYLES.UNPAID;
  const isPaid = bill.status === "PAID";

  return (
    <li
      tabIndex={isPaid ? 0 : undefined}
      onClick={isPaid ? () => onViewInvoice(bill) : undefined}
      onKeyDown={
        isPaid
          ? (e) => {
              if (e.key === "Enter" && e.target === e.currentTarget) {
                onViewInvoice(bill);
              }
            }
          : undefined
      }
      className={cn(
        "flex flex-wrap items-center gap-3 rounded-xl border border-l-4 border-border bg-card p-4 shadow-sm transition-colors",
        style.border,
        isPaid &&
          "cursor-pointer hover:bg-muted/40 focus-visible:bg-muted/40 focus-visible:outline-none",
      )}
    >
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground">
          <CalendarDays className="size-5" />
        </span>
        <div className="min-w-0">
          <p className="truncate text-base font-semibold text-foreground">
            {MONTH_NAMES[bill.month - 1] ?? bill.month} {bill.year}
          </p>
          <p className="text-xs text-muted-foreground">Monthly internet bill</p>
        </div>
      </div>

      <div className="flex shrink-0 flex-col items-end gap-1.5 sm:flex-row sm:items-center sm:gap-4">
        <p className="text-lg font-bold text-foreground">
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

      {isPaid ? (
        <Button
          type="button"
          variant="outline"
          className="h-11 w-full sm:h-9 sm:w-28"
          onClick={(e) => {
            e.stopPropagation();
            onViewInvoice(bill);
          }}
        >
          <FileText className="size-4" />
          Invoice
        </Button>
      ) : (
        <Button
          type="button"
          className="h-11 w-full sm:h-9 sm:w-28"
          disabled={isPaying}
          onClick={() => onPay(bill)}
        >
          <Wallet className="size-4" />
          {isPaying ? "Please wait..." : "Pay"}
        </Button>
      )}
    </li>
  );
}