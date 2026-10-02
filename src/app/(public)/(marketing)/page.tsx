import { Coverage } from "@/components/landing/Coverage";
import { CTA } from "@/components/landing/CTA";
import { Hero } from "@/components/landing/Hero";
import { Packages } from "@/components/landing/Packages";
import { Promotions } from "@/components/landing/Promotions";
import { Testimonials } from "@/components/landing/Testimonials";
import { WhyChooseUs } from "@/components/landing/WhyChooseUs";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <Promotions />
      <Packages />
      <WhyChooseUs />
      <Coverage />
      <Testimonials />
      <CTA />
    </div>
  );
}
