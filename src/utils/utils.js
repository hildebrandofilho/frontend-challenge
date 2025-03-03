import clsx from "clsx";

export function cn(...inputs) {
  return clsx(inputs);
}

export function currencyFormatted(ccy, value) {
  return new Intl.NumberFormat('en-US', { style: "currency", currency: ccy }).format(value);
}