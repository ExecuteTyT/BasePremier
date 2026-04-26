import type { ElementType, ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/cn";

type Props<T extends ElementType = "h3"> = {
  as?: T;
  className?: string;
  children: React.ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

export function H3<T extends ElementType = "h3">({ as, className, children, ...rest }: Props<T>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Tag = (as ?? "h3") as any;
  return (
    <Tag
      className={cn(
        "font-display text-display-md leading-tight tracking-tight text-fg-primary",
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
