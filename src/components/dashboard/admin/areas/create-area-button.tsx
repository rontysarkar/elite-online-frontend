"use client";

import * as React from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CreateAreaModal } from "./create-area-modal";
import { useGetCollectors } from "@/hooks";


export function CreateAreaButton() {
  const [open, setOpen] = React.useState(false);
  const {data: collectorsData} = useGetCollectors()

  return (
    <>
      <Button type="button" className="shrink-0" onClick={() => setOpen(true)}>
        <Plus className="size-4" />
        Create Area
      </Button>

      <CreateAreaModal
        open={open}
        onOpenChange={setOpen}
        collectors={collectorsData || []}
      />
    </>
  );
}
