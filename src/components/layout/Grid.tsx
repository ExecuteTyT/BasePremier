import type { ElementType, ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/cn";

type Cols = 4 | 6 | 12;

const colClasses: Record<Cols, string> = {
  4: "grid-cols-4",
  6: "grid-cols-4 md:grid-cols-6",
  12: "grid-cols-4 md:grid-cols-6 xl:grid-cols-12",
};

type Props<T extends ElementType = "div"> = {
  as?: T;
  cols?: Cols;
  className?: string;
  children: React.ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "cols" | "className" | "children">;

export function Grid<T extends ElementType = "div">({
  as,
  cols = 12,
  className,
  children,
  ...rest
}: Props<T>) {
  const Tag = (as ?? "div") as ElementType;
  return (
    <Tag className={cn("grid gap-4 md:gap-6", colClasses[cols], className)} {...rest}>
      {children}
    </Tag>
  );
}
