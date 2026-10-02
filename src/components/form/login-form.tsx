"use client";
import * as React from "react";
import Link from "next/link";
import { useForm } from "@tanstack/react-form";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginSchema } from "@/validation";
import { useLogin } from "@/hooks";
import { toast } from "../ui/toast";

function getErrorMessage(error: unknown): string {
  if (typeof error === "string") return error;
  if (error && typeof error === "object" && "message" in error) {
    return String((error as { message: unknown }).message);
  }
  return "Invalid value";
}

export function LoginForm() {
  const [showPassword, setShowPassword] = React.useState(false);

  const {mutate:login,isPending:isSubmitting} = useLogin();

  const form = useForm({
    defaultValues: {
      email: "admin@gmail.com",
      password: "12345678",
    },
    validators: {
      onChange: loginSchema,
    },
    onSubmit: ({ value }) => {
      const payload = {
        email: value.email,
        password: value.password,
      };
      if (isSubmitting) {
        return;
      }
      login(payload,{
        onSuccess: () => {
          toast.add({
            title: "Login successful",
            description: "You have successfully logged in.",
            type: "success",
          });
        },
        onError: () => {
          toast.add({
            title: "Login failed",
            description: "Please check your credentials and try again.",
            type: "error",
          });
        },
      })
    },
  });

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="space-y-4"
    >

      <form.Field name="email">
        {(field) => {
          const showError =
            field.state.meta.isTouched && field.state.meta.errors.length > 0;

          return (
            <div className="space-y-2">
              <Label htmlFor={field.name}>Email</Label>
              <Input
                id={field.name}
                name={field.name}
                autoComplete="username"
                placeholder="you@example.com"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                aria-invalid={showError}
                className="h-11"
              />
              {showError && (
                <p className="text-sm text-destructive">
                  {getErrorMessage(field.state.meta.errors[0])}
                </p>
              )}
            </div>
          );
        }}
      </form.Field>

      <form.Field name="password">
        {(field) => {
          const showError =
            field.state.meta.isTouched && field.state.meta.errors.length > 0;

          return (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor={field.name}>Password</Label>
                <Link
                  href="/forgot-password"
                  className="text-sm font-medium text-primary transition-colors hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id={field.name}
                  name={field.name}
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={showError}
                  className={`h-11 pr-11 ${showError ? "border-red-500" : ""}`}
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
              {showError && (
                <p className="text-sm text-destructive">
                  {getErrorMessage(field.state.meta.errors[0])}
                </p>
              )}
            </div>
          );
        }}
      </form.Field>

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