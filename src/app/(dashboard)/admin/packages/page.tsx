import { CollectorsManagement } from "@/components/dashboard/admin/collectors/collectors-management";
import { CreateCollectorButton } from "@/components/dashboard/admin/collectors/create-collector-button";
import { CreatePackageButton } from "@/components/dashboard/admin/packages/create-package-button";
import { PackagesManagement } from "@/components/dashboard/admin/packages/packages-management";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Packages",
};

export default function AdminPackagesPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Packages
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage your packages, their areas and customers.
          </p>
        </div>
        <CreatePackageButton />
      </div>

      <PackagesManagement />
    </div>
  );
}
