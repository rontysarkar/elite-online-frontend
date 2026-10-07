"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Search, UserCheck, Users, UserX, X } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ALL, LIMIT, STATUS_ITEMS } from "@/constant";
import { Skeleton } from "../../skeleton/skeleton";
import { Pagination } from "../../components/pagination";
import {
  useGetAreas,
  useGetCollectorCustomers,
} from "@/hooks";
import { getInitials } from "@/helper";
import { StatCard } from "../../components/stat-card";
import {
  AreaOption,
  CollectorCustomersUrlParams,
  FilterItem,
  ICustomerResponse,
} from "@/types/customers-types";
import { CustomerStatusBadge } from "../../admin/customers/customer-status-badge";
import { CustomerDetailsModal } from "../../admin/customers/customer-details-modal";
import { FilterSelect } from "../../components/filter-select";

export function CollectorCustomersManagement({
  params,
}: {
  params: CollectorCustomersUrlParams;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isNavigating, startTransition] = React.useTransition();

  const page = Math.max(Number(params.page) || 1, 1);
  const [searchInput, setSearchInput] = React.useState(params.searchTerm ?? "");
  const [selectedCustomerId, setSelectedCustomerId] = React.useState<
    string | null
  >(null);

  const { data, isPending, isFetching, isError, refetch } =
    useGetCollectorCustomers({
      page,
      limit: LIMIT,
      searchTerm: params.searchTerm,
      areaId: params.areaId,
      status: params.status,
    });

  const { data: areasData } = useGetAreas();
  const areas: AreaOption[] =
    areasData?.map((a: AreaOption) => ({ id: a.id, name: a.name })) ?? [];

  const updateParams = React.useCallback(
    (patch: Partial<CollectorCustomersUrlParams>) => {
      const next: CollectorCustomersUrlParams = {
        page: undefined,
        searchTerm: params.searchTerm,
        areaId: params.areaId,
        status: params.status,
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
    },
    [params.searchTerm, params.areaId, params.status, pathname, router],
  );

  React.useEffect(() => {
    const value = searchInput.trim();
    if (value === (params.searchTerm ?? "")) return;
    const timer = setTimeout(
      () => updateParams({ searchTerm: value || undefined }),
      400,
    );
    return () => clearTimeout(timer);
  }, [searchInput, params.searchTerm, updateParams]);

  const areaItems: FilterItem[] = [
    { value: ALL, label: "All areas" },
    ...areas.map((a) => ({ value: a.id, label: a.name })),
  ];

  const customers = data?.customers ?? [];
  const meta = data?.meta;
  const hasFilters = Boolean(
    params.searchTerm || params.areaId || params.status,
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          title="All customers"
          value={data?.totalCustomers}
          icon={Users}
          tone="primary"
          loading={isPending}
        />
        <StatCard
          title="Active customers"
          value={data?.activeCustomers}
          icon={UserCheck}
          tone="secondary"
          loading={isPending}
        />
        <StatCard
          title="Inactive customers"
          value={data?.inactiveCustomers}
          icon={UserX}
          tone="destructive"
          loading={isPending}
        />
      </div>

      <section className="overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-sm">
        <div className="space-y-3 border-b border-border p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-base font-semibold text-foreground">
              Customers
            </h2>

            <div className="relative sm:w-72">
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search by name or phone"
                aria-label="Search customers"
                className="h-10 pl-9"
              />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:flex lg:items-center">
            <FilterSelect
              label="Filter by area"
              value={params.areaId ?? ALL}
              items={areaItems}
              onChange={(value) =>
                updateParams({ areaId: value === ALL ? undefined : value })
              }
              className="lg:w-52"
            />
            <FilterSelect
              label="Filter by status"
              value={params.status ?? ALL}
              items={STATUS_ITEMS}
              onChange={(value) =>
                updateParams({ status: value === ALL ? undefined : value })
              }
              className="lg:w-40"
            />

            {hasFilters && (
              <Button
                type="button"
                variant="ghost"
                className="h-10 text-muted-foreground hover:text-foreground lg:ml-auto"
                onClick={() => {
                  setSearchInput("");
                  updateParams({
                    searchTerm: undefined,
                    areaId: undefined,
                    status: undefined,
                  });
                }}
              >
                <X className="size-4" />
                Reset
              </Button>
            )}
          </div>
        </div>

        <div
          className={cn(
            "overflow-x-auto transition-opacity",
            (isFetching || isNavigating) && !isPending && "opacity-60",
          )}
        >
          <table className="w-full min-w-[720px] text-sm">
            <thead className="bg-muted/50">
              <tr className="text-left text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Package</th>
                <th className="px-4 py-3">Area</th>
                <th className="px-4 py-3">Address</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Due Bills</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border">
              {isPending &&
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Skeleton className="size-9 rounded-full" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Skeleton className="h-4 w-28" />
                    </td>
                    <td className="px-4 py-3">
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-3 w-28" />
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Skeleton className="h-6 w-20 rounded-full" />
                    </td>
                    <td className="px-4 py-3">
                      <Skeleton className="ml-auto h-8 w-24" />
                    </td>
                    <td className="px-4 py-3">
                      <Skeleton className="h-6 w-6 rounded-full" />
                    </td>
                  </tr>
                ))}

              {!isPending &&
                !isError &&
                customers.map((customer: ICustomerResponse) => {
                  const active = customer.status === "ACTIVE";

                  return (
                    <tr
                      key={customer.id}
                      tabIndex={0}
                      onClick={() => setSelectedCustomerId(customer.id)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && e.target === e.currentTarget) {
                          setSelectedCustomerId(customer.id);
                        }
                      }}
                      className="cursor-pointer transition-colors hover:bg-muted/40 focus-visible:bg-muted/40 focus-visible:outline-none"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                            {getInitials(customer.name)}
                          </span>
                          <p className="truncate font-semibold text-foreground">
                            {customer.name}
                          </p>
                        </div>
                      </td>

                      <td className="px-4 py-3">
                        {customer.package ? (
                          <div>
                            <p className="font-medium text-foreground">
                              {customer.package.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {customer.package.speed} · ৳
                              {customer.package.price}
                            </p>
                          </div>
                        ) : (
                          "—"
                        )}
                      </td>

                      <td className="px-4 py-3 text-foreground">
                        {customer.area?.name ?? "—"}
                      </td>

                      <td className="px-4 py-3 text-foreground">
                        {customer.address ?? "—"}
                      </td>

                      <td className="px-4 py-3">
                        <CustomerStatusBadge status={customer.status} />
                      </td>

                      <td className="px-4 py-3 text-right">
                        <span
                          className={`inline-flex min-w-8 items-center justify-center rounded-full px-2.5 py-1 text-sm font-bold ${
                            customer._count.bill > 0
                              ? "bg-red-50 text-red-600"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {customer._count.bill}
                        </span>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>

          {isError && (
            <div className="p-10 text-center">
              <p className="text-sm font-semibold text-foreground">
                Couldn&apos;t load customers
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

          {!isPending && !isError && customers.length === 0 && (
            <div className="p-10 text-center">
              <p className="text-sm font-semibold text-foreground">
                No customers found
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {hasFilters
                  ? "Try changing your search or filters."
                  : "There are no customers yet."}
              </p>
            </div>
          )}
        </div>

        {meta && (
          <Pagination
            meta={meta}
            label="customers"
            onPageChange={(n) => updateParams({ page: String(n) })}
          />
        )}
      </section>

      <CustomerDetailsModal
        customerId={selectedCustomerId}
        onClose={() => setSelectedCustomerId(null)}
      />
    </div>
  );
}
