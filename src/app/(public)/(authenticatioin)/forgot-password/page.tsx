import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AuthHeader } from "@/components/layout/auth-header";
import { ForgotPasswordForm } from "@/components/form/forgot-password-form";



export const metadata: Metadata = {
  title: "Forgot password",
};

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <AuthHeader />

      <main className="flex flex-1 items-center justify-center px-4 py-10 sm:px-6">
        <div className="w-full max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Forgot password?
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email and we&apos;ll send you a code to reset your
              password.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm sm:p-8">
            <ForgotPasswordForm />
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