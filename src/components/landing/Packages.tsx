"use client";

import { Check } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const homePlans = [
  {
    name: "Basic",
    price: "500",
    speed: "10 Mbps",
    features: ["Unlimited Data", "Free Installation", "24/7 Support"],
  },
  {
    name: "Standard",
    price: "700",
    speed: "30 Mbps",
    popular: true,
    features: [
      "Unlimited Data",
      "Free Router",
      "Priority Support",
      "Free Installation",
    ],
  },
  {
    name: "Premium",
    price: "1000",
    speed: "50 Mbps",
    features: [
      "Unlimited Data",
      "Free Dual-Band Router",
      "Priority Support",
      "Static IP option",
    ],
  },
  {
    name: "Ultimate",
    price: "2000",
    speed: "100 Mbps",
    features: ["All Pro features", "Business SLA", "Dedicated Manager"],
  },
];

const businessPlans = [
  {
    name: "Business Basic",
    price: "1500",
    speed: "50 Mbps",
    features: ["Unlimited Data", "Priority Support", "Free Installation"],
  },
  {
    name: "Business Pro",
    price: "2500",
    speed: "100 Mbps",
    popular: true,
    features: [
      "Unlimited Data",
      "Static IP",
      "Priority Support",
      "Business SLA",
    ],
  },
  {
    name: "Business Plus",
    price: "4000",
    speed: "200 Mbps",
    features: [
      "Unlimited Data",
      "Static IP",
      "Dedicated Support",
      "Business SLA",
    ],
  },
  {
    name: "Enterprise",
    price: "6000",
    speed: "500 Mbps",
    features: [
      "Dedicated Connection",
      "Multiple Static IPs",
      "Dedicated Manager",
    ],
  },
];

export function Packages() {
  return (
    <section id="packages" className="bg-background py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Choose Your Perfect Plan
          </h2>

          <p className="mt-2 text-muted-foreground">
            Transparent pricing. No hidden charges. Cancel anytime.
          </p>
        </div>

        <Tabs defaultValue="home" className="w-full flex flex-col ">
          {/* <div className="mb-10 flex  justify-center">
            <TabsList>
              <TabsTrigger value="home">
                Home
              </TabsTrigger>

              <TabsTrigger value="business">
                Business
              </TabsTrigger>
            </TabsList>
          </div> */}

          <TabsContent value="home">
            <PlanGrid plans={homePlans} />
          </TabsContent>

          <TabsContent value="business">
            <PlanGrid plans={businessPlans} />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

function PlanGrid({ plans }: { plans: typeof homePlans }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
      {plans.map((plan) => (
        <Card
          key={plan.name}
          className={
            plan.popular
              ? "relative border-primary shadow-lg"
              : "relative transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg"
          }
        >
          {plan.popular && (
            <Badge className="absolute right-4 top-0 rounded-t-none">
              MOST POPULAR
            </Badge>
          )}

          <CardHeader>
            <h3 className="text-sm font-medium text-muted-foreground">
              {plan.name}
            </h3>

            <div className="mt-2 text-4xl font-bold">
              ৳{plan.price}
              <span className="text-sm font-normal text-muted-foreground">
                /month
              </span>
            </div>
          </CardHeader>

          <CardContent className="flex-1">
            <div className="mb-5 inline-flex  rounded-full bg-primary/10 px-4 py-1.5 text-sm font-bold text-primary">
              {plan.speed}
            </div>

            <ul className="space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />

                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>

          <CardFooter>
            <Button className="w-full">Get Started</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
