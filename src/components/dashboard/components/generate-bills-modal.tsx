"use client";

import { Receipt, TriangleAlert } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MONTH_NAMES } from "@/constant";

interface GenerateBillsModalProps {
  open: boolean;
  isGenerating: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function GenerateBillsModal({
  open,
  isGenerating,
  onOpenChange,
  onConfirm,
}: GenerateBillsModalProps) {
  const now = new Date();
  const billingMonth = `${MONTH_NAMES[now.getMonth()]} ${now.getFullYear()}`;

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!isGenerating) onOpenChange(next);
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="flex-row items-start gap-4 text-left">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Receipt className="size-5" />
          </div>
          <div className="space-y-1">
            <DialogTitle className="text-xl font-bold">
              Generate monthly bills?
            </DialogTitle>
            <DialogDescription>
              Bills will be created for all active customers.
            </DialogDescription>
          </div>
        </DialogHeader>

        <div className="space-y-3">
          <div className="flex items-center justify-between gap-4 rounded-xl border border-border bg-muted/40 p-4 text-sm">
            <span className="text-muted-foreground">Billing month</span>
            <span className="font-semibold text-foreground">
              {billingMonth}
            </span>
          </div>

          <div className="flex items-start gap-3 rounded-xl border border-border bg-muted/50 p-4 text-sm text-muted-foreground">
            <TriangleAlert className="mt-0.5 size-4 shrink-0" />
            <p>
              Make sure this month&apos;s bills have not been generated already
              before you continue.
            </p>
          </div>
        </div>

        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="h-11"
            disabled={isGenerating}
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            size="lg"
            className="h-11"
            disabled={isGenerating}
            onClick={onConfirm}
          >
            {isGenerating ? "Generating..." : "Generate bills"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}