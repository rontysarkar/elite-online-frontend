import { Skeleton } from "../../skeleton/skeleton";

export function BillRowSkeleton() {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4 shadow-sm lg:flex-row lg:items-center lg:gap-6">
      <div className="flex flex-1 items-start gap-3">
        <Skeleton className="size-11 rounded-xl" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-full max-w-sm" />
        </div>
      </div>
      <div className="flex flex-col gap-3 border-t border-border pt-3 lg:flex-row lg:items-center lg:border-t-0 lg:pt-0">
        <div className="flex items-center justify-between gap-4">
          <Skeleton className="h-8 w-32 rounded-lg" />
          <Skeleton className="h-6 w-16" />
        </div>
        <Skeleton className="h-11 w-full rounded-lg lg:h-9 lg:w-28" />
      </div>
    </div>
  );
}