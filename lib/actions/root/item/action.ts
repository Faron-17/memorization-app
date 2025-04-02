import { supabase } from "@/lib/supabase";

// TODO 型定義、エラーハンドリング確認
export const fetchItems = async ({ category_id }: { category_id: string }) => {
  const items = await supabase.from("items").select('*').eq('category_id', category_id);

  return items.data;
};
