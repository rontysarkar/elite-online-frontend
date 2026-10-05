import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

function getPageNumbers(current: number, total: number) {
  const start = Math.max(1, Math.min(current - 2, total - 4));
  const end = Math.min(total, start + 4);
  const pages: number[] = [];
  for (let i = start; i <= end; i++) pages.push(i);
  return pages;
}

interface PaginationProps {
  meta: PaginationMeta;
  label: string;
  onPageChange: (page: number) => void;
}

export function Pagination({ meta, label, onPageChange }: PaginationProps) {
  if (meta.total <= 0) return null;

  const from = (meta.page - 1) * meta.limit + 1;
  const to = Math.min(meta.page * meta.limit, meta.total);

  return (
    <div className="flex flex-col items-center justify-between gap-3 border-t border-border p-4 sm:flex-row">
      <p className="text-sm text-muted-foreground">
        Showing{" "}
        <span className="font-semibold text-foreground">
          {from}–{to}
        </span>{" "}
        of <span className="font-semibold text-foreground">{meta.total}</span>{" "}
        {label}
      </p>

      {meta.totalPage > 1 && (
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            aria-label="Previous page"
            disabled={meta.page <= 1}
            onClick={() => onPageChange(meta.page - 1)}
          >
            <ChevronLeft className="size-4" />
          </Button>

          {getPageNumbers(meta.page, meta.totalPage).map((n) => (
            <Button
              key={n}
              variant={n === meta.page ? "default" : "outline"}
              size="icon"
              aria-current={n === meta.page ? "page" : undefined}
              onClick={() => onPageChange(n)}
            >
              {n}
            </Button>
          ))}

          <Button
            variant="outline"
            size="icon"
            aria-label="Next page"
            disabled={meta.page >= meta.totalPage}
            onClick={() => onPageChange(meta.page + 1)}
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      )}
    </div>
  );
}