// "use client";

// import {
//   CalendarDays,
//   Home,
//   MapPin,
//   Package,
//   Phone,
//   type LucideIcon,
// } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";

// import { cn } from "@/lib/utils";

// import { CustomerStatusBadge } from "./customer-status-badge";
// import { Skeleton } from "../skeleton";
// import { formatDate, getInitials } from "@/helper";
// import { useGetCustomerById } from "@/hooks";

// function DetailRow({
//   icon: Icon,
//   label,
//   value,
//   hint,
//   className,
// }: {
//   icon: LucideIcon;
//   label: string;
//   value: string;
//   hint?: string;
//   className?: string;
// }) {
//   return (
//     <div className={cn("flex items-start gap-3", className)}>
//       <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
//         <Icon className="size-4" />
//       </span>
//       <div className="min-w-0">
//         <p className="text-xs text-muted-foreground">{label}</p>
//         <p className="text-sm font-semibold break-words text-foreground">
//           {value}
//         </p>
//         {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
//       </div>
//     </div>
//   );
// }

// function DetailsSkeleton() {
//   return (
//     <div className="grid gap-5 sm:grid-cols-2">
//       {Array.from({ length: 5 }).map((_, i) => (
//         <div
//           key={i}
//           className={cn("flex items-start gap-3", i === 1 && "sm:col-span-2")}
//         >
//           <Skeleton className="size-9 rounded-lg" />
//           <div className="space-y-2">
//             <Skeleton className="h-3 w-16" />
//             <Skeleton className="h-4 w-32" />
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// interface CustomerDetailsModalProps {
//   customerId: string | null;
//   onClose: () => void;
// }

// export function CustomerDetailsModal({
//   customerId,
//   onClose,
// }: CustomerDetailsModalProps) {
//   const {
//     data: customer,
//     isPending,
//     isError,
//     refetch,
//   } = useGetCustomerById(customerId ?? "");

//   return (
//     <Dialog
//       open={Boolean(customerId)}
//       onOpenChange={(open) => {
//         if (!open) onClose();
//       }}
//     >
//       <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
//         <DialogHeader className="flex-row items-center gap-4 text-left">
//           {customer ? (
//             <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-base font-semibold text-primary">
//               {getInitials(customer.name)}
//             </span>
//           ) : (
//             <Skeleton className="size-12 shrink-0 rounded-xl" />
//           )}

//           <div className="min-w-0 space-y-1">
//             <DialogTitle className="truncate text-2xl font-bold">
//               {customer?.name ?? "Customer details"}
//             </DialogTitle>
//             <DialogDescription>
//               {customer ? (
//                 <CustomerStatusBadge status={customer.status} />
//               ) : (
//                 "Loading customer information..."
//               )}
//             </DialogDescription>
//           </div>
//         </DialogHeader>

//         {isPending && customerId && <DetailsSkeleton />}

//         {isError && (
//           <div className="py-6 text-center">
//             <p className="text-sm font-semibold text-foreground">
//               Couldn&apos;t load customer
//             </p>
//             <p className="mt-1 text-sm text-muted-foreground">
//               Something went wrong. Please try again.
//             </p>
//             <Button variant="outline" className="mt-4" onClick={() => refetch()}>
//               Try again
//             </Button>
//           </div>
//         )}

//         {customer && (
//           <div className="grid gap-5 sm:grid-cols-2">
//             <DetailRow
//               icon={Phone}
//               label="Phone"
//               value={customer.user?.phone ?? "—"}
//             />
//             <DetailRow
//               icon={CalendarDays}
//               label="Customer since"
//               value={formatDate(customer.createdAt)}
//             />
//             <DetailRow
//               icon={Home}
//               label="Address"
//               value={customer.address}
//               className="sm:col-span-2"
//             />
//             <DetailRow
//               icon={MapPin}
//               label="Area"
//               value={customer.area?.name ?? "—"}
//             />
//             <DetailRow
//               icon={Package}
//               label="Package"
//               value={customer.package?.name ?? "—"}
//               hint={
//                 customer.package
//                   ? `${customer.package.speed} · ৳${customer.package.price}/mo`
//                   : undefined
//               }
//             />
//           </div>
//         )}
//       </DialogContent>
//     </Dialog>
//   );
// }

"use client";

import {
  CalendarDays,
  Home,
  Mail,
  MapPin,
  Package,
  Phone,
  Receipt,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { cn } from "@/lib/utils";

import { CustomerStatusBadge } from "./customer-status-badge";
import { Skeleton } from "../../skeleton/skeleton";
import { formatDate, getInitials } from "@/helper";
import { useGetCustomerById } from "@/hooks";

type BillStatus = "PAID" | "UNPAID" | "OVERDUE";

interface CustomerBill {
  month: number;
  year: number;
  amount: string;
  status: BillStatus;
}

interface CustomerDetails {
  id: string;
  name: string;
  address: string;
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
  user: {
    name: string;
    email: string;
    phone: string;
  };
  area: {
    name: string;
    collector: {
      name: string;
    } | null;
  };
  package: {
    name: string;
    speed: string;
  };
  bill: CustomerBill[];
}

const MONTH_NAMES = [
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

function formatAmount(amount: string | number) {
  return `৳${Number(amount).toLocaleString("en-BD")}`;
}

function InfoCard({
  icon: Icon,
  label,
  value,
  hint,
  href,
  className,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  hint?: string;
  href?: string;
  className?: string;
}) {
  const valueClass = "text-sm font-semibold break-words text-foreground";

  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-xl border border-border bg-card p-4",
        className,
      )}
    >
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon className="size-4" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        {href ? (
          <a
            href={href}
            className={cn(
              valueClass,
              "block transition-colors hover:text-primary hover:underline",
            )}
          >
            {value}
          </a>
        ) : (
          <p className={valueClass}>{value}</p>
        )}
        {hint && <p className="mt-0.5 text-xs text-muted-foreground">{hint}</p>}
      </div>
    </div>
  );
}

function BillRow({ bill }: { bill: CustomerBill }) {
  const style = BILL_STATUS_STYLES[bill.status] ?? BILL_STATUS_STYLES.UNPAID;

  return (
    <li
      className={cn(
        "flex items-center justify-between gap-3 rounded-xl border border-l-4 border-border bg-card p-4 transition-colors hover:bg-muted/40",
        style.border,
      )}
    >
      <div className="flex min-w-0 items-center gap-3">
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
    </li>
  );
}

function DetailsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="flex items-start gap-3 rounded-xl border border-border p-4"
          >
            <Skeleton className="size-10 rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
        ))}
        <div className="flex items-start gap-3 rounded-xl border border-border p-4 sm:col-span-2">
          <Skeleton className="size-10 rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-4 w-56" />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <Skeleton className="h-5 w-24" />
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-[74px] w-full rounded-xl" />
        ))}
      </div>
    </div>
  );
}

interface CustomerDetailsModalProps {
  customerId: string | null;
  onClose: () => void;
}

export function CustomerDetailsModal({
  customerId,
  onClose,
}: CustomerDetailsModalProps) {
  const { data, isPending, isError, refetch } = useGetCustomerById(
    customerId ?? "",
  );

  const customer = data as CustomerDetails | undefined;
  const bills = customer?.bill ?? [];
  const totalDue = bills
    .filter((bill) => bill.status !== "PAID")
    .reduce((sum, bill) => sum + Number(bill.amount), 0);

  return (
    <Dialog
      open={Boolean(customerId)}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="max-h-[90vh] gap-0 overflow-y-auto p-0 sm:max-w-2xl">
        <DialogHeader className="flex-row items-center gap-4 border-b border-border bg-primary/5 px-5 py-5 text-left sm:px-6">
          {customer ? (
            <span className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-primary text-lg font-bold text-primary-foreground shadow-sm">
              {getInitials(customer.name)}
            </span>
          ) : (
            <Skeleton className="size-14 shrink-0 rounded-xl" />
          )}

          <div className="min-w-0 flex-1 space-y-1.5 pr-8">
            <DialogTitle className="truncate text-xl font-bold sm:text-2xl">
              {customer?.name ?? "Customer details"}
            </DialogTitle>

            {customer ? (
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <CustomerStatusBadge status={customer.status} />
                <DialogDescription className="text-xs">
                  Customer since {formatDate(customer.createdAt)}
                </DialogDescription>
              </div>
            ) : (
              <DialogDescription>
                Loading customer information...
              </DialogDescription>
            )}
          </div>
        </DialogHeader>

        <div className="px-5 py-5 sm:px-6 sm:py-6">
          {isPending && customerId && <DetailsSkeleton />}

          {isError && (
            <div className="py-8 text-center">
              <p className="text-sm font-semibold text-foreground">
                Couldn&apos;t load customer
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Something went wrong. Please try again.
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => refetch()}
              >
                Try again
              </Button>
            </div>
          )}

          {customer && (
            <div className="space-y-6">
              <div className="grid gap-3 sm:grid-cols-2">
                <InfoCard
                  icon={Phone}
                  label="Phone"
                  value={customer.user?.phone ?? "—"}
                  href={
                    customer.user?.phone
                      ? `tel:${customer.user.phone}`
                      : undefined
                  }
                />
                <InfoCard
                  icon={Mail}
                  label="Email"
                  value={customer.user?.email ?? "—"}
                  href={
                    customer.user?.email
                      ? `mailto:${customer.user.email}`
                      : undefined
                  }
                />
                <InfoCard
                  icon={MapPin}
                  label="Area"
                  value={customer.area?.name ?? "—"}
                  hint={
                    customer.area?.collector?.name
                      ? `Collector: ${customer.area.collector.name}`
                      : undefined
                  }
                />
                <InfoCard
                  icon={Package}
                  label="Package"
                  value={customer.package?.name ?? "—"}
                  hint={customer.package?.speed}
                />
                <InfoCard
                  icon={Home}
                  label="Address"
                  value={customer.address || "—"}
                  className="sm:col-span-2"
                />
              </div>

              <section className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Receipt className="size-4 text-muted-foreground" />
                    <h3 className="text-sm font-semibold text-foreground">
                      Bills
                    </h3>
                    <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                      {bills.length}
                    </span>
                  </div>

                  {totalDue > 0 ? (
                    <span className="rounded-full bg-destructive/10 px-2.5 py-1 text-xs font-semibold text-destructive">
                      Total due {formatAmount(totalDue)}
                    </span>
                  ) : (
                    bills.length > 0 && (
                      <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                        All bills paid
                      </span>
                    )
                  )}
                </div>

                {bills.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-border p-8 text-center">
                    <p className="text-sm font-semibold text-foreground">
                      No bills yet
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Bills will appear here once they are generated.
                    </p>
                  </div>
                ) : (
                  <ul className="space-y-2">
                    {bills.map((bill) => (
                      <BillRow key={`${bill.year}-${bill.month}`} bill={bill} />
                    ))}
                  </ul>
                )}
              </section>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
