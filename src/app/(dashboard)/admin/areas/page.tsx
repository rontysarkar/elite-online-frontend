
import { AreasManagement } from "@/components/dashboard/admin/areas/areas-management";
import { CreateAreaButton } from "@/components/dashboard/admin/areas/create-area-button";
import { CreatePackageButton } from "@/components/dashboard/admin/packages/create-package-button";
import { PackagesManagement } from "@/components/dashboard/admin/packages/packages-management";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Areas",
};

export default function AdminAreasPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Areas
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage your areas..
          </p>
        </div>
        <CreateAreaButton/>
      </div>

      <AreasManagement />
    </div>
  );
}
