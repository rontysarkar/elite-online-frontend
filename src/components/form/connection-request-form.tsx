"use client";
import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ConnectionRequestSchema, TConnectionRequestValues } from "@/validation";
import { getErrorMessage, normalizePhone } from "@/helper";
import { IApiResponse, IArea, IInternetPackage } from "@/types";
import { useGetAreas, useGetPackages, useSendConnectionRequest } from "@/hooks";
import { toast } from "../ui/toast";
import { useRouter } from "next/navigation";

export function ConnectionRequestForm() {
  const { data: areasData } = useGetAreas();
  const { data: packagesData } = useGetPackages();
  const { mutate: sendConnectionRequest, isPending: isSubmitting } =
    useSendConnectionRequest();
  const router = useRouter();

  const AREAS: IArea[] = areasData || [];
  const PACKAGES: IInternetPackage[] = packagesData || [];

  const areaItems = AREAS.map((area) => ({ value: area.id, label: area.name }));
  const packageItems = PACKAGES.map((pkg) => ({
    value: pkg.id,
    label: `${pkg.name} · ${pkg.speed} · ৳${pkg.price}/mo`,
  }));

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      areaId: "",
      packageId: "",
    } as TConnectionRequestValues,
    validators: {
      onChange: ConnectionRequestSchema,
    },
    onSubmit: async ({ value }) => {
      const payload = {
        name: value.name.trim(),
        email: value.email,
        phone: normalizePhone(value.phone.trim()),
        address: value.address.trim(),
        areaId: value.areaId,
        packageId: value.packageId,
      };

      sendConnectionRequest(payload, {
        onSuccess: (res) => {
          if (!res.success) {
            toast.add({
              title: "Connection request failed",
              description: "Something went wrong. Please try again.",
              type: "error",
            });
            return;
          }

          toast.add({
            title: "Connection request successful",
            description:
              "Send Verification Code to your Email, Please Verify Your Email Address",
            type: "success",
          });

          const params = new URLSearchParams({ email: value.email });
          router.push(`/request-connection/verify-email?${params.toString()}`);
        },
        onError: (res) => {
          console.log(res)
          toast.add({
            title: "Connection request failed",
            description: "this Email Or Phone Number Already Exist",
            type: "error",
          });
        },
      });
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="space-y-4"
    >
      <form.Field name="name">
        {(field) => {
          const showError =
            field.state.meta.isTouched && field.state.meta.errors.length > 0;

          return (
            <div className="space-y-2">
              <Label htmlFor={field.name}>Full name</Label>
              <Input
                id={field.name}
                name={field.name}
                autoComplete="name"
                placeholder="e.g. Ayesha Karim"
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

      <div className="grid gap-4 sm:grid-cols-2">
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

        <form.Field name="phone">
          {(field) => {
            const showError =
              field.state.meta.isTouched && field.state.meta.errors.length > 0;

            return (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Phone number</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="01XXX-XXXXXX"
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
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <form.Field name="areaId">
          {(field) => {
            const showError =
              field.state.meta.isTouched && field.state.meta.errors.length > 0;

            return (
              <div className="space-y-2">
                <Label>Area</Label>
                <Select
                  items={areaItems}
                  value={field.state.value || null}
                  onValueChange={(value) => {
                    field.handleChange(value ?? "");
                    field.handleBlur();
                  }}
                >
                  <SelectTrigger
                    aria-invalid={showError}
                    className="h-11 w-full"
                  >
                    <SelectValue placeholder="Select area" />
                  </SelectTrigger>

                  <SelectContent
                    alignItemWithTrigger={false}
                    className="border border-border bg-popover p-1.5 shadow-lg"
                  >
                    {AREAS.map((area) => (
                      <SelectItem
                        className="mb-1.5 cursor-pointer rounded-lg border border-border px-3 py-2.5 last:mb-0"
                        key={area.id}
                        value={area.id}
                      >
                        {area.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {showError && (
                  <p className="text-sm text-destructive">
                    {getErrorMessage(field.state.meta.errors[0])}
                  </p>
                )}
              </div>
            );
          }}
        </form.Field>

        <form.Field name="packageId">
          {(field) => {
            const showError =
              field.state.meta.isTouched && field.state.meta.errors.length > 0;

            return (
              <div className="space-y-2">
                <Label>Package</Label>
                <Select
                  items={packageItems}
                  value={field.state.value || null}
                  onValueChange={(value) => {
                    field.handleChange(value ?? "");
                    field.handleBlur();
                  }}
                >
                  <SelectTrigger
                    aria-invalid={showError}
                    className="h-11 w-full"
                  >
                    <SelectValue placeholder="Select package" />
                  </SelectTrigger>
                  <SelectContent
                    className="border border-border bg-popover p-1.5 shadow-lg"
                    alignItemWithTrigger={false}
                  >
                    {PACKAGES.map((pkg) => (
                      <SelectItem
                        className="mb-1.5 cursor-pointer rounded-lg border border-border px-3 py-2.5 last:mb-0"
                        key={pkg.id}
                        value={pkg.id}
                      >
                        {pkg.name} · {pkg.speed} · ৳{pkg.price}/mo
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {showError && (
                  <p className="text-sm text-destructive">
                    {getErrorMessage(field.state.meta.errors[0])}
                  </p>
                )}
              </div>
            );
          }}
        </form.Field>
      </div>

      <form.Field name="address">
        {(field) => {
          const showError =
            field.state.meta.isTouched && field.state.meta.errors.length > 0;

          return (
            <div className="space-y-2">
              <Label htmlFor={field.name}>Address</Label>
              <Input
                id={field.name}
                name={field.name}
                autoComplete="street-address"
                placeholder="House, road, sector, landmark..."
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
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit Request"}
      </Button>

      <p className="text-center text-xs text-muted-foreground">
        No payment needed now — installation is free on all plans.
      </p>
    </form>
  );
}
