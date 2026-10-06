import type { Metadata } from "next";

import {
  CustomersManagement,
  CustomersUrlParams,
} from "@/components/dashboard/admin/customers/customers-management";

import { CreateCustomerButton } from "@/components/dashboard/admin/customers/create-customer-button";

export const metadata: Metadata = {
  title: "Customers",
};

interface AdminCustomersPageProps {
  searchParams: Promise<CustomersUrlParams>;
}



export default async function AdminCustomersPage({
  searchParams,
}: AdminCustomersPageProps) {
  const { page, searchTerm, collectorId, areaId, status } = await searchParams;

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

        <CreateCustomerButton/>
      </div>

      <CustomersManagement
        params={{ page, searchTerm, collectorId, areaId, status }}
      />
    </div>
  );
}
