import { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Skeleton } from "../skeleton/skeleton";

const STAT_TONES = {
  primary: "bg-primary/10 text-primary",
  secondary: "bg-secondary/10 text-secondary",
  destructive: "bg-destructive/10 text-destructive",
};

export function StatCard({
  title,
  value,
  icon: Icon,
  tone,
  loading,
}: {
  title: string;
  value?: number;
  icon: LucideIcon;
  tone: keyof typeof STAT_TONES;
  loading: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-border bg-card p-5 text-card-foreground shadow-sm transition-shadow hover:shadow-md">
      <div className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        {loading ? (
          <Skeleton className="h-8 w-16" />
        ) : (
          <p className="text-3xl font-bold tracking-tight text-foreground">
            {value ?? 0}
          </p>
        )}
      </div>
      <span
        className={cn(
          "flex size-11 shrink-0 items-center justify-center rounded-xl",
          STAT_TONES[tone],
        )}
      >
        <Icon className="size-5" />
      </span>
    </div>
  );
}
