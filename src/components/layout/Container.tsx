import type { ElementType, ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/cn";

type Variant = "default" | "narrow" | "wide";

const variantClasses: Record<Variant, string> = {
  default: "max-w-[1440px]",
  narrow: "max-w-[1120px]",
  wide: "max-w-[1680px]",
};

type Props<T extends ElementType = "div"> = {
  as?: T;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "variant" | "className" | "children">;

export function Container<T extends ElementType = "div">({
  as,
  variant = "default",
  className,
  children,
  ...rest
}: Props<T>) {
  const Tag = (as ?? "div") as ElementType;
  return (
    <Tag
      className={cn("mx-auto w-full px-4 md:px-6 xl:px-8", variantClasses[variant], className)}
      {...rest}
    >
      {children}
    </Tag>
  );
}
