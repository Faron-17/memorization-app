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

    const total = !items ? 0: await calculateMemoItemForBadge(items.data as Item[])

    return { items: items.data as Item[], total };

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Database error');
  }
};

export const fetchItem = async ({ id }: { id: string }) => {
  try {
    const { data, error } = await supabase.from("items").select('title, answer').eq('id', id);

    return { items: data as Pick<Item, 'title' | 'answer'> [], error };

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Database error');
  }
};

export const createItem = async ({ item, id }: {item: Pick<Item, 'title' | 'answer'>, id: string}) => {   
  try {
    const { data, error } =  await supabase.from("items").insert(Object.assign({}, item, {id: id}))
    return { data, error }
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Database error');
  }
}

export const updateItem = async ({ title, answer, itemId }: {title: string, answer: string, itemId: string}) => {    
  try {
    const { data, error } =  await supabase.from("items").update({title: title, answer: answer, updated_at: new Date}).eq('id', itemId);
    return { data, error }
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Database error');
  }
}
