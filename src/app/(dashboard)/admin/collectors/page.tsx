import { CollectorsManagement } from "@/components/dashboard/admin/collectors/collectors-management";
import { CreateCollectorButton } from "@/components/dashboard/admin/collectors/create-collector-button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Collectors",
};

export default function AdminCollectorsPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Collectors
          </h1>
          <p className="text-sm text-muted-foreground">
            All collectors with their areas and customers.
          </p>
        </div>
        <CreateCollectorButton />
      </div>

      <CollectorsManagement />
    </div>
  );
}
