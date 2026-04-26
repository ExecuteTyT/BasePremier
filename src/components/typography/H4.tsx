import type { ElementType, ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/cn";

type Props<T extends ElementType = "h4"> = {
  as?: T;
  className?: string;
  children: React.ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

export function H4<T extends ElementType = "h4">({ as, className, children, ...rest }: Props<T>) {
  const Tag = (as ?? "h4") as ElementType;
  return (
    <Tag
      className={cn(
        "font-display text-display-sm leading-snug tracking-normal text-fg-primary",
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
