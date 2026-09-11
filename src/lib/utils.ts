import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function pad(n: number, width = 4) {
  return String(n).padStart(width, "0");
}

export function formatInt(n: number) {
  return new Intl.NumberFormat("en-IN").format(n);
}
