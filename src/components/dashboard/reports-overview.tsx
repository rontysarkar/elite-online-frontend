import {
  Banknote,
  CircleCheck,
  Clock,
  Receipt,
  Smartphone,
  TriangleAlert,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { BillsReport } from "@/types";


const numberFormat = new Intl.NumberFormat("en-BD");

function formatCurrency(amount: number) {
  return `৳${numberFormat.format(amount)}`;
}

function percentOf(part: number, total: number) {
  return total > 0 ? Math.round((part / total) * 100) : 0;
}

type Tone = "primary" | "secondary" | "destructive";

const TONE_STYLES: Record<Tone, { tile: string; bar: string; text: string }> = {
  primary: {
    tile: "bg-primary/10 text-primary",
    bar: "bg-primary",
    text: "text-primary",
  },
  secondary: {
    tile: "bg-secondary/10 text-secondary",
    bar: "bg-secondary",
    text: "text-secondary",
  },
  destructive: {
    tile: "bg-destructive/10 text-destructive",
    bar: "bg-destructive",
    text: "text-destructive",
  },
};

function SectionCard({
  title,
  description,
  className,
  children,
}: {
  title: string;
  description?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className={cn(
        "rounded-xl border border-border bg-card p-5 text-card-foreground shadow-sm sm:p-6",
        className,
      )}
    >
      <div className="mb-5 space-y-1">
        <h2 className="text-base font-semibold text-foreground">{title}</h2>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {children}
    </section>
  );
}

function StatCard({
  title,
  amount,
  bills,
  note,
  icon: Icon,
  tone,
}: {
  title: string;
  amount: number;
  bills: number;
  note: string;
  icon: LucideIcon;
  tone: Tone;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 text-card-foreground shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <span
          className={cn(
            "flex size-10 shrink-0 items-center justify-center rounded-xl",
            TONE_STYLES[tone].tile,
          )}
        >
          <Icon className="size-5" />
        </span>
      </div>
      <p className="mt-3 text-3xl font-bold tracking-tight text-foreground">
        {formatCurrency(amount)}
      </p>
      <div className="mt-2 flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          {numberFormat.format(bills)} {bills === 1 ? "bill" : "bills"}
        </span>
        <span className={cn("font-medium", TONE_STYLES[tone].text)}>
          {note}
        </span>
      </div>
    </div>
  );
}

function CollectionRing({ rate }: { rate: number }) {
  const radius = 66;
  const circumference = 2 * Math.PI * radius;
  const safeRate = Math.min(Math.max(rate, 0), 100);
  const offset = circumference - (safeRate / 100) * circumference;

  return (
    <div className="relative mx-auto size-44">
      {/** biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
      <svg viewBox="0 0 160 160" className="size-full -rotate-90">
        <circle
          cx="80"
          cy="80"
          r={radius}
          fill="none"
          strokeWidth="14"
          className="stroke-muted"
        />
        <circle
          cx="80"
          cy="80"
          r={radius}
          fill="none"
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="stroke-primary"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-bold tracking-tight text-foreground">
          {safeRate}%
        </span>
        <span className="text-xs font-medium text-muted-foreground">
          Collected
        </span>
      </div>
    </div>
  );
}

export function ReportsOverview({ data }: { data: BillsReport }) {
  const {
    totalBills,
    totalBillAmount,
    paidBills,
    paidAmount,
    paidMethod,
    unpaidBills,
    unpaidAmount,
    overdueBills,
    overdueAmount,
    collectionRate,
  } = data;

  const statusRows: {
    label: string;
    hint: string;
    bills: number;
    amount: number;
    tone: Tone;
  }[] = [
    {
      label: "Paid",
      hint: "Collected",
      bills: paidBills,
      amount: paidAmount,
      tone: "primary",
    },
    {
      label: "Unpaid",
      hint: "Not yet due",
      bills: unpaidBills,
      amount: unpaidAmount,
      tone: "secondary",
    },
    {
      label: "Overdue",
      hint: "Past due date",
      bills: overdueBills,
      amount: overdueAmount,
      tone: "destructive",
    },
  ];

  const methodRows: {
    label: string;
    icon: LucideIcon;
    bills: number;
    amount: number;
    tone: Tone;
  }[] = [
    {
      label: "Cash collected",
      icon: Banknote,
      bills: paidMethod.cashCollectedBills,
      amount: paidMethod.cashCollectedAmount,
      tone: "primary",
    },
    {
      label: "bKash",
      icon: Smartphone,
      bills: paidMethod.bkashPaidBills,
      amount: paidMethod.bkashPaidAmount,
      tone: "secondary",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total billed"
          amount={totalBillAmount}
          bills={totalBills}
          note="All bills"
          icon={Receipt}
          tone="primary"
        />
        <StatCard
          title="Paid"
          amount={paidAmount}
          bills={paidBills}
          note={`${percentOf(paidAmount, totalBillAmount)}% of total`}
          icon={CircleCheck}
          tone="primary"
        />
        <StatCard
          title="Unpaid"
          amount={unpaidAmount}
          bills={unpaidBills}
          note={`${percentOf(unpaidAmount, totalBillAmount)}% of total`}
          icon={Clock}
          tone="secondary"
        />
        <StatCard
          title="Overdue"
          amount={overdueAmount}
          bills={overdueBills}
          note={`${percentOf(overdueAmount, totalBillAmount)}% of total`}
          icon={TriangleAlert}
          tone="destructive"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-5">
        <SectionCard
          title="Collection rate"
          description="How much of the billed amount is collected"
          className="lg:col-span-2"
        >
          <CollectionRing rate={collectionRate} />
          <p className="mt-5 text-center text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">
              {formatCurrency(paidAmount)}
            </span>{" "}
            collected out of{" "}
            <span className="font-semibold text-foreground">
              {formatCurrency(totalBillAmount)}
            </span>
          </p>
        </SectionCard>

        <SectionCard
          title="Bill status"
          description="Where your billed amount currently stands"
          className="lg:col-span-3"
        >
          <div className="flex h-3 w-full overflow-hidden rounded-full bg-muted">
            {statusRows.map((row) => (
              <div
                key={row.label}
                className={TONE_STYLES[row.tone].bar}
                style={{ width: `${percentOf(row.amount, totalBillAmount)}%` }}
                title={`${row.label}: ${formatCurrency(row.amount)}`}
              />
            ))}
          </div>

          <div className="mt-5 divide-y divide-border">
            {statusRows.map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "size-3 shrink-0 rounded-full",
                      TONE_STYLES[row.tone].bar,
                    )}
                  />
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {row.label}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {row.hint} · {numberFormat.format(row.bills)}{" "}
                      {row.bills === 1 ? "bill" : "bills"}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-foreground">
                    {formatCurrency(row.amount)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {percentOf(row.amount, totalBillAmount)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <SectionCard
        title="Payment methods"
        description="How customers paid their bills"
      >
        <div className="flex h-3 w-full overflow-hidden rounded-full bg-muted">
          {methodRows.map((row) => (
            <div
              key={row.label}
              className={TONE_STYLES[row.tone].bar}
              style={{ width: `${percentOf(row.amount, paidAmount)}%` }}
            />
          ))}
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {methodRows.map((row) => (
            <div
              key={row.label}
              className="flex items-center gap-4 rounded-xl border border-border p-4"
            >
              <span
                className={cn(
                  "flex size-11 shrink-0 items-center justify-center rounded-xl",
                  TONE_STYLES[row.tone].tile,
                )}
              >
                <row.icon className="size-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-foreground">
                  {row.label}
                </p>
                <p className="text-xs text-muted-foreground">
                  {numberFormat.format(row.bills)}{" "}
                  {row.bills === 1 ? "bill" : "bills"} ·{" "}
                  {percentOf(row.amount, paidAmount)}% of paid
                </p>
              </div>
              <p className="text-base font-bold text-foreground">
                {formatCurrency(row.amount)}
              </p>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
