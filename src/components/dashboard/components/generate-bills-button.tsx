"use client";

import * as React from "react";
import { CalendarPlus } from "lucide-react";

import { Button } from "@/components/ui/button";

import { GenerateBillsModal } from "./generate-bills-modal";
import { toast } from "@/components/ui/toast";
import { useGenerateMonthlyBills } from "@/hooks";

interface GenerateBillsButtonProps {
  className?: string;
}

export function GenerateBillsButton({ className }: GenerateBillsButtonProps) {
  const [open, setOpen] = React.useState(false);

  const { mutate: generateMonthlyBills, isPending: isGenerating } =
    useGenerateMonthlyBills();

  async function handleConfirm() {
    generateMonthlyBills(undefined, {
      onSuccess: () => {
        toast.add({
          title: "Bills generated successfully",
          description: "Bills generated successfully.",
          type: "success",
        });
        setOpen(false);
      },
      onError: () => {
        toast.add({
          title: "Bills generation failed",
          description: "Bills generation failed.",
          type: "error",
        });
        setOpen(false);
      },
    });
  }

  return (
    <>
      <Button type="button" className={className} onClick={() => setOpen(true)}>
        <CalendarPlus className="size-4" />
        Generate monthly bills
      </Button>

      <GenerateBillsModal
        open={open}
        isGenerating={isGenerating}
        onOpenChange={setOpen}
        onConfirm={handleConfirm}
      />
    </>
  );
}
