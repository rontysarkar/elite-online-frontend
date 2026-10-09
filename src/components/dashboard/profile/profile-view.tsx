"use client";

import * as React from "react";
import {
  Home,
  KeyRound,
  Lock,
  Mail,
  MapPin,
  Package,
  Phone,
} from "lucide-react";


import { Button } from "@/components/ui/button";
import { formatDate, getInitials } from "@/helper";
import { cn } from "@/utils/cn";
import { Profile, ProfileRole } from "./profile-types";
import { InfoCard } from "../components/info-card";
import { ChangePasswordModal } from "./change-password-modal";
import { ProfileSkeleton } from "./profile-skeleton";
import { useGetMe } from "@/hooks";



const ROLE_CONFIG: Record<ProfileRole, { label: string; badge: string }> = {
  ADMIN: { label: "Admin", badge: "bg-foreground/10 text-foreground" },
  COLLECTOR: { label: "Collector", badge: "bg-secondary/10 text-secondary" },
  CUSTOMER: { label: "Customer", badge: "bg-primary/10 text-primary" },
};

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-3 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
      {children}
    </h2>
  );
}



export function ProfileView() {
  const { data, isPending, isError, refetch } = useGetMe();
  const [passwordOpen, setPasswordOpen] = React.useState(false);

  const profile = data as Profile | undefined;

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Profile
        </h1>
        <p className="text-sm text-muted-foreground">
          Your account information and security.
        </p>
      </div>

      {isPending && <ProfileSkeleton />}

      {isError && (
        <div className="rounded-xl border border-border bg-card p-10 text-center text-card-foreground shadow-sm">
          <p className="text-sm font-semibold text-foreground">
            Couldn&apos;t load your profile
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Something went wrong. Please try again.
          </p>
          <Button variant="outline" className="mt-4" onClick={() => refetch()}>
            Try again
          </Button>
        </div>
      )}

      {profile && (
        <>
          <section className="overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-sm">
            <div className="h-20 bg-primary/10 sm:h-24" />
            <div className="px-5 pb-6 sm:px-6">
              <div className="-mt-10 flex flex-col gap-4 sm:-mt-12 sm:flex-row sm:items-end">
                <span className="flex size-20 shrink-0 items-center justify-center rounded-xl bg-primary text-2xl font-bold text-primary-foreground shadow-sm ring-4 ring-card sm:size-24 sm:text-3xl">
                  {getInitials(profile.name)}
                </span>

                <div className="min-w-0 space-y-2 sm:pb-1">
                  <h2 className="truncate text-2xl font-bold tracking-tight text-foreground">
                    {profile.name}
                  </h2>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                    <span
                      className={cn(
                        "inline-flex rounded-full px-2.5 py-1 text-xs font-semibold",
                        ROLE_CONFIG[profile.role]?.badge,
                      )}
                    >
                      {ROLE_CONFIG[profile.role]?.label ?? profile.role}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Member since {formatDate(profile.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <SectionTitle>Contact</SectionTitle>
            <div className="grid gap-3 sm:grid-cols-2">
              <InfoCard
                icon={Phone}
                label="Phone"
                value={profile.phone}
                href={`tel:${profile.phone}`}
              />
              <InfoCard
                icon={Mail}
                label="Email"
                value={profile.email}
                href={`mailto:${profile.email}`}
              />
            </div>
          </section>

          {profile.role === "CUSTOMER" && profile.customer && (
            <section>
              <SectionTitle>Connection</SectionTitle>
              <div className="grid gap-3 sm:grid-cols-2">
                <InfoCard
                  icon={Package}
                  label="Package"
                  value={profile.customer.package.name}
                  hint={`${profile.customer.package.speed} · ৳${profile.customer.package.price}/mo`}
                />
                <InfoCard
                  icon={MapPin}
                  label="Area"
                  value={profile.customer.area.name}
                />
                <InfoCard
                  icon={Home}
                  label="Address"
                  value={profile.customer.address}
                  className="sm:col-span-2"
                />
              </div>
            </section>
          )}

          {profile.role === "COLLECTOR" && (
            <section>
              <SectionTitle>Assigned areas ({profile.area.length})</SectionTitle>
              <div className="rounded-xl border border-border bg-card p-4 text-card-foreground">
                {profile.area.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {profile.area.map((area) => (
                      <span
                        key={area.name}
                        className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground"
                      >
                        <MapPin className="size-3.5 text-primary" />
                        {area.name}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No areas assigned yet.
                  </p>
                )}
              </div>
            </section>
          )}

          <section className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5 text-card-foreground shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div className="flex items-center gap-4">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Lock className="size-5" />
              </span>
              <div>
                <h2 className="text-base font-semibold text-foreground">
                  Password
                </h2>
                <p className="text-sm text-muted-foreground">
                  Keep your account safe with a strong password.
                </p>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="h-11 w-full sm:h-10 sm:w-auto"
              onClick={() => setPasswordOpen(true)}
            >
              <KeyRound className="size-4" />
              Change password
            </Button>
          </section>

          <ChangePasswordModal
            open={passwordOpen}
            onOpenChange={setPasswordOpen}
          />
        </>
      )}
    </div>
  );
}