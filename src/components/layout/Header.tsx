"use client";

import Link from "next/link";
import { Menu, Wifi } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { ModeToggle } from "@/components/global/mode-toggle";
import { useState } from "react";

const navItems = [
  {
    label: "Home",
    href: "#home",
  },
  {
    label: "Packages",
    href: "#packages",
  },
  {
    label: "Promotions",
    href: "#promotions",
  },
  {
    label: "Coverage",
    href: "#coverage",
  },
  {
    label: "About",
    href: "#about",
  },
  {
    label: "Contact",
    href: "#contact",
  },
];

export function Header() {
  const [openConnectionModal, setOpenConnectionModal] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="#home" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Wifi className="h-5 w-5" />
          </div>

          <div className="flex flex-col leading-none">
            <span className="text-lg font-bold tracking-tight">
              Elite Online
            </span>

            <span className="text-[10px] text-muted-foreground">
              Internet Service Provider
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-2 lg:flex">
          <ModeToggle />

          <Button nativeButton={false} render={<Link href="#contact" />}>
            Customer Login
          </Button>

          <Button nativeButton={false} render={<Link href="#contact" />}>
            Get Connection
          </Button>
        </div>

        {/* Mobile Actions */}
        <div className="flex  items-center gap-1 lg:hidden">
          <ModeToggle />

          <Sheet>
            <SheetTrigger
              render={
                <button
                  type="button"
                  aria-label="Open menu"
                  className="inline-flex  h-9 w-9 items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                />
              }
            >
              <Menu className="h-5 w-5" />
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[300px] sm:w-[360px] bg-background"
            >
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <Wifi className="h-4 w-4" />
                  </span>
                  Elite Online
                </SheetTitle>
              </SheetHeader>

              <div className="mt-8 flex flex-col px-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="border-b py-4 text-sm font-medium transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                ))}

                <div className="mt-6 flex flex-col gap-3">
                  <Button
                    variant="outline"
                    nativeButton={false}
                    render={<Link href="#contact" />}
                  >
                    Customer Login
                  </Button>

                  <Button
                    nativeButton={false}
                    render={<Link href="#contact" />}
                  >
                    Get Connection
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
