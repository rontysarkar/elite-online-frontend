import {
  Clock3,
  DollarSign,
  MessageCircle,
  Zap,
} from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Blazing Fast Speeds",
    description:
      "Up to 100 Mbps with zero throttling — stream, game, and work without interruption.",
  },
  {
    icon: Clock3,
    title: "99.9% Uptime",
    description:
      "Reliable connection you can count on, backed by redundant fiber infrastructure.",
  },
  {
    icon: MessageCircle,
    title: "24/7 Support",
    description:
      "Real humans, always ready to help — not bots, not voicemail trees.",
  },
  {
    icon: DollarSign,
    title: "Best Value",
    description:
      "Transparent pricing, no surprises. What you see is exactly what you pay.",
  },
]

export function WhyChooseUs() {
  return (
    <section
      id="about"
      className="bg-muted/40 py-16 md:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Why Elite Online?
          </h2>

          <p className="mt-2 text-muted-foreground">
            Built for reliability. Designed for you.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon

            return (
              <div
                key={feature.title}
                className="group text-center"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform group-hover:scale-110">
                  <Icon className="h-7 w-7" />
                </div>

                <h3 className="mt-5 text-lg font-bold">
                  {feature.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}