import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { AuthHeader } from "@/components/layout/auth-header";
import VerifyEmailForm from "@/components/form/verify-email-form";



export const metadata: Metadata = {
  title: "Verify your email",
};

export default function VerifyEmailPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <AuthHeader />

      <main className="flex flex-1 items-center justify-center px-4 py-10 sm:px-6">
        <div className="w-full max-w-md space-y-6">
          <div className="rounded-xl border border-border bg-card p-6 text-center text-card-foreground shadow-sm sm:p-8">
            <Suspense fallback={null}>
              <VerifyEmailForm />
            </Suspense>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Wrong email?{" "}
            <Link
              href="/request-connection"
              className="font-medium text-primary transition-colors hover:underline"
            >
              Go back
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}