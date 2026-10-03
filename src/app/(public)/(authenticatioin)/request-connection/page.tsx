import { ConnectionRequestForm } from "@/components/form/connection-request-form";
import { AuthHeader } from "@/components/layout/auth-header";
import type { Metadata } from "next";
import Link from "next/link";




export const metadata: Metadata = {
  title: "Request a Connection",
};

export default function RequestConnectionPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <AuthHeader />

      <main className="flex flex-1 items-center justify-center px-4 py-10 sm:px-6">
        <div className="w-full max-w-xl space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Request a Connection
            </h1>
            <p className="text-sm text-muted-foreground">
              Fill this in and our team will call you back within 24 hours.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm sm:p-8">
            <ConnectionRequestForm />
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Already a customer?{" "}
            <Link
              href="/login"
              className="font-medium text-primary transition-colors hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}