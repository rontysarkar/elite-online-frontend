"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { DASHBOARD_CONFIG, type DashboardRole } from "@/config/dashboard-nav";

import { useGetMe } from "@/hooks";
import { Logo } from "@/components/global/logo";

interface DashboardShellProps {
  children: React.ReactNode;
}

function getRoleFromPathname(pathname: string): DashboardRole {
  const segment = pathname.split("/")[1];
  if (segment === "admin" || segment === "collector") return segment;
  return "customer";
}

export function DashboardShell({ children }: DashboardShellProps) {
  const pathname = usePathname();
  const role = getRoleFromPathname(pathname);
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const { label, nav } = DASHBOARD_CONFIG[role];

  
  function isActive(href: string) {
    return href === `/${role}`
      ? pathname === href
      : pathname === href || pathname.startsWith(`${href}/`);
  }

  const {data} = useGetMe();

  return (
    <div className="min-h-screen bg-background">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-foreground/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

    
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border bg-card text-card-foreground transition-transform duration-300 ease-out lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-border px-4">
          <Logo />
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X className="size-5" />
          </Button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {nav.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <item.icon className="size-4" />
                {item.title}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-border p-3">
          <button
            type="button"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <LogOut className="size-4" />
            Log out
          </button>
        </div>
      </aside>


      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur sm:px-6">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              <Menu className="size-5" />
            </Button>
            <span className="text-sm font-semibold text-foreground">
              {label}
            </span>
          </div>

          
          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold leading-none text-foreground">
                {data?.data?.name}
              </p>
              <p className="mt-1 text-xs capitalize text-muted-foreground">
                {data?.data?.role}
              </p>
            </div>
            <span className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
              {data?.data?.role.charAt(0).toUpperCase()}
            </span>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}