"use client";

import {
  useRef,
  type ChangeEvent,
  type ClipboardEvent,
  type KeyboardEvent,
} from "react";
import { cn } from "@/lib/utils";

type OtpInputProps = {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  disabled?: boolean;
  invalid?: boolean;
};

export default function OtpInput({
  value,
  onChange,
  length = 6,
  disabled = false,
  invalid = false,
}: OtpInputProps) {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const digits = Array.from({ length }, (_, i) => value[i] ?? "");

  const focusAt = (index: number) => {
    const safeIndex = Math.max(0, Math.min(index, length - 1));
    inputsRef.current[safeIndex]?.focus();
  };

  const setDigitAt = (index: number, digit: string) => {
    const next = [...digits];
    next[index] = digit;
    onChange(next.join(""));
  };

  const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");

    if (!raw) {
      setDigitAt(index, "");
      return;
    }

    if (raw.length > 1) {
      const next = (value.slice(0, index) + raw).slice(0, length);
      onChange(next);
      focusAt(Math.min(index + raw.length, length - 1));
      return;
    }

    setDigitAt(index, raw);
    if (index < length - 1) focusAt(index + 1);
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      e.preventDefault();
      setDigitAt(index - 1, "");
      focusAt(index - 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      focusAt(index - 1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      focusAt(index + 1);
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, length);
    if (!pasted) return;
    onChange(pasted);
    focusAt(pasted.length >= length ? length - 1 : pasted.length);
  };

  return (
    // biome-ignore lint/a11y/useSemanticElements: <explanation>
<div
      role="group"
      aria-label="Verification code"
      className="grid grid-cols-6 gap-2"
    >
      {digits.map((digit, index) => (
        <input
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          key={index}
          ref={(el) => {
            inputsRef.current[index] = el;
          }}
          value={digit}
          disabled={disabled}
          inputMode="numeric"
          autoComplete={index === 0 ? "one-time-code" : "off"}
          aria-label={`Digit ${index + 1}`}
          aria-invalid={invalid}
          onChange={(e) => handleChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          onFocus={(e) => e.target.select()}
          className={cn(
            "h-12 min-w-0 rounded-lg border border-input bg-background text-center text-lg font-bold text-foreground outline-none transition-colors",
            "focus:border-ring focus:ring-2 focus:ring-ring/30",
            "disabled:cursor-not-allowed disabled:opacity-60",
            invalid && "border-destructive focus:border-destructive focus:ring-destructive/30",
          )}
        />
      ))}
    </div>
  );
}