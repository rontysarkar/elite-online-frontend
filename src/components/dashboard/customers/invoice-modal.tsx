
"use client";

import {
  Banknote,
  CircleCheck,
  Receipt,
  Smartphone,
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
import { MONTH_NAMES } from "@/constant";
import { formatAmount } from "@/helper";


import type { BillPayment, PaymentMethod } from "./customer-bills-types";
import { Skeleton } from "../skeleton/skeleton";
import { useGetCustomerPaymentDetails } from "@/hooks/customer.hook";


const METHOD_CONFIG: Record<PaymentMethod, { label: string; icon: LucideIcon }> =
  {
    BKASH: { label: "bKash", icon: Smartphone },
    CASH_COLLECTOR: { label: "Cash to collector", icon: Banknote },
  };

function formatDateTime(value: string) {
  return new Date(value).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function DetailLine({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4 text-sm">
      <dt className="shrink-0 text-muted-foreground">{label}</dt>
      <dd className="min-w-0 text-right font-medium break-words text-foreground">
        {children}
      </dd>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
      {children}
    </h3>
  );
}

function InvoiceSkeleton() {
  return (
    <div className="space-y-5">
      <Skeleton className="h-28 w-full rounded-xl" />
      <Skeleton className="h-28 w-full rounded-xl" />
      <Skeleton className="h-36 w-full rounded-xl" />
    </div>
  );
}

interface InvoiceModalProps {
  billId: string ;
  onClose: () => void;
}

export function InvoiceModal({ billId, onClose }: InvoiceModalProps) {
  const { data, isPending, isError, refetch } = useGetCustomerPaymentDetails(billId);

  const payment = data as BillPayment | undefined;
  const method = payment
    ? (METHOD_CONFIG[payment.method] ?? {
        label: payment.method,
        icon: Receipt,
      })
    : null;
  const MethodIcon = method?.icon;

  return (
    <Dialog
      open={Boolean(billId)}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="max-h-[90vh] gap-0 overflow-y-auto p-0 sm:max-w-lg">
        <DialogHeader className="flex-row items-center gap-4 border-b border-border bg-primary/5 px-5 py-5 text-left sm:px-6">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <Receipt className="size-5" />
          </span>
          <div className="min-w-0 flex-1 space-y-1 pr-8">
            <DialogTitle className="text-xl font-bold sm:text-2xl">
              Invoice
            </DialogTitle>
            <DialogDescription className="truncate text-xs">
              {payment
                ? `#${payment.id.slice(0, 8).toUpperCase()}`
                : "Loading invoice..."}
            </DialogDescription>
          </div>
          {payment && (
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
              <CircleCheck className="size-3.5" />
              Paid
            </span>
          )}
        </DialogHeader>

        <div className="px-5 py-5 sm:px-6 sm:py-6">
          {isPending && billId && <InvoiceSkeleton />}

          {isError && (
            <div className="py-8 text-center">
              <p className="text-sm font-semibold text-foreground">
                Couldn&apos;t load invoice
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

          {payment && method && MethodIcon && (
            <div className="space-y-5">
              <div className="rounded-xl bg-primary/5 p-5 text-center">
                <p className="text-xs font-medium text-muted-foreground">
                  Amount paid
                </p>
                <p className="mt-1 text-4xl font-bold tracking-tight text-foreground">
                  {formatAmount(payment.amount)}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Internet bill for{" "}
                  {MONTH_NAMES[payment.bill.month - 1] ?? payment.bill.month}{" "}
                  {payment.bill.year}
                </p>
              </div>

              <section>
                <SectionLabel>Billed to</SectionLabel>
                <div className="space-y-1 rounded-xl border border-border p-4 text-sm">
                  <p className="font-semibold text-foreground">
                    {payment.customer.user.name}
                  </p>
                  <p className="text-muted-foreground">
                    {payment.customer.user.email}
                  </p>
                  <p className="text-muted-foreground">
                    {payment.customer.user.phone}
                  </p>
                  <p className="pt-1 text-muted-foreground">
                    {payment.customer.address}
                  </p>
                </div>
              </section>

              <section>
                <SectionLabel>Payment details</SectionLabel>
                <dl className="space-y-3 rounded-xl border border-dashed border-border p-4">
                  <DetailLine label="Method">
                    <span className="inline-flex items-center gap-1.5">
                      <MethodIcon className="size-4 text-primary" />
                      {method.label}
                    </span>
                  </DetailLine>

                  {payment.trxId && (
                    <DetailLine label="Transaction ID">
                      <span className="font-mono text-xs break-all">
                        {payment.trxId}
                      </span>
                    </DetailLine>
                  )}

                  {payment.collector && (
                    <DetailLine label="Collected by">
                      {payment.collector.name}
                      <span className="block text-xs font-normal text-muted-foreground">
                        {payment.collector.phone}
                      </span>
                    </DetailLine>
                  )}

                  <DetailLine label="Paid on">
                    {formatDateTime(payment.paidAt)}
                  </DetailLine>

                  <DetailLine label="Status">
                    {payment.status === "SUCCESS" ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                        <CircleCheck className="size-3.5" />
                        Success
                      </span>
                    ) : (
                      payment.status
                    )}
                  </DetailLine>
                </dl>
              </section>
            </div>
          )}
        </div>

        <div className="flex justify-end border-t border-border bg-muted/30 px-5 py-4 sm:px-6">
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="h-11 w-full sm:w-auto"
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}