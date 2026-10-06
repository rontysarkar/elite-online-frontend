"use client";

import * as React from "react";
import { useForm } from "@tanstack/react-form";
import { UserPlus } from "lucide-react";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { getErrorMessage, normalizePhone } from "@/helper";
import {
  ConnectionRequestSchema,
  CreateCollectorSchema,
  TConnectionRequestValues,
} from "@/validation";
import { AreaOption, PackageOption } from "@/types/customers-types";
import { useCreateCollector, useCreateCustomer } from "@/hooks";
import { toast } from "@/components/ui/toast";

interface FormFieldApi {
  name: string;
  state: {
    value: string;
    meta: { isTouched: boolean; errors: unknown[] };
  };
  handleBlur: () => void;
  handleChange: (value: string) => void;
}

function FieldError({ field }: { field: FormFieldApi }) {
  if (!field.state.meta.isTouched || field.state.meta.errors.length === 0) {
    return null;
  }

  return (
    <p className="text-sm text-destructive">
      {getErrorMessage(field.state.meta.errors[0])}
    </p>
  );
}

function hasError(field: FormFieldApi) {
  return field.state.meta.isTouched && field.state.meta.errors.length > 0;
}

function TextField({
  field,
  label,
  placeholder,
  type = "text",
  inputMode,
  autoComplete,
}: {
  field: FormFieldApi;
  label: string;
  placeholder: string;
  type?: string;
  inputMode?: React.ComponentProps<"input">["inputMode"];
  autoComplete?: string;
}) {
  const id = `create-customer-${field.name}`;

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        name={field.name}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        aria-invalid={hasError(field)}
        className="h-11"
      />
      <FieldError field={field} />
    </div>
  );
}

interface CreateCollectorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateCollectorModal({
  open,
  onOpenChange,
}: CreateCollectorModalProps) {
  const { mutate: createCollector, isPending: isCreating } = useCreateCollector();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
    validators: {
      onChange: CreateCollectorSchema,
    },

    onSubmit: async ({ value }) => {
      const payload = {
        name: value.name.trim(),
        email: value.email,
        phone: normalizePhone(value.phone.trim()),
      };

      createCollector(payload, {
        onSuccess: (res) => {
          if (!res.success) {
            toast.add({
              title: "Collector creation failed",
              description: "Something went wrong. Please try again.",
              type: "error",
            });
            onOpenChange(false);
            return;
          }

          toast.add({
            title: "Collector creation successful",
            description: "Collector created successfully.",
            type: "success",
          });
          onOpenChange(false);
        },
        onError: () => {
          toast.add({
            title: "Collector creation failed",
            description: "Collector Already Exist",
            type: "error",
          });

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
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
        <DialogHeader className="flex-row items-start gap-4 text-left">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <UserPlus className="size-5" />
          </div>
          <div className="space-y-1">
            <DialogTitle className="text-2xl font-bold">
              Create customer
            </DialogTitle>
            <DialogDescription>
              Add a new customer with their area and package.
            </DialogDescription>
          </div>
        </DialogHeader>

        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-4"
        >
          <form.Field name="name">
            {(field) => (
              <TextField
                field={field}
                label="Full name"
                placeholder="e.g. Ayesha Karim"
                autoComplete="name"
              />
            )}
          </form.Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <form.Field name="email">
              {(field) => (
                <TextField
                  field={field}
                  label="Email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              )}
            </form.Field>

            <form.Field name="phone">
              {(field) => (
                <TextField
                  field={field}
                  label="Phone number"
                  type="tel"
                  inputMode="tel"
                  placeholder="01XXX-XXXXXX"
                  autoComplete="tel"
                />
              )}
            </form.Field>
          </div>

          <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="h-11"
              disabled={isCreating}
              onClick={() => handleOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="lg"
              className="h-11"
              disabled={isCreating}
            >
              {isCreating ? "Creating..." : "Create collector"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
