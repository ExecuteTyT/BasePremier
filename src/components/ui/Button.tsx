import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-accent-fg hover:bg-accent-hover hover:-translate-y-px focus-visible:outline-fg-primary",
  secondary:
    "border border-border-strong bg-transparent text-fg-primary hover:bg-bg-tertiary focus-visible:outline-fg-primary",
  ghost: "bg-transparent text-fg-secondary hover:text-fg-primary focus-visible:outline-fg-primary",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-5 py-2 text-sm",
  md: "px-6 py-3.5 text-body",
  lg: "px-7 py-4 text-body-lg",
};

type Props = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  disabled,
  ...rest
}: Props) {
  return (
    <button
      disabled={disabled}
      className={cn(
        "inline-flex cursor-pointer items-center justify-center rounded-none font-sans font-medium tracking-tight",
        "transition-[background-color,color,transform] duration-base",
        "focus-visible:outline-2 focus-visible:outline-offset-4",
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:pointer-events-none",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
