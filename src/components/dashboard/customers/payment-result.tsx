import Link from "next/link";
import { CircleCheck, CircleX, type LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";

const BILLS_HREF = "/customer/bills";

interface PaymentResultCardProps {
  icon: LucideIcon;
  iconClassName: string;
  title: string;
  description: string;
}

function PaymentResultCard({
  icon: Icon,
  iconClassName,
  title,
  description,
}: PaymentResultCardProps) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-6 text-center text-card-foreground shadow-sm sm:p-8">
        <span
          className={cn(
            "mx-auto flex size-16 items-center justify-center rounded-xl",
            iconClassName,
          )}
        >
          <Icon className="size-8" />
        </span>

        <h1 className="mt-6 text-2xl font-bold tracking-tight text-foreground">
          {title}
        </h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {description}
        </p>

        <Button
          size="lg"
          className="mt-8 h-11 w-full"
          render={<Link href={BILLS_HREF} />}
          nativeButton={false}
        >
          Back to bills
        </Button>
      </div>
    </div>
  );
}

export function PaymentSuccess() {
  return (
    <PaymentResultCard
      icon={CircleCheck}
      iconClassName="bg-primary/10 text-primary"
      title="Payment successful"
      description="Thank you! We have received your payment. Your bill will show as paid shortly."
    />
  );
}

export function PaymentFailure() {
  return (
    <PaymentResultCard
      icon={CircleX}
      iconClassName="bg-destructive/10 text-destructive"
      title="Payment failed"
      description="Your payment could not be completed. Please go back to your bills and try again."
    />
  );
}