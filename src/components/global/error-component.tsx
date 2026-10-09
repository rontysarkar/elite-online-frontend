import { Button } from "../ui/button";


export function ErrorComponent({ refetch }: { refetch: () => void }) {
  return (
      <div className="rounded-xl border border-border bg-card p-10 text-center text-card-foreground shadow-sm">
        <p className="text-sm font-semibold text-foreground">
          Couldn&apos;t load your bills
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Something went wrong. Please try again.
        </p>
        <Button variant="outline" className="mt-4" onClick={() => refetch()}>
          Try again
        </Button>
      </div>
    );
}