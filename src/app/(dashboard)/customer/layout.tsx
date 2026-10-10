import { RoleGuard } from "@/components/auth/role-guard";
import { DashboardShell } from "@/components/dashboard/components/dashboard-shell";


export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RoleGuard allowedRoles={["CUSTOMER"]}>
    <DashboardShell userRole="CUSTOMER">{children}</DashboardShell>
  </RoleGuard>;
}