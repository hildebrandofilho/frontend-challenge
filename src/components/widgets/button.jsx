import React, { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import styles from "../components.module.css";

const buttonVariants = {
  default: styles.buttonDefault,
  destructive: styles.buttonDestructive,
  outline: styles.buttonOutline,
  secondary: styles.buttonSecondary,
  ghost: styles.buttonGhost,
  link: styles.buttonLink,
};

const sizeVariants = {
  default: styles.sizeDefault,
  sm: styles.sizeSm,
  lg: styles.sizeLg,
  icon: styles.sizeIcon,
};

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Button = forwardRef(({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  const variantClass = buttonVariants[variant] || buttonVariants.default;
  const sizeClass = sizeVariants[size] || sizeVariants.default;

  return (
    <Comp
      className={cn(styles.button, variantClass, sizeClass, className)}
      ref={ref}
      {...props}
    />
  );
});

Button.displayName = "Button";

export { Button };
