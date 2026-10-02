import type { Metadata } from "next";
import Link from "next/link";


import { LoginForm } from "@/components/form/login-form";
import { AuthHeader } from "@/components/global/auth-header";


export const metadata: Metadata = {
  title: "Log in",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <AuthHeader />
      <main className="flex flex-1 items-center justify-center px-4 py-10 sm:px-6">
        <div className="w-full max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Welcome back
            </h1>
            <p className="text-sm text-muted-foreground">
              Log in to manage your connection and bills.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm sm:p-8">
            <LoginForm />
          </div>

          <p className="text-center text-sm text-muted-foreground">
            New here?{" "}
            {/* TODO: Change href to your real connection request page */}
            <Link
              href="/#request-connection"
              className="font-medium text-primary transition-colors hover:underline"
            >
              Request a connection
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}