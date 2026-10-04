"use client";

import * as React from "react";
import { useForm } from "@tanstack/react-form";
import { Eye, EyeOff, KeyRound } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import OtpInput from "./otp-input";
import { getErrorMessage, maskEmail } from "@/helper";
import { resetPasswordSchema, ResetPasswordValues } from "@/validation";
import { useResetPassword } from "@/hooks";
import { toast } from "../ui/toast";


export function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = React.useState(false);
  
  const {mutate: resetPassword,isPending} = useResetPassword();

  const email = searchParams.get("email") || "";

  React.useEffect(() => {
    if (!email) {
      router.push("/forgot-password");
    }
  }, [email, router]);

  const form = useForm({
    defaultValues: {
      otp: "",
      password: "",
    } as ResetPasswordValues,
    validators: {
      onChange: resetPasswordSchema,
    },
    onSubmit: async ({ value }) => {
      const payload = {
        email,
        otp: value.otp,
        new_password: value.password,
      };

      resetPassword(payload, {
        onSuccess: () => {
          toast.add({
            title: "Password reset",
            description: "Password has been reset successfully",
            type: "success",
          });
          router.push("/login");
        },
        onError: () => {
          toast.add({
            title: "Error",
            description: "Invalid OTP",
            type: "error",
          });
        },
      });

    },
  });

  return (
    <>
      <div className="space-y-3 text-center">
        <span className="mx-auto flex size-14 items-center justify-center rounded-xl bg-secondary text-primary">
          <KeyRound className="size-6" />
        </span>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Reset password
        </h1>
        <p className="text-sm leading-6 text-muted-foreground">
          {email ? (
            <>
              Enter the 6-digit code we sent to{" "}
              <span className="font-semibold text-foreground">
                {maskEmail(email)}
              </span>{" "}
              and choose a new password.
            </>
          ) : (
            "Enter the code we sent to your email and choose a new password."
          )}
        </p>
      </div>

      <form
        noValidate
        autoComplete="off"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="mt-8 space-y-4"
      >

        <form.Field name="otp">
          {(field) => {
            const showError =
              field.state.meta.isTouched && field.state.meta.errors.length > 0;

            return (
              <div className="space-y-2">
                <Label>Verification code</Label>
                <OtpInput
                  value={field.state.value}
                  onChange={(value: string) => {
                    field.handleChange(value);
                    field.handleBlur();
                  }}
                  length={6}
                  invalid={showError}
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
                <Label htmlFor={field.name}>New password</Label>
                <div className="relative">
                  <Input
                    id={field.name}
                    name={field.name}
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Enter your new password"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={showError}
                    className="h-11 pr-11"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
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

        <form.Subscribe selector={(state) => state.isSubmitting}>
          {(isSubmitting) => (
            <Button
              type="submit"
              size="lg"
              className="h-11 w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Resetting..." : "Reset password"}
            </Button>
          )}
        </form.Subscribe>
      </form>
    </>
  );
}