import Link from "next/link"

const areas = [
  "Mirpur",
  "Dhanmondi",
  "Uttara",
  "Gulshan",
  "Motijheel",
  "Mohammadpur",
  "Bashundhara",
  "Banani",
  "Baridhara",
  "Farmgate",
  "Panthapath",
  "Tejgaon",
]

export function Coverage() {
  return (
    <section
      id="coverage"
      className="bg-muted/50 py-16 md:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Available in Your Area
          </h2>

          <p className="mt-2 text-muted-foreground">
            Currently serving these locations
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {areas.map((area) => (
            <span
              key={area}
              className="rounded-full border border-primary bg-background px-5 py-2.5 text-sm font-medium transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              {area}
            </span>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Don't see your area?{" "}
          <Link
            href="#contact"
            className="font-medium text-primary underline underline-offset-4"
          >
            Contact us
          </Link>
        </p>
      </div>
    </section>
  )
}