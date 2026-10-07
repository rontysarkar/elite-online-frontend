"use client";

import { Wallet } from "lucide-react";

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
import type { CustomerBill } from "@/types/customers-types";

interface PayBillModalProps {
  bill: CustomerBill | null;
  customerName: string;
  isPaying: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export function PayBillModal({
  bill,
  customerName,
  isPaying,
  onConfirm,
  onClose,
}: PayBillModalProps) {
  return (
    <Dialog
      open={Boolean(bill)}
      onOpenChange={(open) => {
        if (!open && !isPaying) onClose();
      }}
    >
      <DialogContent className="sm:max-w-md">
        {bill && (
          <>
            <DialogHeader className="flex-row items-start gap-4 text-left">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Wallet className="size-5" />
              </div>
              <div className="space-y-1">
                <DialogTitle className="text-xl font-bold">
                  Confirm payment
                </DialogTitle>
                <DialogDescription>
                  Confirm that you collected this bill from {customerName}.
                </DialogDescription>
              </div>
            </DialogHeader>

            <dl className="space-y-3 rounded-xl border border-border bg-muted/40 p-4 text-sm">
              <div className="flex items-center justify-between gap-4">
                <dt className="text-muted-foreground">Customer</dt>
                <dd className="truncate font-semibold text-foreground">
                  {customerName}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-muted-foreground">Bill month</dt>
                <dd className="font-semibold text-foreground">
                  {MONTH_NAMES[bill.month - 1] ?? bill.month} {bill.year}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4 border-t border-border pt-3">
                <dt className="text-muted-foreground">Amount</dt>
                <dd className="text-2xl font-bold text-foreground">
                  {formatAmount(bill.amount)}
                </dd>
              </div>
            </dl>

            <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="h-11"
                disabled={isPaying}
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                type="button"
                size="lg"
                className="h-11"
                disabled={isPaying}
                onClick={onConfirm}
              >
                {isPaying ? "Processing..." : "Confirm payment"}
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
