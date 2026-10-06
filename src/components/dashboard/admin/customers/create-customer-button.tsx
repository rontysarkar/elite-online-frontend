"use client";

import * as React from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AreaOption, PackageOption } from "@/types/customers-types";
import { CreateCustomerModal } from "./create-customer-modal";
import { useGetAreas, useGetPackages } from "@/hooks";


export function CreateCustomerButton() {
  const [open, setOpen] = React.useState(false);
  const {data: areasData} = useGetAreas()
  const {data: packagesData} = useGetPackages()

  return (
    <>
      <Button type="button" className="shrink-0" onClick={() => setOpen(true)}>
        <Plus className="size-4" />
        Create customer
      </Button>

      <CreateCustomerModal
        open={open}
        onOpenChange={setOpen}
        areas={areasData || []}
        packages={packagesData || []}
      />
    </>
  );
}
