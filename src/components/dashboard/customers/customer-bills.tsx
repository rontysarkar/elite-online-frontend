"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import type { CustomerBill } from "@/types/customers-types";
import { cn } from "@/utils/cn";
import { BillsSummary } from "./bills-summary";
import { CustomerBillRow } from "./customer-bill-row";
import { InvoiceModal } from "./invoice-modal";
import {
  useGetCustomerBills,
  usePaymentByCustomer,
} from "@/hooks/customer.hook";
import { BillsSkeleton } from "./customer-bills-skeleton";
import { SectionTitle } from "./section-title";
import { toast } from "@/components/ui/toast";
import { ErrorComponent } from "@/components/global/error-component";

export function CustomerBills() {
  const { data, isPending, isFetching, isError, refetch } =
    useGetCustomerBills();

  const [invoiceBillId, setInvoiceBillId] = React.useState<string | null>(null);
  const [payingBillId, setPayingBillId] = React.useState<string | null>(null);

  const { mutate: bkashPayment } = usePaymentByCustomer();

  async function handlePay(bill: CustomerBill) {
    setPayingBillId(bill.id);
    const payload = { billId: bill.id };

    bkashPayment(payload, {
      onSuccess: (res) => {
        const bkashUrl = res?.bkashUrl;
        if (bkashUrl) {
          window.location.href = bkashUrl;
        }
        setPayingBillId(null);
      },
      onError: () => {
        toast.add({
          title: "Couldn't pay bill",
          description: "Something went wrong. Please try again.",
          type: "error",
        });
        setPayingBillId(null);
      },
    });
  }

  if (isPending) {
    return <BillsSkeleton />;
  }

  if (isError) {
    return <ErrorComponent refetch={refetch} />;
  }

  const bills = (data ?? []) as CustomerBill[];
  const pendingBills = bills.filter((bill) => bill.status !== "PAID");
  const paidBills = bills.filter((bill) => bill.status === "PAID");
  const overdueCount = pendingBills.filter(
    (bill) => bill.status === "OVERDUE",
  ).length;
  const totalDue = pendingBills.reduce(
    (sum, bill) => sum + Number(bill.amount),
    0,
  );

  if (bills.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-card p-10 text-center text-card-foreground">
        <p className="text-sm font-semibold text-foreground">No bills yet</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Your monthly bills will appear here.
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn("space-y-6 transition-opacity", isFetching && "opacity-60")}
    >
      <BillsSummary
        totalDue={totalDue}
        pendingCount={pendingBills.length}
        overdueCount={overdueCount}
        paidCount={paidBills.length}
      />

      {pendingBills.length > 0 && (
        <section className="space-y-3">
          <SectionTitle title="Pending bills" count={pendingBills.length} />
          <ul className="space-y-3">
            {pendingBills.map((bill) => (
              <CustomerBillRow
                key={bill.id}
                bill={bill}
                isPaying={payingBillId === bill.id}
                onPay={handlePay}
                onViewInvoice={(b) => setInvoiceBillId(b.id)}
              />
            ))}
          </ul>
        </section>
      )}

      {paidBills.length > 0 && (
        <section className="space-y-3">
          <SectionTitle title="Paid bills" count={paidBills.length} />
          <ul className="space-y-3">
            {paidBills.map((bill) => (
              <CustomerBillRow
                key={bill.id}
                bill={bill}
                isPaying={false}
                onPay={handlePay}
                onViewInvoice={(b) => setInvoiceBillId(b.id)}
              />
            ))}
          </ul>
        </section>
      )}

      {invoiceBillId && (
        <InvoiceModal
          billId={invoiceBillId}
          onClose={() => setInvoiceBillId(null)}
        />
      )}
    </div>
  );
}
