import { CustomerBills } from "@/components/dashboard/customers/customer-bills";
import type { Metadata } from "next";



export const metadata: Metadata = {
  title: "Bills",
};

export default function CustomerBillsPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Bills
        </h1>
        <p className="text-sm text-muted-foreground">
          Your monthly internet bills and payment history.
        </p>
      </div>

      <CustomerBills />
    </div>
  );
}