import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Item } from "@/lib/definitions"
import { MAX_PINED } from "@/constants";

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
  const addDays = (date: Date, days: number) => {
    const memoDate = new Date(date);
    memoDate.setDate(memoDate.getDate() + days);
    memoDate.setHours(memoDate.getHours() + 9);
    return memoDate;
  }

  const daysMap = [0, 1, 3, 7];
  if(daysMap[count] === undefined) return false
  return (count === 0 || today > addDays(memorized_at, daysMap[count]))
}

export function canPinMore({type, pin, pinnedCount}: {type: "create" | "edit", pin: boolean | undefined, pinnedCount: number}) {
  if(type ==='edit' && pin) return true

  return pinnedCount < MAX_PINED
}