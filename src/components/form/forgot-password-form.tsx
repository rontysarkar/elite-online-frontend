"use client";

import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { forgotPasswordSchema, ForgotPasswordValues } from "@/validation";
import { getErrorMessage } from "@/helper";
import { useForgotPassword } from "@/hooks";
import { toast } from "../ui/toast";
import { useRouter } from "next/navigation";

export function ForgotPasswordForm() {
  const { mutate: forgotPassword, isPending } = useForgotPassword();
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      email: "",
    } as ForgotPasswordValues,
    validators: {
      onChange: forgotPasswordSchema,
    },
    onSubmit: ({ value }) => {
      const payload = {
        email: value.email.trim(),
      };

      forgotPassword(payload, {
        onSuccess: () => {
          toast.add({
            title: "OTP sent",
            description:
              "OTP has been sent to your email. Please check and verify.",
            type: "success",
          });
          const params = new URLSearchParams({ email: payload.email });
          router.push(`/reset-password?${params.toString()}`);
        },
        onError: () => {
          toast.add({
            title: "Error",
            description: "Email Doesn't Exist",
            type: "error",
          });
        },
      });
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
                type="email"
                autoComplete="email"
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

      <Button
        type="submit"
        size="lg"
        className="h-11 w-full"
        disabled={isPending}
      >
        {isPending ? "Sending..." : "Send"}
      </Button>
    </form>
  );
}
