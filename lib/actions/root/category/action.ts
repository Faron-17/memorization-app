import { supabase } from "@/lib/supabase";

export const fetchCategories = async () => {
  const categories = await supabase.from("categories").select('*');
  return categories.data;
};