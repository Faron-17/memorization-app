import { Item } from "@/lib/definitions";
import { supabase } from "@/lib/supabase";
import { calculateMemoItemForBadge } from "@/lib/utils";

export const fetchAllItems = async () => {
  try {
    const items = await supabase.from("items").select('*');

    return items.data as Item[];

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Database error');
  }
};

export const fetchItems = async ({ id }: { id: string }) => {
  try {
    const items = await supabase.from("items").select('*').eq('category_id', id);
    const total = await calculateMemoItemForBadge(items.data as Item[])

    return { items: items.data as Item[], total };

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Database error');
  }
};

export const createItem = async ({ item }: {item: Omit<Item, 'id'>}) => {    
  try {
    const { data, error } =  await supabase.from("items").insert(item)
    return { data, error }
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Database error');
  }
}
