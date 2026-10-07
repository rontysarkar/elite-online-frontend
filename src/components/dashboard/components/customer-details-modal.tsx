"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CustomerStatusBadge } from "../admin/customers/customer-status-badge";
import { Skeleton } from "../skeleton/skeleton";
import { formatAmount, formatDate, getInitials } from "@/helper";
import {
  useCurrentRole,
  useGetCustomerById,
  usePaymentByCollector,
} from "@/hooks";
import { CustomerDetails } from "@/types/customers-types";
import { DetailsSkeleton } from "../skeleton/detailsSkeleton";
import { InfoCard } from "./info-card";
import { Home, Mail, MapPin, Package, Phone, Receipt } from "lucide-react";
import { BillRow } from "./bill-row";

import type { CustomerBill } from "@/types/customers-types";
import React from "react";
import { PayBillModal } from "./pay-bill-modal";
import { toast } from "@/components/ui/toast";

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

  const { isCollector } = useCurrentRole();
  const [billToPay, setBillToPay] = React.useState<CustomerBill | null>(null);

  const { mutate: payBill, isPending: isPaying } = usePaymentByCollector();

  async function handleConfirmPay() {
    if (!billToPay) return;

    const payload = {
      billId: billToPay.id,
    };

    payBill(payload, {
      onSuccess: () => {
        toast.add({
          title: "Bill paid successfully",
          description: "The bill has been paid successfully.",
          type: "success",
        });
        setBillToPay(null);
        onClose();
      },
      onError: (err) => {
        toast.add({
          title: "Couldn't pay bill",
          description: "Something went wrong. Please try again.",
          type: "error",
        });
        onClose();
        setBillToPay(null);
      },
    });
  }

  return (
    <>
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
                        <BillRow
                          key={bill.id}
                          bill={bill}
                          onPay={isCollector ? setBillToPay : undefined}
                        />
                      ))}
                    </ul>
                  )}
                </section>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <PayBillModal
        bill={billToPay}
        customerName={customer?.name ?? ""}
        isPaying={isPaying}
        onConfirm={handleConfirmPay}
        onClose={() => setBillToPay(null)}
      />
    </>
  );
}
