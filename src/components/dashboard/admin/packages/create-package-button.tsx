"use client";

import * as React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CreatePackageModal } from "./create-package-modal";



export function CreatePackageButton() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button type="button" className="shrink-0" onClick={() => setOpen(true)}>
        <Plus className="size-4" />
        Create Package
      </Button>

      <CreatePackageModal
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
}
