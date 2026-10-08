import {
  CalendarDays,
  CircleCheck,
  Home,
  MapPin,
  Phone,
  Wallet,
} from "lucide-react";


import { Button } from "@/components/ui/button";
import { MONTH_NAMES } from "@/constant";
import { formatAmount, getInitials } from "@/helper";
import type { BillStatus } from "@/types/customers-types";
import { cn } from "@/utils/cn";
import { CollectorBill } from "@/types";
import { BILL_STATUS_STYLES } from "@/style/dashboard.style";



function StatusBadge({
  status,
  className,
}: {
  status: BillStatus;
  className?: string;
}) {
  const style = BILL_STATUS_STYLES[status] ?? BILL_STATUS_STYLES.UNPAID;

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
        style.badge,
        className,
      )}
    >
      <span className={cn("size-1.5 rounded-full", style.dot)} />
      {style.label}
    </span>
  );
}

interface CollectorBillRowProps {
  bill: CollectorBill;
  onPay: (bill: CollectorBill) => void;
}

export function CollectorBillRow({ bill, onPay }: CollectorBillRowProps) {
  const style = BILL_STATUS_STYLES[bill.status] ?? BILL_STATUS_STYLES.UNPAID;
  const { customer } = bill;
  const isPaid = bill.status === "PAID";

  return (
    <li
      className={cn(
        "flex flex-col gap-4 rounded-xl border border-l-4 border-border bg-card p-4 shadow-sm transition-shadow hover:shadow-md lg:flex-row lg:items-center lg:gap-6",
        style.border,
      )}
    >
      <div className="flex min-w-0 flex-1 items-start gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-sm font-semibold text-primary">
          {getInitials(customer.user.name)}
        </span>

        <div className="min-w-0 flex-1 space-y-1.5">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="truncate text-base font-semibold text-foreground">
                {customer.user.name}
              </p>
              <a
                href={`tel:${customer.user.phone}`}
                className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-primary"
              >
                <Phone className="size-3" />
                {customer.user.phone}
              </a>
            </div>
            <StatusBadge status={bill.status} className="lg:hidden" />
          </div>

          <p className="flex items-center gap-1.5 text-sm font-medium text-foreground">
            <MapPin className="size-3.5 shrink-0 text-primary" />
            <span className="truncate">{customer.area.name}</span>
          </p>

          <p className="flex items-start gap-1.5 text-xs text-muted-foreground">
            <Home className="mt-0.5 size-3.5 shrink-0" />
            <span className="line-clamp-2">{customer.address}</span>
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 border-t border-border pt-3 lg:flex-row lg:items-center lg:gap-6 lg:border-t-0 lg:pt-0">
        <div className="flex items-center justify-between gap-4 lg:gap-6">
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-muted px-2.5 py-1.5 text-xs font-medium text-muted-foreground lg:w-40 lg:justify-center">
            <CalendarDays className="size-3.5" />
            {MONTH_NAMES[bill.month - 1] ?? bill.month} {bill.year}
          </span>
          <p className="text-xl font-bold text-foreground lg:min-w-20 lg:text-right">
            {formatAmount(bill.amount)}
          </p>
        </div>

        <StatusBadge
          status={bill.status}
          className="hidden lg:inline-flex lg:min-w-24 lg:justify-center"
        />

        {isPaid ? (
          <div className="flex h-11 items-center justify-center gap-1.5 rounded-lg bg-primary/10 text-sm font-medium text-primary lg:h-9 lg:w-28">
            <CircleCheck className="size-4" />
            Collected
          </div>
        ) : (
          <Button
            type="button"
            className="h-11 w-full lg:h-9 lg:w-28"
            onClick={() => onPay(bill)}
          >
            <Wallet className="size-4" />
            Pay bill
          </Button>
        )}
      </div>
    </li>
  );
}