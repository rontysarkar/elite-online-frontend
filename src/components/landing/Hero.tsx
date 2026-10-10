import Link from "next/link";
import {
  ArrowRight,
  MessageCircle,
  Users,
  Zap,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { NetworkVisual } from "./network-visual";
import { useGetMe } from "@/hooks";

export function Hero() {

  // const { data, isLoading } = useGetMe();
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_75%_50%,rgba(41,171,226,0.14),transparent_35%)]" />

      <div className="mx-auto grid min-h-[calc(100vh-64px)] max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-20">
  
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

            <Button nativeButton={false} render={<Link href="/request-connection" />}>
              Request Connection
              
            </Button>
          </div>


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



