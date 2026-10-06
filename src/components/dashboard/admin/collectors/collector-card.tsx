import { Mail, MapPin, Phone, Users, type LucideIcon } from "lucide-react";

import { formatDate, getInitials } from "@/helper";
import { cn } from "@/lib/utils";
import { ICollector } from "@/types";



const MAX_VISIBLE_AREAS = 4;

function StatTile({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: LucideIcon;
  label: string;
  value: number;
  tone: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-muted/50 p-3">
      <span
        className={cn(
          "flex size-10 shrink-0 items-center justify-center rounded-xl",
          tone,
        )}
      >
        <Icon className="size-4" />
      </span>
      <div>
        <p className="text-xl leading-none font-bold text-foreground">
          {value}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}

export function CollectorCard({ collector }: { collector: ICollector }) {
  const visibleAreas = collector.areas.slice(0, MAX_VISIBLE_AREAS);
  const hiddenCount = collector.areas.length - visibleAreas.length;

  return (
    <article className="flex flex-col gap-5 rounded-xl border border-border bg-card p-5 text-card-foreground shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-center gap-3">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary text-base font-bold text-primary-foreground shadow-sm">
          {getInitials(collector.name)}
        </span>
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold text-foreground">
            {collector.name}
          </h3>
          <p className="text-xs text-muted-foreground">
            Joined {formatDate(collector.createdAt)}
          </p>
        </div>
      </div>

      <div className="space-y-2 text-sm">
        <a
          href={`tel:${collector.phone}`}
          className="flex items-center gap-2.5 text-muted-foreground transition-colors hover:text-primary"
        >
          <Phone className="size-4 shrink-0" />
          <span className="truncate">{collector.phone}</span>
        </a>
        <a
          href={`mailto:${collector.email}`}
          className="flex items-center gap-2.5 text-muted-foreground transition-colors hover:text-primary"
        >
          <Mail className="size-4 shrink-0" />
          <span className="truncate">{collector.email}</span>
        </a>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <StatTile
          icon={MapPin}
          label="Areas"
          value={collector.totalAreas}
          tone="bg-primary/10 text-primary"
        />
        <StatTile
          icon={Users}
          label="Customers"
          value={collector.totalCustomers}
          tone="bg-secondary/10 text-secondary"
        />
      </div>

      <div className="mt-auto space-y-2 border-t border-border pt-4">
        <p className="text-xs font-medium text-muted-foreground">
          Service areas
        </p>
        {visibleAreas.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {visibleAreas.map((area) => (
              <span
                key={area}
                className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground"
              >
                <MapPin className="size-3 text-primary" />
                {area}
              </span>
            ))}
            {hiddenCount > 0 && (
              <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                +{hiddenCount} more
              </span>
            )}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No areas assigned</p>
        )}
      </div>
    </article>
  );
}