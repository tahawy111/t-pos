import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        sky: "bg-sky-500 text-white hover:bg-sky-600 focus-visible:outline-sky-600",
        rose: "bg-rose-500 text-white hover:bg-rose-600 focus-visible:outline-rose-600",
        success: "bg-[#198754] text-white hover:bg-[#157347] focus-visible:outline-[#157347]",
        warning: "bg-[#ffc107] text-white hover:bg-[#ffca2c] focus-visible:outline-[#ffca2c]",
        info: "bg-[#0dcaf0] text-white hover:bg-[#31d2f2] focus-visible:outline-[#31d2f2]",
        skyOutline: "bg-transparent text-sky-500 hover:text-white hover:bg-sky-600 border-[0.15em] border-sky-600 focus-visible:outline-sky-600",
        roseOutline: "bg-transparent hover:bg-rose-500 text-rose-500 hover:text-white border-[0.15em] border-rose-500 focus-visible:outline-rose-600",
        successOutline: "bg-transparent hover:bg-[#198754] text-[#198754] hover:text-white border-[0.15em] border-[#198754] hover:bg-[#157347] focus-visible:outline-[#157347]",
        warningOutline: "bg-transparent hover:bg-[#ffc107] text-[#ffc107] hover:text-white border-[0.15em] border-[#ffc107] hover:bg-[#ffca2c] focus-visible:outline-[#ffca2c]",
        infoOutline: "bg-transparent hover:bg-[#0dcaf0] text-[#0dcaf0] hover:text-white border-[0.15em] border-[#0dcaf0] hover:bg-[#31d2f2] focus-visible:outline-[#31d2f2]",
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
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
