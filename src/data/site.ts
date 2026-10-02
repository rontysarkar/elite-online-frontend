export type Plan = {
  name: string;
  price: number;
  speed: string;
  popular?: boolean;
  features: string[];
};

export const HOME_PLANS: Plan[] = [
  {
    name: "Starter",
    price: 500,
    speed: "10 Mbps",
    features: ["Unlimited Data", "Free Installation", "24/7 Support"],
  },
  {
    name: "Popular",
    price: 800,
    speed: "20 Mbps",
    popular: true,
    features: ["Unlimited Data", "Free Router", "Priority Support", "Free Installation"],
  },
  {
    name: "Pro",
    price: 1200,
    speed: "50 Mbps",
    features: ["Unlimited Data", "Free Dual-Band Router", "Priority Support", "Static IP option"],
  },
  {
    name: "Ultimate",
    price: 2000,
    speed: "100 Mbps",
    features: ["All Pro features", "Business SLA", "Dedicated Manager"],
  },
];

export const BUSINESS_PLANS: Plan[] = [
  {
    name: "Office",
    price: 1800,
    speed: "25 Mbps",
    features: ["Unlimited Data", "Static IP included", "99.5% Uptime SLA", "Business-hours Support"],
  },
  {
    name: "Business",
    price: 3000,
    speed: "60 Mbps",
    popular: true,
    features: ["Unlimited Data", "Static IP included", "99.9% Uptime SLA", "Priority 24/7 Support"],
  },
  {
    name: "Corporate",
    price: 5000,
    speed: "120 Mbps",
    features: ["99.9% Uptime SLA", "Free Dual-Band Router", "4hr On-site Response", "Dedicated Manager"],
  },
  {
    name: "Enterprise",
    price: 8500,
    speed: "200 Mbps",
    features: ["Custom SLA up to 99.99%", "Dedicated Fiber Line", "24/7 NOC Access", "Account Manager"],
  },
];

export type Promo = {
  icon: "gift" | "home" | "briefcase";
  badge: string;
  title: string;
  description: string;
};

export const PROMOS: Promo[] = [
  {
    icon: "gift",
    badge: "SAVE 20%",
    title: "New Year Special",
    description: "Get 20% off on all annual plans. Lock in the best rates before they go up.",
  },
  {
    icon: "home",
    badge: "SAVE 15%",
    title: "Home Bundle Deal",
    description: "Free dual-band router + first month free when you sign up for 12 months.",
  },
  {
    icon: "briefcase",
    badge: "SAVE 25%",
    title: "Business Launch Offer",
    description: "25% off Pro & Ultimate plans plus a complimentary static IP for 3 months.",
  },
];

export const AREAS = [
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
];

export const UPCOMING_AREAS = ["Keraniganj", "Savar", "Gazipur", "Narayanganj"];

export const TESTIMONIALS = [
  {
    quote:
      "Switched from my old ISP six months ago and never looked back. Speed is consistent even during peak hours. Installation took less than a day.",
    name: "Farhana Rahman",
    area: "Dhanmondi",
  },
  {
    quote:
      "We run a small studio from home. The Pro plan handles four people on video calls plus uploads without a hiccup. Support actually picks up.",
    name: "Mahmud Hasan",
    area: "Gulshan",
  },
  {
    quote:
      "Honest pricing, no surprise bills. My kids stream while I work and everything just works. Wish I'd switched to Elite Online sooner.",
    name: "Nusrat Jahan",
    area: "Uttara",
  },
];

export const NAV_LINKS = [
  { label: "Home", href: "#home", id: "home" },
  { label: "Packages", href: "#packages", id: "packages" },
  { label: "Promotions", href: "#promotions", id: "promotions" },
  { label: "Coverage", href: "#coverage", id: "coverage" },
  { label: "About", href: "#about", id: "about" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export const ALL_PLAN_OPTIONS = [
  ...HOME_PLANS.map((p) => `${p.name} — ${p.speed} (Home)`),
  ...BUSINESS_PLANS.map((p) => `${p.name} — ${p.speed} (Business)`),
];
