import React from "react"
import styles from "../components.module.css";

const badgeVariants = {
  default: styles.badgeDefault,
  secondary: styles.badgeSecondary,
  destructive: styles.badgeDestructive,
  outline: styles.badgeOutline,
}

function Badge({ className, variant = "default", ...props }) {
  const variantClass = badgeVariants[variant] || badgeVariants.default
  return (
    <div className={`${styles.badge} ${variantClass} ${className}`} {...props} />
  )
}

export { Badge }