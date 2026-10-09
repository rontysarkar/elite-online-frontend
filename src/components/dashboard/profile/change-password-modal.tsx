"use client";

import * as React from "react";
import { useForm } from "@tanstack/react-form";
import { Eye, EyeOff, KeyRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getErrorMessage } from "@/helper";
import { changePasswordSchema, ChangePasswordValues } from "@/validation";
import { useChangePassword } from "@/hooks";
import { toast } from "@/components/ui/toast";



interface PasswordFieldApi {
  name: string;
  state: {
    value: string;
    meta: { isTouched: boolean; errors: unknown[] };
  };
  handleBlur: () => void;
  handleChange: (value: string) => void;
}

function PasswordField({
  field,
  label,
  placeholder,
  autoComplete,
  hint,
}: {
  field: PasswordFieldApi;
  label: string;
  placeholder: string;
  autoComplete: string;
  hint?: string;
}) {
  const [visible, setVisible] = React.useState(false);
  const id = `change-password-${field.name}`;
  const showError =
    field.state.meta.isTouched && field.state.meta.errors.length > 0;

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Input
          id={id}
          name={field.name}
          type={visible ? "text" : "password"}
          autoComplete={autoComplete}
          placeholder={placeholder}
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
          aria-invalid={showError}
          className="h-11 pr-11"
        />
        <button
          type="button"
          onClick={() => setVisible((prev) => !prev)}
          aria-label={visible ? "Hide password" : "Show password"}
          className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
        >
          {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      </div>
      {showError ? (
        <p className="text-sm text-destructive">
          {getErrorMessage(field.state.meta.errors[0])}
        </p>
      ) : (
        hint && <p className="text-xs text-muted-foreground">{hint}</p>
      )}
    </div>
  );
}

interface ChangePasswordModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ChangePasswordModal({
  open,
  onOpenChange,
}: ChangePasswordModalProps) {


    const {mutate: changePassword,isPending:isSubmitting} = useChangePassword();

  const form = useForm({
    defaultValues: {
      current_password: "",
      new_password: "",
    } as ChangePasswordValues,
    validators: {
      onChange: changePasswordSchema,
    },
    onSubmit: async ({ value }) => {
      const payload = {
        current_password: value.current_password,
        new_password: value.new_password,
      };

      changePassword(payload, {
        onSuccess: (res) => {
          if (!res.success) {
            toast.add({
              title: "Password change failed",
              description: "Something went wrong. Please try again.",
              type: "error",
            });
             form.reset();
            onOpenChange(false);
            return;
          }

          toast.add({
            title: "Password change successful",
            description: "Password changed successfully.",
            type: "success",
          });
           form.reset();
          onOpenChange(false);
        },
        onError: () => {
          toast.add({
            title: "Password change failed",
            description: "Your password change failed. Please try again.",
            type: "error",
          });
           form.reset();
          onOpenChange(false);
          
        },
      });
    },
  });

  function handleOpenChange(next: boolean) {
    if (!next) form.reset();
    onOpenChange(next);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="flex-row items-start gap-4 text-left">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <KeyRound className="size-5" />
          </div>
          <div className="space-y-1">
            <DialogTitle className="text-2xl font-bold">
              Change password
            </DialogTitle>
            <DialogDescription>
              Enter your current password and choose a new one.
            </DialogDescription>
          </div>
        </DialogHeader>

        <form
          noValidate
          autoComplete="off"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-4"
        >
          <form.Field name="current_password">
            {(field) => (
              <PasswordField
                field={field}
                label="Current password"
                placeholder="Enter your current password"
                autoComplete="current-password"
              />
            )}
          </form.Field>

          <form.Field name="new_password">
            {(field) => (
              <PasswordField
                field={field}
                label="New password"
                placeholder="Enter your new password"
                autoComplete="new-password"
                hint="Use at least 8 characters."
              />
            )}
          </form.Field>

          <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="h-11"
                  disabled={isSubmitting}
                  onClick={() => handleOpenChange(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="lg"
                  className="h-11"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Updating..." : "Update password"}
                </Button>
              </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
