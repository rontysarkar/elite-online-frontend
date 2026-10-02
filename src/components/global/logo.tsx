import Link from "next/link";

import { cn } from "@/lib/utils";
import { Wifi } from "lucide-react";

interface LogoProps {
  className?: string;
}

// TODO: Replace "NetLink" with your real ISP brand name.
const BRAND_NAME = "NetLink";

export function Logo({ className }: LogoProps) {
  return (
    
    <Link href="#home" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Wifi className="h-5 w-5" />
          </div>

          <div className="flex flex-col leading-none">
            <span className="text-lg font-bold tracking-tight">
              Elite Online
            </span>

            <span className="text-[10px] text-muted-foreground">
              Internet Service Provider
            </span>
          </div>
        </Link>
  );
}