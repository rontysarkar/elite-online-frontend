import { MailCheck, MailWarning } from "lucide-react";

import { cn } from "@/lib/utils";

export function EmailVerifiedBadge({ verified }: { verified: boolean }) {
  const Icon = verified ? MailCheck : MailWarning;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
        verified
          ? "bg-primary/10 text-primary"
          : "bg-muted text-muted-foreground",
      )}
    >
      <Icon className="size-3.5" />
      {verified ? "Verified" : "Not verified"}
    </span>
  );
}