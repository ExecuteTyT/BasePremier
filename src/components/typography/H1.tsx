import type { ElementType, ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/cn";

type Props<T extends ElementType = "h1"> = {
  as?: T;
  className?: string;
  children: React.ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

export function H1<T extends ElementType = "h1">({ as, className, children, ...rest }: Props<T>) {
  const Tag = (as ?? "h1") as ElementType;
  return (
    <Tag
      className={cn(
        "font-display text-display-xl leading-display tracking-display text-fg-primary",
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
