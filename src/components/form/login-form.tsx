"use client";

import * as React from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    setIsSubmitting(true);
    // TODO: Call your real login API / auth function here.
    console.log(Object.fromEntries(formData));
    await new Promise((resolve) => setTimeout(resolve, 600)); // placeholder delay
    setIsSubmitting(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="login-id">Phone number or email</Label>
        <Input
          id="login-id"
          name="identifier"
          autoComplete="username"
          placeholder="01XXX-XXXXXX"
          required
          className="h-11"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="login-password">Password</Label>
          {/* TODO: Change href to your real forgot password page */}
          <Link
            href="/forgot-password"
            className="text-sm font-medium text-primary transition-colors hover:underline"
          >
            Forgot password?
          </Link>
        </div>
        <div className="relative">
          <Input
            id="login-password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="Enter your password"
            required
            className="h-11 pr-11"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
          >
            {showPassword ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </button>
        </div>
      </div>

      <Button
        type="submit"
        size="lg"
        className="h-11 w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Logging in..." : "Log in"}
      </Button>
    </form>
  );
}