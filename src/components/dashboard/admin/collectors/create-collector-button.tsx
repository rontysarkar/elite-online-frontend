"use client";

import * as React from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CreateCollectorModal } from "./create-collector-modal";



export function CreateCollectorButton() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button type="button" className="shrink-0" onClick={() => setOpen(true)}>
        <Plus className="size-4" />
        Create Collector
      </Button>

      <CreateCollectorModal
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
}
