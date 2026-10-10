import { RoleGuard } from "@/components/auth/role-guard";
import { DashboardShell } from "@/components/dashboard/components/dashboard-shell";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleGuard allowedRoles={["ADMIN"]}>
      <DashboardShell userRole="ADMIN">{children}</DashboardShell>
    </RoleGuard>
  );
}
