import Link from "next/link";

import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

// TODO: Replace "NetLink" with your real ISP brand name.
const BRAND_NAME = "NetLink";

export function Logo({ className }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label={`${BRAND_NAME} home`}
      className={cn("flex items-center gap-2.5", className)}
    >
      {/* Icon: signal arcs + dot, inside a rounded tile that uses your primary color */}
      <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.2}
          strokeLinecap="round"
          className="size-5"
          aria-hidden="true"
        >
          <path d="M8.5 14.5a5 5 0 0 1 7 0" />
          <path d="M5.5 11.5a9 9 0 0 1 13 0" />
          <path d="M2.8 8.6a13 13 0 0 1 18.4 0" />
          <circle cx="12" cy="18.5" r="1.4" fill="currentColor" stroke="none" />
        </svg>
      </span>

      <span className="text-xl font-bold tracking-tight text-foreground">
        {BRAND_NAME}
      </span>
    </Link>
  );
}