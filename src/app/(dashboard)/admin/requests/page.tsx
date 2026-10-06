import { RequestsManagement } from "@/components/dashboard/admin/requests/requests-management";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Connection requests",
};

export default function AdminRequestsPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Connection requests
        </h1>
        <p className="text-sm text-muted-foreground">
          Review new connection requests and accept them.
        </p>
      </div>

      <RequestsManagement />
    </div>
  );
}