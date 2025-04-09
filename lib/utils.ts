import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Item } from "@/lib/definitions"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// バッジ計算処理
export function calculateMemoItemForBadge(items: Item[]) {
   const total = items
                .filter((item) => measure(item.count, item.memorized_at))
                .length;
  return total
}

export function measure(count: number, memorized_at: Date) {
  const today = new Date();
  let result = false;
  const addDays = (date: Date, days: number) => {
    const memoDate = new Date(date);
    memoDate.setDate(memoDate.getDate() + days);
    memoDate.setHours(memoDate.getHours() + 9);
    return memoDate;
  }

  switch (count) {
    case 0:
      result = true
      break;
    case 1:
      if(today > addDays(memorized_at, 1)) result = true
      break;
    case 2:
      if(today > addDays(memorized_at, 3)) result = true
      break;
    case 3:
      if(today > addDays(memorized_at, 7)) result = true
      break;
  }

  return result;
}

