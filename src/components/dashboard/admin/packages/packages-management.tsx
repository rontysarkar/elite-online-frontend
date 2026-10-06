"use client";

import { Button } from "@/components/ui/button";
import { useGetCollectors, useGetPackages } from "@/hooks";
import { cn } from "@/lib/utils";
import { Skeleton } from "../../skeleton/skeleton";
import { ICollector, IPackage } from "@/types";
import { PackageCard } from "./package.card";






const GRID_CLASS = "grid gap-4 sm:grid-cols-2 xl:grid-cols-3";

function CollectorCardSkeleton() {
  return (
    <div className="flex flex-col gap-5 rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <Skeleton className="size-12 rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-36" />
        <Skeleton className="h-4 w-44" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Skeleton className="h-16 rounded-xl" />
        <Skeleton className="h-16 rounded-xl" />
      </div>
      <div className="space-y-2 border-t border-border pt-4">
        <Skeleton className="h-3 w-20" />
        <div className="flex gap-2">
          <Skeleton className="h-7 w-28 rounded-full" />
          <Skeleton className="h-7 w-28 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function PackagesManagement() {
  const { data, isPending, isFetching, isError, refetch } = useGetPackages();

  const packages = (data ?? []) as IPackage[];


  if (isPending) {
    return (
      <div className={GRID_CLASS}>
        {Array.from({ length: 6 }).map((_, i) => (
          <CollectorCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-border bg-card p-10 text-center text-card-foreground shadow-sm">
        <p className="text-sm font-semibold text-foreground">
          Couldn&apos;t load collectors
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Something went wrong. Please try again.
        </p>
        <Button variant="outline" className="mt-4" onClick={() => refetch()}>
          Try again
        </Button>
      </div>
    );
  }

  if (packages.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-card p-10 text-center text-card-foreground">
        <p className="text-sm font-semibold text-foreground">
          No packages yet
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Packages will appear here once they are added.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <h2 className="text-base font-semibold text-foreground">
          All packages
        </h2>
        <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
          {packages.length}
        </span>
      </div>

      <div
        className={cn(
          GRID_CLASS,
          "transition-opacity",
          isFetching && "opacity-60",
        )}
      >
        {packages.map((pkg) => (
          <PackageCard key={pkg.id} pkg={pkg} />
        ))}
      </div>
    </div>
  );
}