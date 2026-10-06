"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Power, Search, UserCheck, Users, UserX, X } from "lucide-react";

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

import { CustomerDetailsModal } from "./customer-details-modal";
import { CustomerStatusBadge } from "./customer-status-badge";
import { ALL, LIMIT } from "@/constant";
import { AreaOption, CollectorOption, ICustomerResponse } from "@/types";
import { StatCard } from "./users-stat-card";
import { Skeleton } from "../skeleton";
import { Pagination } from "../pagination";
import {
  useChangeCustomerStatus,
  useGetAreas,
  useGetCollectors,
  useGetCustomers,
} from "@/hooks";
import { getInitials } from "@/helper";
import { toast } from "@/components/ui/toast";

export interface CustomersUrlParams {
  page?: string;
  searchTerm?: string;
  collectorId?: string;
  areaId?: string;
  status?: string;
}

interface FilterItem {
  value: string;
  label: string;
}

const STATUS_ITEMS: FilterItem[] = [
  { value: ALL, label: "All status" },
  { value: "ACTIVE", label: "Active" },
  { value: "INACTIVE", label: "Inactive" },
];

function FilterSelect({
  label,
  value,
  items,
  onChange,
  className,
}: {
  label: string;
  value: string;
  items: FilterItem[];
  onChange: (value: string) => void;
  className?: string;
}) {
  return (
    <Select
      items={items}
      value={value}
      onValueChange={(next) => onChange(next ?? ALL)}
    >
      <SelectTrigger
        aria-label={label}
        className={cn("h-10 w-full", className)}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent
        alignItemWithTrigger={false}
        className="border border-border bg-popover shadow-lg"
      >
        {items.map((item) => (
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
  );
}

export function CustomersManagement({
  params,
}: {
  params: CustomersUrlParams;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isNavigating, startTransition] = React.useTransition();

  const page = Math.max(Number(params.page) || 1, 1);
  const [searchInput, setSearchInput] = React.useState(params.searchTerm ?? "");
  const [customerToUpdate, setCustomerToUpdate] =
    React.useState<ICustomerResponse | null>(null);
  const [selectedCustomerId, setSelectedCustomerId] = React.useState<
    string | null
  >(null);

  const { data, isPending, isFetching, isError, refetch } = useGetCustomers({
    page,
    limit: LIMIT,
    searchTerm: params.searchTerm,
    collectorId: params.collectorId,
    areaId: params.areaId,
    status: params.status,
  });

  const { data: areasData } = useGetAreas();
  const { data: collectorsData } = useGetCollectors();
  const collectors: CollectorOption[] =
    collectorsData?.map((c: any) => ({ id: c.id, name: c.name })) ?? [];
  const areas: AreaOption[] =
    areasData?.map((a: any) => ({ id: a.id, name: a.name })) ?? [];

  const updateParams = React.useCallback(
    (patch: Partial<CustomersUrlParams>) => {
      const next: CustomersUrlParams = {
        page: undefined,
        searchTerm: params.searchTerm,
        collectorId: params.collectorId,
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
    [
      params.searchTerm,
      params.collectorId,
      params.areaId,
      params.status,
      pathname,
      router,
    ],
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

  const { mutate: changeCustomerStatus, isPending: isUpdating } =
    useChangeCustomerStatus();

  async function handleConfirmStatusChange() {
    if (!customerToUpdate) return;
    const nextStatus =
      customerToUpdate.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";

    changeCustomerStatus(
      { id: customerToUpdate.id, status: nextStatus },
      {
        onSuccess: () => {
          toast.add({
            title: "Customer status changed successfully",
            description: "The customer status has been changed successfully.",
            type: "success",
          });
          setCustomerToUpdate(null);
        },
        onError: (err) => {
          toast.add({
            title: "Couldn't change customer status",
            description:"Something went wrong. Please try again.",
            type: "error",
          });
          setCustomerToUpdate(null);
        },
      },
    );

    setCustomerToUpdate(null);
  }

  const collectorItems: FilterItem[] = [
    { value: ALL, label: "All collectors" },
    ...collectors.map((c) => ({ value: c.id, label: c.name })),
  ];

  const areaItems: FilterItem[] = [
    { value: ALL, label: "All areas" },
    ...areas.map((a) => ({ value: a.id, label: a.name })),
  ];

  const customers = data?.customers ?? [];
  const meta = data?.meta;
  const hasFilters = Boolean(
    params.searchTerm || params.collectorId || params.areaId || params.status,
  );
  const isDeactivating = customerToUpdate?.status === "ACTIVE";

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
              label="Filter by collector"
              value={params.collectorId ?? ALL}
              items={collectorItems}
              onChange={(value) =>
                updateParams({ collectorId: value === ALL ? undefined : value })
              }
              className="lg:w-52"
            />
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
                    collectorId: undefined,
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
                <th className="px-4 py-3">Area</th>
                <th className="px-4 py-3">Package</th>
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

                      <td className="px-4 py-3 text-foreground">
                        {customer.area?.name ?? "—"}
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

                      <td className="px-4 py-3">
                        <CustomerStatusBadge status={customer.status} />
                      </td>

                      <td className="px-4 py-3 text-right">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className={cn(
                            active
                              ? "text-destructive hover:bg-destructive/10 hover:text-destructive"
                              : "text-primary hover:bg-primary/10 hover:text-primary",
                          )}
                          onClick={(e) => {
                            e.stopPropagation();
                            setCustomerToUpdate(customer);
                          }}
                        >
                          <Power className="size-4" />
                          {active ? "Deactivate" : "Activate"}
                        </Button>
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

      <Dialog
        open={Boolean(customerToUpdate)}
        onOpenChange={(open) => {
          if (!open) setCustomerToUpdate(null);
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="text-left">
            <DialogTitle className="text-xl font-bold">
              {isDeactivating ? "Deactivate customer?" : "Activate customer?"}
            </DialogTitle>
            <DialogDescription>
              <span className="font-semibold text-foreground">
                {customerToUpdate?.name}
              </span>{" "}
              {isDeactivating
                ? "will be marked as inactive."
                : "will be marked as active again."}
            </DialogDescription>
          </DialogHeader>

          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              disabled={isUpdating}
              onClick={() => setCustomerToUpdate(null)}
            >
              Cancel
            </Button>
            <Button
              variant={isDeactivating ? "destructive" : "default"}
              disabled={isUpdating}
              onClick={handleConfirmStatusChange}
            >
              {isUpdating
                ? "Saving..."
                : isDeactivating
                  ? "Deactivate"
                  : "Activate"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <CustomerDetailsModal
        customerId={selectedCustomerId}
        onClose={() => setSelectedCustomerId(null)}
      />
    </div>
  );
}
