import * as React from "react";

import { cn } from "~/lib/utils";
import { GeistSans } from "geist/font/sans";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

interface ItemsSelectProps {
  id: string;
  value: string;
  onValueChange: (value: string) => void;
  items: {
    value: string;
    label: string;
  }[];
  label?: string;
  placeholder?: string;
  className?: string;
}

export default function ItemsSelect({
  id,
  value,
  onValueChange,
  items,
  label = "Values",
  placeholder = "Select value...",
  className,
}: ItemsSelectProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger id={id} className={cn(className, "w-[220px]")}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent
        // Fix for mobile tap, triggering onClick for element behind the select
        // https://github.com/shadcn-ui/ui/issues/486
        ref={(ref) => {
          if (!ref) return;
          ref.ontouchstart = (e) => {
            e.preventDefault();
          };
        }}
      >
        <SelectGroup>
          <SelectLabel className={GeistSans.className}>{label}</SelectLabel>
          {items.map((item) => (
            <SelectItem
              key={item.value}
              value={item.value}
              className={GeistSans.className}
            >
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
