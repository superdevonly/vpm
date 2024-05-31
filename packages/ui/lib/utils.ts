import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatAddress = (addr: string | undefined) => {
  return `${addr?.substring(0, 4)}...${addr?.substring(addr.length - 4)}`;
};