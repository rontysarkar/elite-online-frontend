import { UsersManagement } from "@/components/dashboard/admin/users/users-management";
import { UsersUrlParams } from "@/types";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Users",
};

interface AdminUsersPageProps {
  searchParams: Promise<UsersUrlParams>;
}

export default async function AdminUsersPage({
  searchParams,
}: AdminUsersPageProps) {
  const { page, searchTerm, role } = await searchParams;

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Users
        </h1>
        <p className="text-sm text-muted-foreground">
          Manage all users and their access.
        </p>
      </div>

      <UsersManagement params={{ page, searchTerm, role }} />
    </div>
  );
}
