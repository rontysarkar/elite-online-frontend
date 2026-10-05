import type { Metadata } from "next";



import { AreaOption, CollectorOption, PackageOption } from "@/types";
import { CustomersManagement, CustomersUrlParams } from "@/components/dashboard/admin/customers-management";
import { CreateCustomerButton } from "@/components/dashboard/admin/create-customer-button";


export const metadata: Metadata = {
  title: "Customers",
};

interface AdminCustomersPageProps {
  searchParams: Promise<CustomersUrlParams>;
}

const placeholderCollectors: CollectorOption[] = [
  { id: "collector-1-placeholder", name: "Karim Uddin" },
  { id: "collector-2-placeholder", name: "Rahim Ahmed" },
  { id: "collector-3-placeholder", name: "Sumon Hossain" },
];

const placeholderAreas: AreaOption[] = [
  { id: "df14e678-907a-453a-bcd8-76febd227369", name: "Uttara Sector 10" },
  { id: "dfa18576-5bed-474c-980a-e6834728b80c", name: "Fulbaria" },
  { id: "area-mirpur-placeholder", name: "Mirpur" },
  { id: "area-dhanmondi-placeholder", name: "Dhanmondi" },
];

const placeholderPackages: PackageOption[] = [
  {
    id: "8f173263-5f0b-490a-952c-8e35404694ba",
    name: "Basic",
    speed: "20 Mbps",
    price: "500",
  },
  {
    id: "8a024e5e-1d14-4365-9093-cb53aad80c9a",
    name: "Standard",
    speed: "30 Mbps",
    price: "700",
  },
  {
    id: "package-premium-placeholder",
    name: "Premium",
    speed: "80 Mbps",
    price: "1200",
  },
];

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

        <CreateCustomerButton
          areas={placeholderAreas}
          packages={placeholderPackages}
        />
      </div>

      <CustomersManagement
        params={{ page, searchTerm, collectorId, areaId, status }}
        collectors={placeholderCollectors}
        areas={placeholderAreas}
      />
    </div>
  );
}