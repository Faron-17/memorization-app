import { Category } from "@/lib/definitions";
import { supabase } from "@/lib/supabase";
import { fetchItems } from "@/lib/actions/root/item/action";

export const fetchCategories = async () => {
  try {
    const { data, error } = await supabase.from("categories").select('*');

    if (error) {
      throw new Error(error.message);
    }

    const categories = data as Category[]

    const total = await Promise.all(categories.map(async (item) => {
      const id = item.id;
      const { total } = await fetchItems({ id });
      return { id: id, total: total };
    }));
  
    return { categories, total };

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Database error');
  }
};