"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Trash2,
  UserCheck,
  Users,
  UserX,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { cn } from "@/lib/utils";
import { User, UserRole, UsersUrlParams } from "@/types";
import { useDeleteUser, useGetUsers } from "@/hooks";
import { getInitials, getPageNumbers } from "@/helper";
import { ALL, LIMIT, ROLE_ITEMS, ROLE_LABELS } from "@/constant";
import { Skeleton } from "../../skeleton/skeleton";
import { StatCard } from "../../components/stat-card";
import { toast } from "@/components/ui/toast";

const ROLE_STYLES: Record<UserRole, string> = {
  ADMIN: "bg-foreground/10 text-foreground",
  COLLECTOR: "bg-secondary/10 text-secondary",
  CUSTOMER: "bg-muted text-muted-foreground",
};

export function UsersManagement({ params }: { params: UsersUrlParams }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isNavigating, startTransition] = React.useTransition();

  const page = Math.max(Number(params.page) || 1, 1);
  const [searchInput, setSearchInput] = React.useState(params.searchTerm ?? "");
  const [userToDelete, setUserToDelete] = React.useState<User | null>(null);
  // const [isDeleting, setIsDeleting] = React.useState(false);

  const { data, isPending, isFetching, isError, refetch } = useGetUsers({
    page: String(page),
    limit: String(LIMIT),
    searchTerm: params.searchTerm,
    role: params.role,
  });

  function updateParams(patch: Partial<UsersUrlParams>) {
    const next: UsersUrlParams = {
      page: undefined,
      searchTerm: params.searchTerm,
      role: params.role,
      ...patch,
    };

    const sp = new URLSearchParams();
    Object.entries(next).forEach(([key, value]) => {
      if (!value || value === ALL) return;
      if (key === "page" && value === "1") return;
      sp.set(key, value);
    });

    const query = sp.toString();
    startTransition(() => {
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    });
  }

  // Wait 400ms after typing stops, then search (so we don't call the API on every key).
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  React.useEffect(() => {
    const value = searchInput.trim();
    if (value === (params.searchTerm ?? "")) return;
    const timer = setTimeout(
      () => updateParams({ searchTerm: value || undefined }),
      400,
    );
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser();

  async function handleConfirmDelete() {
    if (!userToDelete) return;
    deleteUser(userToDelete.id, {
      onSuccess: () => {
        toast.add({
          title: "User deleted",
          description: "User deleted successfully",
          type: "success",
        });
      },
      onError: (error) => {
        toast.add({
          title: "Error",
          description: error.message,
          type: "error",
        });
      },
    });

    setUserToDelete(null);
  }

  const users = data?.users ?? [];
  const meta = data?.meta;
  const hasFilters = Boolean(params.searchTerm || params.role);
  const from = meta && meta.total > 0 ? (meta.page - 1) * meta.limit + 1 : 0;
  const to = meta ? Math.min(meta.page * meta.limit, meta.total) : 0;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          title="All users"
          value={data?.totalUsers}
          icon={Users}
          tone="primary"
          loading={isPending}
        />
        <StatCard
          title="Active users"
          value={data?.activeUsers}
          icon={UserCheck}
          tone="secondary"
          loading={isPending}
        />
        <StatCard
          title="Deleted users"
          value={data?.deletedUsers}
          icon={UserX}
          tone="destructive"
          loading={isPending}
        />
      </div>

      <section className="overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-sm">
        <div className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-base font-semibold text-foreground">Users</h2>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative sm:w-72">
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search by name, email or phone"
                aria-label="Search users"
                className="h-10 pl-9"
              />
            </div>

            <Select
              items={ROLE_ITEMS}
              value={params.role ?? ALL}
              onValueChange={(value) =>
                updateParams({
                  role: value === ALL ? undefined : (value ?? undefined),
                })
              }
            >
              <SelectTrigger
                aria-label="Filter by role"
                className="h-10 w-full sm:w-40"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent
                alignItemWithTrigger={false}
                className="border border-border bg-popover shadow-lg"
              >
                {ROLE_ITEMS.map((item) => (
                  <SelectItem
                    key={item.value}
                    value={item.value}
                    className="cursor-pointer"
                  >
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div
          className={cn(
            "overflow-x-auto transition-opacity",
            (isFetching || isNavigating) && !isPending && "opacity-60",
          )}
        >
          <table className="w-full min-w-[640px] text-sm">
            <thead className="bg-muted/50">
              <tr className="text-left text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border">
              {isPending &&
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Skeleton className="size-9 rounded-full" />
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-32" />
                          <Skeleton className="h-3 w-44" />
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Skeleton className="h-6 w-20 rounded-full" />
                    </td>
                    <td className="px-4 py-3">
                      <Skeleton className="h-6 w-20 rounded-full" />
                    </td>
                    <td className="px-4 py-3">
                      <Skeleton className="ml-auto h-8 w-8" />
                    </td>
                  </tr>
                ))}

              {!isPending &&
                !isError &&
                users.map((user: User) => (
                  <tr
                    key={user.id}
                    className="transition-colors hover:bg-muted/40"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                          {getInitials(user.name)}
                        </span>
                        <div className="min-w-0">
                          <p className="truncate font-semibold text-foreground">
                            {user.name}
                          </p>
                          <p className="truncate text-xs text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={cn(
                          "inline-flex rounded-full px-2.5 py-1 text-xs font-medium",
                          ROLE_STYLES[user.role],
                        )}
                      >
                        {ROLE_LABELS[user.role] ?? user.role}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
                          user.isDeleted
                            ? "bg-destructive/10 text-destructive"
                            : "bg-primary/10 text-primary",
                        )}
                      >
                        <span
                          className={cn(
                            "size-1.5 rounded-full",
                            user.isDeleted ? "bg-destructive" : "bg-primary",
                          )}
                        />
                        {user.isDeleted ? "Deleted" : "Active"}
                      </span>
                    </td>

                    <td className="px-4 py-3 text-right">
                      {!user.isDeleted && user?.role !== "ADMIN" ? (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          aria-label={`Delete ${user.name}`}
                          className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                          onClick={() => setUserToDelete(user)}
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          {isError && (
            <div className="p-10 text-center">
              <p className="text-sm font-semibold text-foreground">
                Couldn&apos;t load users
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Something went wrong. Please try again.
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => refetch()}
              >
                Try again
              </Button>
            </div>
          )}

          {!isPending && !isError && users.length === 0 && (
            <div className="p-10 text-center">
              <p className="text-sm font-semibold text-foreground">
                No users found
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {hasFilters
                  ? "Try changing your search or filter."
                  : "There are no users yet."}
              </p>
              {hasFilters && (
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSearchInput("");
                    updateParams({ searchTerm: undefined, role: undefined });
                  }}
                >
                  Clear filters
                </Button>
              )}
            </div>
          )}
        </div>

        {meta && meta.total > 0 && (
          <div className="flex flex-col items-center justify-between gap-3 border-t border-border p-4 sm:flex-row">
            <p className="text-sm text-muted-foreground">
              Showing{" "}
              <span className="font-semibold text-foreground">
                {from}–{to}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-foreground">
                {meta.total}
              </span>{" "}
              users
            </p>

            {meta.totalPage > 1 && (
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Previous page"
                  disabled={meta.page <= 1}
                  onClick={() => updateParams({ page: String(meta.page - 1) })}
                >
                  <ChevronLeft className="size-4" />
                </Button>

                {getPageNumbers(meta.page, meta.totalPage).map((n) => (
                  <Button
                    key={n}
                    variant={n === meta.page ? "default" : "outline"}
                    size="icon"
                    aria-current={n === meta.page ? "page" : undefined}
                    onClick={() => updateParams({ page: String(n) })}
                  >
                    {n}
                  </Button>
                ))}

                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Next page"
                  disabled={meta.page >= meta.totalPage}
                  onClick={() => updateParams({ page: String(meta.page + 1) })}
                >
                  <ChevronRight className="size-4" />
                </Button>
              </div>
            )}
          </div>
        )}
      </section>

      <Dialog
        open={Boolean(userToDelete)}
        onOpenChange={(open) => {
          if (!open) setUserToDelete(null);
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="text-left">
            <DialogTitle className="text-xl font-bold">
              Delete user?
            </DialogTitle>
            <DialogDescription>
              <span className="font-semibold text-foreground">
                {userToDelete?.name}
              </span>{" "}
              will be marked as deleted and won&apos;t be able to log in.
            </DialogDescription>
          </DialogHeader>

          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              disabled={isDeleting}
              onClick={() => setUserToDelete(null)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              disabled={isDeleting}
              onClick={handleConfirmDelete}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
