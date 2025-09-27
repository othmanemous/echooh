import * as React from "react";
import { cn } from "@/modules/auth/utils/utils"; 

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, variant = "default", isLoading, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
          variant === "default" &&
            "bg-[#2E2D4D] text-white hover:bg-[#3E3D5D] focus:ring-[#2E2D4D]",
          variant === "outline" &&
            "border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 focus:ring-gray-300",
          variant === "ghost" &&
            "bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-200",
          className
        )}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading && (
          <span className="mr-2 h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
