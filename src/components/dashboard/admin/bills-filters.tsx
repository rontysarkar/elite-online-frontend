"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { BillsFiltersProps, BillsFilterValues, CollectorOption, IApiResponse } from "@/types";
import { useGetCollectors } from "@/hooks";


const ALL = "all";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];



export function BillsFilters({ values }: BillsFiltersProps) {
  const { data: collectorResponse } = useGetCollectors() as { data: IApiResponse };
  const collectorsData = collectorResponse?.data;
  const CollectorValues: CollectorOption[] = collectorsData?.map((c:CollectorOption) => ({ id: c.id, name: c.name })) || [];

  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = React.useTransition();


  const currentYear = new Date().getFullYear();
  const yearItems = [
    { value: ALL, label: "All years" },
    ...Array.from({ length: 5 }, (_, i) => {
      const year = String(currentYear - i);
      return { value: year, label: year };
    }),
  ];

  const monthItems = [
    { value: ALL, label: "All months" },
    ...MONTHS.map((name, i) => ({ value: String(i + 1), label: name })),
  ];


  const collectorItems = [
    { value: ALL, label: "All collectors" },
    ...CollectorValues.map((c) => ({ value: c.id, label: c.name })),
  ];
  

  const hasFilters = Boolean(values.year || values.month || values.collectorId);

  function updateFilter(key: keyof BillsFilterValues, value: string | null) {
    const next: BillsFilterValues = {
      ...values,
      [key]: !value || value === ALL ? undefined : value,
    };

  
    if (key === "year" && !next.year) {
      next.month = undefined;
    }

    const params = new URLSearchParams();
    Object.entries(next).forEach(([k, v]) => {
      if (v) params.set(k, v);
    });

    const query = params.toString();
    startTransition(() => {
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    });
  }

  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-xl border border-border bg-card p-3 shadow-sm transition-opacity sm:flex-row sm:flex-wrap sm:items-center sm:p-4",
        isPending && "opacity-70",
      )}
    >
      <div className="hidden items-center gap-2 pr-1 text-sm font-medium text-muted-foreground sm:flex">
        <SlidersHorizontal className="size-4" />
        Filters
      </div>

   
      <Select
        items={yearItems}
        value={values.year ?? ALL}
        onValueChange={(value) => updateFilter("year", value)}
      >
        <SelectTrigger aria-label="Year" className="h-10 w-full sm:w-40">
          <SelectValue />
        </SelectTrigger>
        <SelectContent
          alignItemWithTrigger={false}
          className="border border-border bg-popover shadow-lg"
        >
          {yearItems.map((item) => (
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


      <Select
        items={monthItems}
        value={values.month ?? ALL}
        onValueChange={(value) => updateFilter("month", value)}
        disabled={!values.year}
      >
        <SelectTrigger aria-label="Month" className="h-10 w-full sm:w-44">
          <SelectValue />
        </SelectTrigger>
        <SelectContent
          alignItemWithTrigger={false}
          className="border border-border bg-popover shadow-lg"
        >
          {monthItems.map((item) => (
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

      <Select
        items={collectorItems}
        value={values.collectorId ?? ALL}
        onValueChange={(value) => updateFilter("collectorId", value)}
      >
        <SelectTrigger aria-label="Collector" className="h-10 w-full sm:w-56">
          <SelectValue />
        </SelectTrigger>
        <SelectContent
          alignItemWithTrigger={false}
          className="border border-border bg-popover shadow-lg"
        >
          {collectorItems.map((item) => (
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

      {hasFilters && (
        <Button
          type="button"
          variant="ghost"
          className="h-10 text-muted-foreground hover:text-foreground sm:ml-auto"
          onClick={() => {
            startTransition(() => {
              router.replace(pathname, { scroll: false });
            });
          }}
        >
          <X className="size-4" />
          Reset
        </Button>
      )}
    </div>
  );
}