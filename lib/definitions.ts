export type Category = {
  id: string,
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
  created_at: Date,
  updated_at: Date,
  count: number,
}