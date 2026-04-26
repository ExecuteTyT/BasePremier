import NextLink from "next/link";
import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/cn";

type Props = ComponentPropsWithoutRef<typeof NextLink> & {
  className?: string;
};

export function Link({ className, children, ...rest }: Props) {
  return (
    <NextLink
      className={cn(
        "relative inline-block font-sans text-fg-primary",
        "after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-current",
        "after:transition-[width] after:duration-base",
        "hover:after:w-full",
        "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fg-primary",
        className,
      )}
      {...rest}
    >
      {children}
    </NextLink>
  );
}
