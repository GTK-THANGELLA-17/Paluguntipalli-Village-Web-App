
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-heritage text-white hover:bg-heritage-dark dark:bg-[#000000] dark:text-white",
        destructive: "bg-red-500 text-white hover:bg-red-600 dark:text-white",
        outline: "border-2 border-heritage text-heritage bg-white hover:bg-heritage hover:text-white dark:border-white dark:text-white dark:hover:bg-[#000000]",
        secondary: "bg-green-600 text-white hover:bg-green-700 dark:bg-[#000000] dark:text-white",
        ghost: "text-[#000000] hover:bg-heritage/10 hover:text-heritage-dark dark:text-white dark:hover:bg-white/10 dark:hover:text-white",
        link: "text-heritage underline-offset-4 hover:underline hover:text-heritage-dark dark:text-white dark:hover:text-white",
        nature: "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 dark:bg-[#000000] dark:text-white dark:from-[#000000] dark:to-[#333333]",
        sunset: "bg-gradient-to-r from-orange-400 to-pink-500 text-white hover:from-orange-500 hover:to-pink-600 dark:bg-[#000000] dark:text-white dark:from-[#000000] dark:to-[#333333]",
        earth: "bg-gradient-to-r from-brown-400 to-amber-600 text-white hover:from-brown-500 hover:to-amber-700 dark:bg-[#000000] dark:text-white dark:from-[#000000] dark:to-[#333333]",
        custom: "bg-white text-[#000000] hover:bg-gray-100 dark:bg-[#000000] dark:text-white dark:hover:bg-[#333333]",
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
