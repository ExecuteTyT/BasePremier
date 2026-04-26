import type { ElementType, ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/cn";

type Size = "h3" | "h4" | "body";

const sizeClasses: Record<Size, string> = {
  h3: "text-h3",
  h4: "text-h4",
  body: "text-body",
};

type Props<T extends ElementType = "span"> = {
  as?: T;
  size?: Size;
  className?: string;
  children: React.ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "size" | "className" | "children">;

export function Mono<T extends ElementType = "span">({
  as,
  size = "body",
  className,
  children,
  ...rest
}: Props<T>) {
  const Tag = (as ?? "span") as ElementType;
  return (
    <Tag
      className={cn("font-mono tabular-nums text-fg-primary", sizeClasses[size], className)}
      {...rest}
    >
      {children}
    </Tag>
  );
}
