import { BillsManagement, BillsUrlParams } from "@/components/dashboard/collector/bills/bills-management";
import type { Metadata } from "next";



export const metadata: Metadata = {
  title: "Bills",
};

interface CollectorBillsPageProps {
  searchParams: Promise<BillsUrlParams>;
}

export default async function CollectorBillsPage({
  searchParams,
}: CollectorBillsPageProps) {
  const { page, searchTerm, status, month, year,areaId } = await searchParams;

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Bills
        </h1>
        <p className="text-sm text-muted-foreground">
          Find a customer&apos;s bill and collect the payment.
        </p>
      </div>

      <BillsManagement params={{ page, searchTerm, status, month, year,areaId }} />
    </div>
  );
}