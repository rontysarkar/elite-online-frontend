
import Link from "next/link";
import { SearchX } from "lucide-react";
import { GoBackButton } from "@/components/global/not-found-action";



export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6">
      <div className="w-full max-w-lg text-center">
        <span className="mx-auto flex size-16 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <SearchX className="size-8" />
        </span>

        <p className="mt-6 text-7xl font-bold tracking-tight text-primary sm:text-8xl">
          404
        </p>

        <h1 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Page not found
        </h1>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
          Sorry, we couldn&apos;t find the page you are looking for. It may have
          been moved, or the link might be wrong.
        </p>

        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-center">
          <GoBackButton />
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}