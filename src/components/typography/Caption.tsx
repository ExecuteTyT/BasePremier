import type { ElementType, ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/cn";

type Props<T extends ElementType = "span"> = {
  as?: T;
  className?: string;
  children: React.ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

export function Caption<T extends ElementType = "span">({
  as,
  className,
  children,
  ...rest
}: Props<T>) {
  const Tag = (as ?? "span") as ElementType;
  return (
    <Tag className={cn("font-sans text-caption leading-normal text-fg-muted", className)} {...rest}>
      {children}
    </Tag>
  );
}
