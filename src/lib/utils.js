import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines and merges class names using clsx and tailwind-merge
 * This is a utility function used by the UI components
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
