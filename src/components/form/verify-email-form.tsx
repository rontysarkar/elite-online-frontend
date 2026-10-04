"use client";

import { useEffect, useState } from "react";
import { MailCheck } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";

import { Button } from "../ui/button";

import { Spinner } from "../ui/spinner";
import OtpInput from "./otp-input";
import { formatTime, getErrorMessage, maskEmail } from "@/helper";
import { useResendEmailVerify, useVerifyEmail } from "@/hooks";
import { toast } from "../ui/toast";

const OTP_LENGTH = 6;
const RESEND_SECONDS = 5 ;

export const verifyEmailSchema = z.object({
  otp: z
    .string()
    .regex(/^\d+$/, "Code must contain only numbers")
    .length(
      OTP_LENGTH,
      `Enter the ${OTP_LENGTH}-digit code we sent to your email.`,
    ),
});

export type VerifyEmailValues = z.infer<typeof verifyEmailSchema>;

export default function VerifyEmailForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);

  const { mutate: verifyEmail, isPending } = useVerifyEmail();
  const { mutate: resendEmailVerify, isPending: isPendingResend } =
    useResendEmailVerify();

  const email = searchParams.get("email") || "";

  useEffect(() => {
    if (!email) {
      router.push("/request-connection");
    }
  }, [email, router]);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft]);

  const handleChange = (value: string) => {
    setOtp(value);
    if (error) setError("");
  };

  const handleSubmit = () => {
    const result = verifyEmailSchema.safeParse({ otp });
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    const payload = { email, otp: Number(result.data.otp) };

    verifyEmail(payload, {
      onSuccess: () => {
        toast.add({
          title: "Verification Successful",
          description:
            "You have successfully verified your email address.Our team will contact you shortly.",
          type: "success",
        });
        router.push("/");
      },
      onError: (error) => {
        console.log(error);
        toast.add({
          title: "Verification Failed",
          description: "OTP code is invalid OR Expired. Please try again.",
          type: "error",
        });
      },
    });
  };

  const handleResend = async () => {
    setOtp("");
    setError("");
    setSecondsLeft(RESEND_SECONDS);
    const payload = { email };
    resendEmailVerify(payload, {
      onSuccess: () => {
        toast.add({
          title: "New Verification Code Sent",
          description: "We sent a new verification code to your email address.",
          type: "success",
        });
      },
      onError: (error) => {
        toast.add({
          title: "Verification Failed",
          description: "Something went wrong. Please try again.",
          type: "error",
        });
        router.push("/request-connection");
      },
    });
  };

  return (
    <>
      <span className="mx-auto flex size-14 items-center justify-center rounded-xl bg-secondary text-primary">
        <MailCheck className="size-6" />
      </span>

      <h1 className="mt-6 font-heading text-3xl font-bold tracking-tight text-foreground">
        Verify Your Email
      </h1>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        {email ? (
          <>
            We sent a {OTP_LENGTH}-digit code to{" "}
            <span className="font-semibold text-foreground">
              {maskEmail(email)}
            </span>
            .
          </>
        ) : (
          "We sent a verification code to your email address."
        )}
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleSubmit();
        }}
        className="mt-8"
        noValidate
        autoComplete="off"
      >
        <p className="text-left text-sm font-semibold text-foreground">
          Verification code
        </p>
        <div className="mt-3">
          <OtpInput
            value={otp}
            onChange={handleChange}
            length={OTP_LENGTH}
            invalid={Boolean(error)}
          />
        </div>
        {error && (
          <p role="alert" className="mt-2 text-left text-sm text-destructive">
            {error}
          </p>
        )}

        <Button
          type="submit"
          disabled={isPending}
          className="mt-7 h-12 w-full text-sm font-semibold"
        >
          {isPending ? <Spinner /> : <>Verify Email</>}
        </Button>
      </form>

      <div className="mt-7 border-t border-border pt-6">
        <p className="text-sm text-muted-foreground">
          Didn&apos;t receive the code?
        </p>

        {secondsLeft > 0 ? (
          <p
            className="mt-3 text-sm font-semibold text-muted-foreground"
            aria-live="polite"
          >
            Resend in {formatTime(secondsLeft)}
          </p>
        ) : (
          <button
            type="button"
            onClick={handleResend}
            disabled={isPendingResend}
            className="mt-3 text-sm font-semibold text-primary hover:underline disabled:opacity-50"
          >
            Resend Code
          </button>
        )}
      </div>
    </>
  );
}
