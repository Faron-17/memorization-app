import { Category } from "@/lib/definitions";
import { supabase } from "@/lib/supabase";

export const fetchCategories = async () => {
  try {
    const categories = await supabase.from("categories").select('*');

    return categories.data as Category[];

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Database error');
  }
};