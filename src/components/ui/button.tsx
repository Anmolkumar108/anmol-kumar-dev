import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:-translate-y-0.5 hover:shadow-[0_0_30px_color-mix(in_oklab,var(--signal)_40%,transparent)] hover:bg-primary/90",
        signal:
          "rounded-none bg-primary text-primary-foreground font-mono uppercase tracking-widest shadow-signal hover:-translate-y-0.5 hover:shadow-[0_0_42px_color-mix(in_oklab,var(--signal)_60%,transparent)] hover:brightness-110",
        terminal:
          "rounded-none border border-border bg-transparent text-foreground font-mono uppercase tracking-widest shadow-none hover:-translate-y-0.5 hover:border-primary hover:bg-primary/10 hover:text-primary hover:shadow-[0_0_34px_color-mix(in_oklab,var(--signal)_35%,transparent)]",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:-translate-y-0.5 hover:shadow-[0_0_30px_color-mix(in_oklab,var(--destructive)_40%,transparent)] hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:-translate-y-0.5 hover:border-primary/60 hover:bg-primary/5 hover:text-primary hover:shadow-[0_0_24px_color-mix(in_oklab,var(--signal)_25%,transparent)]",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:-translate-y-0.5 hover:shadow-[0_0_24px_color-mix(in_oklab,var(--signal)_25%,transparent)] hover:bg-secondary/80",
        ghost:
          "hover:-translate-y-0.5 hover:bg-primary/10 hover:text-primary hover:shadow-[0_0_24px_color-mix(in_oklab,var(--signal)_25%,transparent)]",
        link: "text-primary underline-offset-4 transition-all duration-300 hover:underline hover:-translate-y-0.5",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
        command: "h-12 px-6 text-xs",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
