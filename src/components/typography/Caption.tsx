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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Tag = (as ?? "span") as any;
  return (
    <Tag className={cn("font-sans text-caption leading-normal text-fg-muted", className)} {...rest}>
      {children}
    </Tag>
  );
}
