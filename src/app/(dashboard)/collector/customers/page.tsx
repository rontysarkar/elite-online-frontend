import type { Metadata } from "next";

import { CollectorCustomersManagement } from "@/components/dashboard/collector/customer/collector-customer-management";
import { CollectorCustomersUrlParams } from "@/types/customers-types";


export const metadata: Metadata = {
  title: "Customers",
};

interface CollectorCustomersPageProps {
  searchParams: Promise<CollectorCustomersUrlParams>;
}


export default async function CollectorCustomersPage({
  searchParams,
}: CollectorCustomersPageProps) {
  const { page, searchTerm, areaId, status } = await searchParams;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Customers
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage your customers, their areas and packages.
          </p>
        </div>

      </div>

      <CollectorCustomersManagement
        params={{ page, searchTerm, areaId, status }}
      />
    </div>
  );
}
