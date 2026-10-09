import { Skeleton } from "../skeleton/skeleton";

export function ProfileSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-44 w-full rounded-xl" />
      <div className="grid gap-3 sm:grid-cols-2">
        <Skeleton className="h-[74px] w-full rounded-xl" />
        <Skeleton className="h-[74px] w-full rounded-xl" />
      </div>
      <Skeleton className="h-24 w-full rounded-xl" />
    </div>
  );
}