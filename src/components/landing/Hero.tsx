import Link from "next/link";
import {
  ArrowRight,
  Gauge,
  MessageCircle,
  Users,
  Wifi,
  Zap,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_75%_50%,rgba(41,171,226,0.14),transparent_35%)]" />

      <div className="mx-auto grid min-h-[calc(100vh-64px)] max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-20">
        {/* Left */}
        <div className="text-center lg:text-left">
          <Badge
            variant="secondary"
            className="mb-5 bg-primary/10 text-primary hover:bg-primary/10"
          >
            🚀 Fastest Broadband in Your Area
          </Badge>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Blazing Fast Internet
            <span className="mt-1 block text-primary">
              For Your Home & Business
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-muted-foreground lg:mx-0 lg:text-lg">
            Experience seamless connectivity with speeds up to 100 Mbps. No
            throttling, no hidden fees.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <Button nativeButton={false} render={<Link href="#packages" />}>
              View Packages
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <Button nativeButton={false} render={<Link href="#contact" />}>
              Request Connection
              
            </Button>
          </div>

          {/* Stats */}
          <div className="mx-auto mt-10 grid max-w-lg grid-cols-3 border-t pt-8 lg:mx-0">
            <HeroStat
              icon={<Users />}
              value="10,000+"
              label="Happy Customers"
            />

            <HeroStat icon={<Zap />} value="99.9%" label="Uptime" />

            <HeroStat icon={<MessageCircle />} value="24/7" label="Support" />
          </div>
        </div>

        {/* Right */}
        <NetworkVisual />
      </div>
    </section>
  );
}

function HeroStat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2 text-center lg:items-start lg:text-left">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
        {icon}
      </div>

      <div>
        <p className="text-sm font-bold text-primary">{value}</p>

        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}

function NetworkVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px]">
      {/* Glow */}
      <div className="absolute inset-20 rounded-full bg-primary/10 blur-3xl" />

      {/* Connection Lines */}
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-[20%] h-[30%] w-px bg-primary/25" />

        <div className="absolute left-[20%] top-1/2 h-px w-[60%] bg-primary/25" />

        <div className="absolute left-1/2 top-1/2 h-[30%] w-px origin-top rotate-45 bg-primary/25" />

        <div className="absolute left-1/2 top-1/2 h-[30%] w-px origin-top -rotate-45 bg-primary/25" />
      </div>

      {/* Internet */}
      <div className="absolute left-1/2 top-[8%] -translate-x-1/2">
        <div className="rounded-full border bg-card px-5 py-2 text-sm font-semibold shadow-sm">
          ☁️ Internet
        </div>
      </div>

      {/* Router */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex h-28 w-28 items-center justify-center rounded-3xl border bg-card shadow-[0_15px_50px_rgba(41,171,226,0.25)]">
          <Wifi className="h-14 w-14 text-primary" />
        </div>
      </div>

      {/* Devices */}
      <Device className="left-[12%] top-[25%]" icon="📱" />

      <Device className="right-[12%] top-[25%]" icon="💻" />

      <Device className="left-[12%] bottom-[18%]" icon="🎮" />

      <Device className="right-[12%] bottom-[18%]" icon="📺" />

      {/* Download */}
      <div className="absolute right-0 top-1/2 rounded-xl bg-primary px-4 py-3 text-white shadow-lg">
        <p className="text-[10px] text-white/70">Download</p>

        <p className="font-bold">100 Mbps</p>
      </div>

      {/* Ping */}
      <div className="absolute left-0 top-1/2 rounded-xl border bg-card px-4 py-3 shadow-sm">
        <p className="text-[10px] text-muted-foreground">Ping</p>

        <p className="font-bold">4 ms</p>
      </div>

      {/* Unlimited */}
      <div className="absolute bottom-[5%] left-1/2 -translate-x-1/2 rounded-full border bg-card px-5 py-2 text-xs font-semibold text-primary shadow-sm">
        ▂▃▅▇ Unlimited
      </div>
    </div>
  );
}

function Device({ icon, className }: { icon: string; className: string }) {
  return (
    <div className={`absolute ${className}`}>
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border bg-card text-2xl shadow-md">
        {icon}
      </div>
    </div>
  );
}
