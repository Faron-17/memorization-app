export type Category = {
  id: string,
  user_id: string,
  name: string,
  pin: boolean,
  created_at: Date,
  updated_at: Date,
}

export type Item = {
  id: string,
  category_id: string,
  title: string,
  answer: string,
  count: number,
  created_at: Date,
  updated_at: Date,
  memorized_at: Date,
}

export type MemoType = "pause" | "done" | "tomorrow"