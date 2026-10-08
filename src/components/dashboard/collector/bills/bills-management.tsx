"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ALL, BILL_STATUS_ITEMS, LIMIT, MONTH_NAMES } from "@/constant";

import { cn } from "@/utils/cn";
import { CollectorBill } from "@/types";
import {
  useGetCollectorAreas,
  useGetCollectorBills,
  usePaymentByCollector,
} from "@/hooks";
import { Pagination } from "../../components/pagination";
import { CollectorBillRow } from "./collector-bill-row";
import { PayBillModal } from "../../components/pay-bill-modal";
import { toast } from "@/components/ui/toast";
import { BillRowSkeleton } from "./bill-row-skeletorn";
import { AreaOption } from "@/types/customers-types";

export interface BillsUrlParams {
  page?: string;
  searchTerm?: string;
  status?: string;
  month?: string;
  year?: string;
  areaId?: string;
}

interface FilterItem {
  value: string;
  label: string;
}

const MONTH_ITEMS: FilterItem[] = [
  { value: ALL, label: "All months" },
  ...MONTH_NAMES.map((name, i) => ({ value: String(i + 1), label: name })),
];

function FilterSelect({
  label,
  value,
  items,
  onChange,
  disabled,
  className,
}: {
  label: string;
  value: string;
  items: FilterItem[];
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <Select
      items={items}
      value={value}
      disabled={disabled}
      onValueChange={(next) => onChange(next ?? ALL)}
    >
      <SelectTrigger
        aria-label={label}
        className={cn("h-11 w-full sm:h-10", className)}
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

export function BillsManagement({ params }: { params: BillsUrlParams }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isNavigating, startTransition] = React.useTransition();

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  const yearValue = params.year ?? String(currentYear);
  const monthValue =
    yearValue === ALL ? ALL : (params.month ?? String(currentMonth));
  const page = Math.max(Number(params.page) || 1, 1);

  const yearItems: FilterItem[] = [
    { value: ALL, label: "All years" },
    ...Array.from({ length: 5 }, (_, i) => {
      const year = String(currentYear - i);
      return { value: year, label: year };
    }),
  ];

  const [searchInput, setSearchInput] = React.useState(params.searchTerm ?? "");
  const [billToPay, setBillToPay] = React.useState<CollectorBill | null>(null);

  const { data, isPending, isFetching, isError, refetch } =
    useGetCollectorBills({
      page,
      limit: LIMIT,
      searchTerm: params.searchTerm,
      status: params.status,
      year: yearValue === ALL ? undefined : yearValue,
      month: monthValue === ALL ? undefined : monthValue,
      areaId: params.areaId,
    });

  const { data: areasData } = useGetCollectorAreas();
  const areas: AreaOption[] =
    areasData?.map((a: AreaOption) => ({ id: a.id, name: a.name })) ?? [];

  const updateParams = React.useCallback(
    (patch: Partial<BillsUrlParams>) => {
      const next: BillsUrlParams = {
        page: undefined,
        searchTerm: params.searchTerm,
        status: params.status,
        year: params.year,
        month: params.month,
        areaId: params.areaId,
        ...patch,
      };

      const sp = new URLSearchParams();
      Object.entries(next).forEach(([key, value]) => {
        if (!value) return;
        if (key === "status" && value === ALL) return;
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
      params.status,
      params.year,
      params.month,
      pathname,
      params.areaId,
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

  const areaItems: FilterItem[] = [
    { value: ALL, label: "All areas" },
    ...areas.map((a) => ({ value: a.id, label: a.name })),
  ];

  const { mutate: payBill, isPending: isPaying } = usePaymentByCollector();

  async function handleConfirmPay() {
    if (!billToPay) return;

    const payload = {
      billId: billToPay.id,
    };

    payBill(payload, {
      onSuccess: () => {
        toast.add({
          title: "Bill paid successfully",
          description: "The bill has been paid successfully.",
          type: "success",
        });
        setBillToPay(null);
      },
      onError: () => {
        toast.add({
          title: "Couldn't pay bill",
          description: "Something went wrong. Please try again.",
          type: "error",
        });
        setBillToPay(null);
      },
    });
  }

  function handleReset() {
    setSearchInput("");
    updateParams({
      searchTerm: undefined,
      status: undefined,
      year: undefined,
      month: undefined,
      areaId: undefined,
    });
  }

  const bills = (data?.bills ?? []) as CollectorBill[];
  const meta = data?.meta;
  const hasFilters = Boolean(
    params.searchTerm ||
    params.areaId ||
    params.status ||
    params.year ||
    params.month,
  );

  return (
    <div className="space-y-4">
      <div className="space-y-3 rounded-xl border border-border bg-card p-4 text-card-foreground shadow-sm">
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search by name, phone or address"
            aria-label="Search bills"
            className="h-11 pl-9 sm:h-10"
          />
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:flex lg:items-center">
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
            items={BILL_STATUS_ITEMS}
            onChange={(value) =>
              updateParams({ status: value === ALL ? undefined : value })
            }
            className="col-span-2 sm:col-span-1 lg:w-40"
          />
          <FilterSelect
            label="Filter by month"
            value={monthValue}
            items={MONTH_ITEMS}
            disabled={yearValue === ALL}
            onChange={(value) => updateParams({ month: value })}
            className="lg:w-44"
          />
          <FilterSelect
            label="Filter by year"
            value={yearValue}
            items={yearItems}
            onChange={(value) =>
              updateParams(
                value === ALL ? { year: ALL, month: ALL } : { year: value },
              )
            }
            className="lg:w-36"
          />

          {hasFilters && (
            <Button
              type="button"
              variant="ghost"
              className="col-span-2 h-11 text-muted-foreground hover:text-foreground sm:col-span-3 sm:h-10 lg:ml-auto lg:w-auto"
              onClick={handleReset}
            >
              <X className="size-4" />
              Reset
            </Button>
          )}
        </div>
      </div>

      {isPending && (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <BillRowSkeleton key={i} />
          ))}
        </div>
      )}

      {isError && (
        <div className="rounded-xl border border-border bg-card p-10 text-center text-card-foreground shadow-sm">
          <p className="text-sm font-semibold text-foreground">
            Couldn&apos;t load bills
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Something went wrong. Please try again.
          </p>
          <Button variant="outline" className="mt-4" onClick={() => refetch()}>
            Try again
          </Button>
        </div>
      )}

      {!isPending && !isError && bills.length === 0 && (
        <div className="rounded-xl border border-dashed border-border bg-card p-10 text-center text-card-foreground">
          <p className="text-sm font-semibold text-foreground">
            No bills found
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Try changing the month, year or status filter.
          </p>
          {hasFilters && (
            <Button variant="outline" className="mt-4" onClick={handleReset}>
              Reset filters
            </Button>
          )}
        </div>
      )}

      {!isPending && !isError && bills.length > 0 && (
        <ul
          className={cn(
            "space-y-3 transition-opacity",
            (isFetching || isNavigating) && "opacity-60",
          )}
        >
          {bills.map((bill) => (
            <CollectorBillRow key={bill.id} bill={bill} onPay={setBillToPay} />
          ))}
        </ul>
      )}

      {meta && meta.total > 0 && !isError && (
        <div className="overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-sm [&>div]:border-t-0">
          <Pagination
            meta={meta}
            label="bills"
            onPageChange={(n) => updateParams({ page: String(n) })}
          />
        </div>
      )}

      <PayBillModal
        bill={billToPay}
        customerName={billToPay?.customer.user.name ?? ""}
        isPaying={isPaying}
        onConfirm={handleConfirmPay}
        onClose={() => setBillToPay(null)}
      />
    </div>
  );
}
