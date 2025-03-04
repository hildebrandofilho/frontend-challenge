import React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import styles from "../components.module.css";

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef(function AccordionItem({ className, ...props }, ref) {
  return (
    <AccordionPrimitive.Item
      ref={ref}
      className={`${styles.accordionItem} ${className}`}
      {...props}
    />
  )
})
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef(function AccordionTrigger({ className, children, ...props }, ref) {
  return (
    <AccordionPrimitive.Header className={styles.accordionTrigger}>
      <AccordionPrimitive.Trigger
        ref={ref}
        className={`${styles.accordionTrigger} ${className}`}
        {...props}
      >
        {children}
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="10" viewBox="0 0 18 10" fill="none">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M2.41414 9C2.02361 9.39053 1.39045 9.39053 0.999924 9C0.6094 8.60948 0.6094 7.97631 0.999926 7.58579L8.29282 0.292892C8.68334 -0.0976315 9.31651 -0.0976305 9.70703 0.292893L16.9999 7.58579C17.3904 7.97631 17.3904 8.60948 16.9999 9C16.6094 9.39053 15.9762 9.39053 15.5857 9L9.70703 3.12132C9.31651 2.7308 8.68334 2.7308 8.29282 3.12132L2.41414 9Z" fill="#4F372F"/>
        </svg>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
})
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef(function AccordionContent({ className, children, ...props }, ref) {
  return (
    <AccordionPrimitive.Content
      ref={ref}
      className={`${styles.accordionContent} ${className}`}
      {...props}
    >
      <div className={`${styles.contentInner} ${className}`}>{children}</div>
    </AccordionPrimitive.Content>
  )
})
AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }