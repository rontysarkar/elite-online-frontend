"use client";

import {
  CalendarDays,
  Home,
  MapPin,
  Package,
  Phone,
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
import { Skeleton } from "../skeleton";
import { formatDate, getInitials } from "@/helper";
import { useGetCustomerById } from "@/hooks";


function DetailRow({
  icon: Icon,
  label,
  value,
  hint,
  className,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  hint?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-start gap-3", className)}>
      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
        <Icon className="size-4" />
      </span>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-semibold break-words text-foreground">
          {value}
        </p>
        {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      </div>
    </div>
  );
}

function DetailsSkeleton() {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className={cn("flex items-start gap-3", i === 1 && "sm:col-span-2")}
        >
          <Skeleton className="size-9 rounded-lg" />
          <div className="space-y-2">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      ))}
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
  const {
    data: customer,
    isPending,
    isError,
    refetch,
  } = useGetCustomerById(customerId ?? "");

  return (
    <Dialog
      open={Boolean(customerId)}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader className="flex-row items-center gap-4 text-left">
          {customer ? (
            <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-base font-semibold text-primary">
              {getInitials(customer.name)}
            </span>
          ) : (
            <Skeleton className="size-12 shrink-0 rounded-xl" />
          )}

          <div className="min-w-0 space-y-1">
            <DialogTitle className="truncate text-2xl font-bold">
              {customer?.name ?? "Customer details"}
            </DialogTitle>
            <DialogDescription>
              {customer ? (
                <CustomerStatusBadge status={customer.status} />
              ) : (
                "Loading customer information..."
              )}
            </DialogDescription>
          </div>
        </DialogHeader>

        {isPending && customerId && <DetailsSkeleton />}

        {isError && (
          <div className="py-6 text-center">
            <p className="text-sm font-semibold text-foreground">
              Couldn&apos;t load customer
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Something went wrong. Please try again.
            </p>
            <Button variant="outline" className="mt-4" onClick={() => refetch()}>
              Try again
            </Button>
          </div>
        )}

        {customer && (
          <div className="grid gap-5 sm:grid-cols-2">
            <DetailRow
              icon={Phone}
              label="Phone"
              value={customer.user?.phone ?? "—"}
            />
            <DetailRow
              icon={CalendarDays}
              label="Customer since"
              value={formatDate(customer.createdAt)}
            />
            <DetailRow
              icon={Home}
              label="Address"
              value={customer.address}
              className="sm:col-span-2"
            />
            <DetailRow
              icon={MapPin}
              label="Area"
              value={customer.area?.name ?? "—"}
            />
            <DetailRow
              icon={Package}
              label="Package"
              value={customer.package?.name ?? "—"}
              hint={
                customer.package
                  ? `${customer.package.speed} · ৳${customer.package.price}/mo`
                  : undefined
              }
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}