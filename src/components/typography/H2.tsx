import type { ElementType, ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/cn";

type Props<T extends ElementType = "h2"> = {
  as?: T;
  className?: string;
  children: React.ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

export function H2<T extends ElementType = "h2">({ as, className, children, ...rest }: Props<T>) {
  const Tag = (as ?? "h2") as ElementType;
  return (
    <Tag
      className={cn(
        "font-display text-display-lg leading-tight tracking-tight text-fg-primary",
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
