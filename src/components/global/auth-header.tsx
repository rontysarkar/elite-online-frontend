import Link from "next/link";
import { Logo } from "./logo";

type HeaderProps = {
  message?: string;
  linkText?: string;
  linkHref?: string;
};

export function AuthHeader({
  message = "",
  linkText = "",
  linkHref = "",
}: HeaderProps) {
  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />
        {message && linkText && linkHref && (
          <p className="text-sm text-muted-foreground">
            {message}{" "}
            <Link href={linkHref} className="font-semibold text-primary transition-colors hover:underline">
              {linkText}
            </Link>
          </p>
        )}
      </div>
    </header>
  );
}