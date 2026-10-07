import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ALL } from "@/constant";
import { FilterItem } from "@/types/customers-types";
import { cn } from "@/utils/cn";

export function FilterSelect({
  label,
  value,
  items,
  onChange,
  className,
}: {
  label: string;
  value: string;
  items: FilterItem[];
  onChange: (value: string) => void;
  className?: string;
}) {
  return (
    <Select
      items={items}
      value={value}
      onValueChange={(next) => onChange(next ?? ALL)}
    >
      <SelectTrigger
        aria-label={label}
        className={cn("h-10 w-full", className)}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent
        alignItemWithTrigger={false}
        className="border border-border bg-popover shadow-lg"
      >
        {items.map((item) => (
          <SelectItem
            key={item.value}
            value={item.value}
            className="cursor-pointer"
          >
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}