import Link from "next/link";

import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section id="contact" className="bg-primary py-16 md:py-20">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <h2 className="text-3xl font-bold tracking-tight text-primary-foreground md:text-4xl">
          Ready to Get Connected?
        </h2>

        <p className="mt-3 text-primary-foreground/80">
          Join thousands of satisfied customers today
        </p>

        <Button
        nativeButton={false}
          size="lg"
          variant="secondary"
          className="mt-8"
          render={<Link href="/request-connection">Request New Connection</Link>}
        >
          Request New Connection
        </Button>
      </div>
    </section>
  );
}
