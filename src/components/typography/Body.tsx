import type { ElementType, ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/cn";

type Size = "lg" | "md" | "sm";

const sizeClasses: Record<Size, string> = {
  lg: "text-body-lg",
  md: "text-body",
  sm: "text-body-sm",
};

type Props<T extends ElementType = "p"> = {
  as?: T;
  size?: Size;
  className?: string;
  children: React.ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "size" | "className" | "children">;

export function Body<T extends ElementType = "p">({
  as,
  size = "md",
  className,
  children,
  ...rest
}: Props<T>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Tag = (as ?? "p") as any;
  return (
    <Tag
      className={cn("font-sans leading-normal text-fg-secondary", sizeClasses[size], className)}
      {...rest}
    >
      {children}
    </Tag>
  );
}
