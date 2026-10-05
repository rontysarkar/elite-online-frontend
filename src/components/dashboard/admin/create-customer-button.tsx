"use client";

import * as React from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import { CreateCustomerModal } from "./create-customer-modal";
import { AreaOption, PackageOption } from "@/types";


interface CreateCustomerButtonProps {
  areas: AreaOption[];
  packages: PackageOption[];
}

export function CreateCustomerButton({
  areas,
  packages,
}: CreateCustomerButtonProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button type="button" className="shrink-0" onClick={() => setOpen(true)}>
        <Plus className="size-4" />
        Create customer
      </Button>

      <CreateCustomerModal
        open={open}
        onOpenChange={setOpen}
        areas={areas}
        packages={packages}
      />
    </>
  );
}