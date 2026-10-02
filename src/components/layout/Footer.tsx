
import Link from "next/link"
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa"
import { Wifi } from "lucide-react"

const quickLinks = [
  ["Home", "#home"],
  ["Packages", "#packages"],
  ["About", "#about"],
  ["Contact", "#contact"],
]

const supportLinks = [
  ["FAQ", "#contact"],
  ["Coverage", "#coverage"],
  ["Speed Test", "#packages"],
  ["Help Center", "#contact"],
]

export function Footer() {
  return (
    <footer className="border-t bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>
            <Link
              href="#home"
              className="flex items-center gap-2.5"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Wifi className="h-5 w-5 text-primary-foreground" />
              </span>

              <span className="text-xl font-bold">
                Elite Online
              </span>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
              Delivering blazing-fast, reliable broadband across Dhaka.
              No throttling, no hidden fees — just honest internet.
            </p>
          </div>

          {/* Quick Links */}
          <FooterColumn
            title="Quick Links"
            items={quickLinks}
          />

          {/* Support */}
          <FooterColumn
            title="Support"
            items={supportLinks}
          />

          {/* Contact */}
          <div>
            <h3 className="font-semibold">
              Contact
            </h3>

            <div className="mt-4 space-y-3 text-sm text-muted-foreground">
              <p>📞 01700-000000</p>
              <p>✉️ info@eliteonline.com</p>
              <p>📍 Dhaka, Bangladesh</p>
            </div>

            <div className="mt-5 flex gap-2">
              <SocialButton icon={<FaFacebookF />} />
              <SocialButton icon={<FaTwitter />} />
              <SocialButton icon={<FaInstagram />} />
              <SocialButton icon={<FaLinkedinIn />} />
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t py-5 text-center text-xs text-muted-foreground">
        © 2025 Elite Online. All rights reserved.
      </div>
    </footer>
  )
}

function FooterColumn({
  title,
  items,
}: {
  title: string
  items: string[][]
}) {
  return (
    <div>
      <h3 className="font-semibold">
        {title}
      </h3>

      <ul className="mt-4 space-y-3">
        {items.map(([label, href]) => (
          <li key={label}>
            <Link
              href={href}
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function SocialButton({
  icon,
}: {
  icon: React.ReactNode
}) {
  return (
    <button
      type="button"
      className="flex h-9 w-9 items-center justify-center rounded-full border text-muted-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
    >
      {icon}
    </button>
  )
}

