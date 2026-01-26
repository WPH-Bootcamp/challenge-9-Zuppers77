import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import dayjs from "dayjs"
import "dayjs/locale/id" 

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateString: string, format: string = "D MMMM YYYY"): string {
  if (!dateString) return "-";
  return dayjs(dateString).format(format);
}

export function formatDateTime(dateString: string, format: string = "D MMMM YYYY, HH:mm"): string {
  if (!dateString) return "-";
  return dayjs(dateString).format(format);
}

