import { RoleGuard } from "@/components/auth/role-guard";
import { DashboardShell } from "@/components/dashboard/components/dashboard-shell";


export default function CollectorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RoleGuard allowedRoles={["COLLECTOR"]}>
    <DashboardShell userRole="COLLECTOR">{children}</DashboardShell>
  </RoleGuard>;
}