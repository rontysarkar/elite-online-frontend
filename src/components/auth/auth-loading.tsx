import { Loader2 } from "lucide-react";

import { cn } from "@/utils/cn";
import { Logo } from "../global/logo";

interface AuthLoadingProps {
  message?: string;
  fullScreen?: boolean;
}

export function AuthLoading({
  message = "Loading your dashboard...",
  fullScreen = true,
}: AuthLoadingProps) {
  return (
    // biome-ignore lint/a11y/useSemanticElements: <explanation>
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "flex flex-col items-center justify-center gap-6 bg-background px-4",
        fullScreen ? "min-h-screen" : "min-h-[60vh]",
      )}
    >
      {fullScreen && <Logo />}

      <div className="flex items-center gap-3 rounded-full border border-border bg-card px-4 py-2.5 shadow-sm">
        <Loader2 className="size-4 animate-spin text-primary" />
        <span className="text-sm font-medium text-muted-foreground">
          {message}
        </span>
      </div>
    </div>
  );
}
