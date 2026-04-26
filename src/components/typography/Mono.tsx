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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Tag = (as ?? "span") as any;
  return (
    <Tag
      className={cn("font-mono tabular-nums text-fg-primary", sizeClasses[size], className)}
      {...rest}
    >
      {children}
    </Tag>
  );
}
