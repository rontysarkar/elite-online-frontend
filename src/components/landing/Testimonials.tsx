import {
  Card,
  CardContent,
} from "@/components/ui/card"

const testimonials = [
  {
    name: "Farhana Rahman",
    area: "Dhanmondi",
    text: "Switched from my old ISP six months ago and never looked back. Speed is consistent even during peak hours.",
  },
  {
    name: "Mahmud Hasan",
    area: "Gulshan",
    text: "We run a small studio from home. The Pro plan handles four people on video calls plus uploads without a hiccup.",
  },
  {
    name: "Nusrat Jahan",
    area: "Uttara",
    text: "Honest pricing, no surprise bills. My kids stream while I work and everything just works.",
  },
]

export function Testimonials() {
  return (
    <section className="bg-background py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            What Our Customers Say
          </h2>

          <p className="mt-2 text-muted-foreground">
            Real stories from real people across Dhaka
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.name}
              className="transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <CardContent className="pt-7">
                <div className="mb-4 tracking-widest">
                  ⭐⭐⭐⭐⭐
                </div>

                <p className="text-sm italic leading-6 text-muted-foreground">
                  "{testimonial.text}"
                </p>

                <div className="mt-5">
                  <p className="text-sm font-semibold">
                    {testimonial.name}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    {testimonial.area}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}