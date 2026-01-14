import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[#0097D7] text-white hover:bg-[#0077B6] active:bg-[#005795] transition-all duration-200",
        secondary: "bg-[#0A0F29] text-white hover:bg-[#1A1F3A] active:bg-[#070A1C] transition-all duration-200",
        accent: "bg-[#56BDA3] text-white hover:bg-[#3FA085] active:bg-[#2D8A6F] transition-all duration-200",
        outline: "border-2 border-[#0097D7] text-[#0097D7] hover:bg-[#0097D7]/10 active:bg-[#0097D7]/20 transition-all duration-200",
        ghost: "hover:bg-pearl-200 active:bg-pearl-200 transition-all duration-200",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

