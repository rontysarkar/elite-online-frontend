import { CircleCheck, Wallet } from "lucide-react";

import { formatAmount } from "@/helper";
import { cn } from "@/utils/cn";

interface BillsSummaryProps {
  totalDue: number;
  pendingCount: number;
  overdueCount: number;
  paidCount: number;
}

function MiniStat({
  value,
  label,
  className,
}: {
  value: number;
  label: string;
  className?: string;
}) {
  return (
    <div className="rounded-xl bg-muted/50 px-3 py-2.5 text-center sm:min-w-24 sm:px-4">
      <p className={cn("text-xl leading-none font-bold text-foreground", className)}>
        {value}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

export function BillsSummary({
  totalDue,
  pendingCount,
  overdueCount,
  paidCount,
}: BillsSummaryProps) {
  const hasDue = pendingCount > 0;
  const Icon = hasDue ? Wallet : CircleCheck;

  return (
    <section className="rounded-xl border border-border bg-card p-5 text-card-foreground shadow-sm sm:p-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <span
            className={cn(
              "flex size-12 shrink-0 items-center justify-center rounded-xl",
              hasDue
                ? "bg-destructive/10 text-destructive"
                : "bg-primary/10 text-primary",
            )}
          >
            <Icon className="size-5" />
          </span>
          <div>
            {hasDue ? (
              <>
                <p className="text-sm font-medium text-muted-foreground">
                  Total due
                </p>
                <p className="text-3xl font-bold tracking-tight text-foreground">
                  {formatAmount(totalDue)}
                </p>
                <p className="text-sm text-muted-foreground">
                  {pendingCount} {pendingCount === 1 ? "month" : "months"} of
                  bills pending
                </p>
              </>
            ) : (
              <>
                <p className="text-xl font-bold text-foreground">
                  You&apos;re all caught up
                </p>
                <p className="text-sm text-muted-foreground">
                  All your bills are paid.
                </p>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:flex sm:gap-3">
          <MiniStat value={pendingCount} label="Pending" />
          <MiniStat
            value={overdueCount}
            label="Overdue"
            className={overdueCount > 0 ? "text-destructive" : undefined}
          />
          <MiniStat value={paidCount} label="Paid" className="text-primary" />
        </div>
      </div>
    </section>
  );
}