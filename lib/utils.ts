import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateBarcode(): string {
  // Example of generating a 12-digit barcode value
  const projectPrefix = "26453"; // Example project identifier
  const uniqueNumber = new Date().getTime().toString().slice(-6); // Use current timestamp for uniqueness

  return projectPrefix + uniqueNumber;
}