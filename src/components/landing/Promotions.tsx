import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
} from "@/components/ui/card"

const promotions = [
  {
    icon: "🎉",
    title: "New Year Special",
    discount: "SAVE 20%",
    description:
      "Get 20% off on all annual plans. Lock in the best rates before they go up.",
    valid: "Valid till: 31 Dec 2025",
  },
  {
    icon: "🏠",
    title: "Home Bundle Deal",
    discount: "SAVE 15%",
    description:
      "Free dual-band router + first month free when you sign up for 12 months.",
    valid: "Valid till: 31 Dec 2025",
  },
  {
    icon: "💼",
    title: "Business Launch Offer",
    discount: "SAVE 25%",
    description:
      "25% off Pro & Ultimate plans plus a complimentary static IP for 3 months.",
    valid: "Valid till: 31 Dec 2025",
  },
]

export function Promotions() {
  return (
    <section
      id="promotions"
      className="bg-muted/50 py-16 md:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          title="🔥 Current Offers"
          subtitle="Limited-time deals you don't want to miss"
        />

        <div className="grid gap-6 md:grid-cols-3">
          {promotions.map((promotion) => (
            <Card
              key={promotion.title}
              className="relative overflow-hidden border-t-4 border-t-primary transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <Badge className="absolute right-4 top-4">
                {promotion.discount}
              </Badge>

              <CardContent className="pt-8">
                <div className="text-4xl">
                  {promotion.icon}
                </div>

                <h3 className="mt-5 text-xl font-bold">
                  {promotion.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {promotion.description}
                </p>

                <p className="mt-4 text-xs text-muted-foreground">
                  {promotion.valid}
                </p>

                <Link
                  href="#packages"
                  className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary"
                >
                  Claim Offer
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function SectionHeading({
  title,
  subtitle,
}: {
  title: string
  subtitle: string
}) {
  return (
    <div className="mb-12 text-center">
      <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
        {title}
      </h2>

      <p className="mt-2 text-muted-foreground">
        {subtitle}
      </p>
    </div>
  )
}