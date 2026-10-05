/** biome-ignore-all lint/a11y/useSemanticElements: <explanation> */
import { cn } from "@/lib/utils";


function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      aria-hidden="true"
    />
  );
}

const cardClass =
  "rounded-xl border border-border bg-card p-5 text-card-foreground shadow-sm sm:p-6";


export function ReportsOverviewSkeleton() {
  return (
    <div className="space-y-6" role="status" aria-label="Loading bills report">

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="size-10 rounded-xl" />
            </div>
            <Skeleton className="mt-4 h-8 w-32" />
            <div className="mt-3 flex items-center justify-between">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
        ))}
      </div>

   
      <div className="grid gap-4 lg:grid-cols-5">
        <div className={cn(cardClass, "lg:col-span-2")}>
          <Skeleton className="h-5 w-32" />
          <Skeleton className="mt-2 h-4 w-48" />
          <Skeleton className="mx-auto mt-6 size-44 rounded-full" />
          <Skeleton className="mx-auto mt-5 h-4 w-56" />
        </div>

        <div className={cn(cardClass, "lg:col-span-3")}>
          <Skeleton className="h-5 w-24" />
          <Skeleton className="mt-2 h-4 w-56" />
          <Skeleton className="mt-6 h-3 w-full rounded-full" />
          <div className="mt-5 space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Skeleton className="size-3 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Skeleton className="ml-auto h-4 w-20" />
                  <Skeleton className="ml-auto h-3 w-8" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>


      <div className={cardClass}>
        <Skeleton className="h-5 w-36" />
        <Skeleton className="mt-2 h-4 w-52" />
        <Skeleton className="mt-6 h-3 w-full rounded-full" />
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 rounded-xl border border-border p-4">
              <Skeleton className="size-11 rounded-xl" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-3 w-36" />
              </div>
              <Skeleton className="h-5 w-16" />
            </div>
          ))}
        </div>
      </div>

      <span className="sr-only">Loading...</span>
    </div>
  );
}