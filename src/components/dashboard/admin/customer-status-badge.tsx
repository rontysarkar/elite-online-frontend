import { cn } from "@/lib/utils";
import { CustomerStatus } from "@/types";



export function CustomerStatusBadge({ status }: { status: CustomerStatus }) {
  const active = status === "ACTIVE";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
        active ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground",
      )}
    >
      <span
        className={cn(
          "size-1.5 rounded-full",
          active ? "bg-primary" : "bg-muted-foreground",
        )}
      />
      {active ? "Active" : "Inactive"}
    </span>
  );
}