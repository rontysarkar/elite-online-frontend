import { MapPin, UserCheck, Users } from "lucide-react";


import { formatDate } from "@/helper";
import { IArea } from "@/types";
import { StatTile } from "./stat-tile";

export function AreaCard({ area }: { area: IArea }) {
  return (
    <article className="flex flex-col gap-5 rounded-xl border border-border bg-card p-5 text-card-foreground shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-center gap-3">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
          <MapPin className="size-5" />
        </span>
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold text-foreground">
            {area.name}
          </h3>
          <p className="text-xs text-muted-foreground">
            Created {formatDate(area.createdAt)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <StatTile
          icon={Users}
          label="Customers"
          value={area.totalCustomers}
          tone="bg-primary/10 text-primary"
        />
        <StatTile
          icon={UserCheck}
          label="Collector"
          value={area.collectorName ?? "Not assigned"}
          tone="bg-secondary/10 text-secondary"
        />
      </div>
    </article>
  );
}