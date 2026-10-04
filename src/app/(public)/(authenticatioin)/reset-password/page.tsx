import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AuthHeader } from "@/components/layout/auth-header";
import { ResetPasswordForm } from "@/components/form/reset-password-form";


export const metadata: Metadata = {
  title: "Reset password",
};

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <AuthHeader />

      <main className="flex flex-1 items-center justify-center px-4 py-10 sm:px-6">
        <div className="w-full max-w-md space-y-6">
          <div className="rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm sm:p-8">
            {/* Suspense is required because the form uses useSearchParams() */}
            <Suspense fallback={null}>
              <ResetPasswordForm />
            </Suspense>
          </div>

          <p className="text-center text-sm">
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 font-medium text-primary transition-colors hover:underline"
            >
              <ArrowLeft className="size-4" />
              Back to login
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}