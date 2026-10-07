import { cn } from "@/utils/cn";
import { LucideIcon } from "lucide-react";

export function InfoCard({
  icon: Icon,
  label,
  value,
  hint,
  href,
  className,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  hint?: string;
  href?: string;
  className?: string;
}) {
  const valueClass = "text-sm font-semibold break-words text-foreground";

  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-xl border border-border bg-card p-4",
        className,
      )}
    >
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon className="size-4" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        {href ? (
          <a
            href={href}
            className={cn(
              valueClass,
              "block transition-colors hover:text-primary hover:underline",
            )}
          >
            {value}
          </a>
        ) : (
          <p className={valueClass}>{value}</p>
        )}
        {hint && <p className="mt-0.5 text-xs text-muted-foreground">{hint}</p>}
      </div>
    </div>
  );
}