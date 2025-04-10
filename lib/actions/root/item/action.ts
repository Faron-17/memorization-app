import { Item } from "@/lib/definitions";
import { supabase } from "@/lib/supabase/client";
import { calculateMemoItemForBadge } from "@/lib/utils";
import { PostgrestError } from "@supabase/supabase-js";

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
    const { data, error } =  await supabase.from("items").insert(Object.assign({}, item, {category_id: id}, {updated_at: new Date}))
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

export  const deleteItem = async ({ itemId }: { itemId: string }) => {
  try {
    const { data, error } = await supabase.from("items").delete().eq('id', itemId)
    return { data, error }
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Database error');
  }
}

export  const deleteAllItemsByCategory = async ({ id }: { id: string }) => {
  try {
    const { error } = await supabase.from("items").delete().eq('category_id', id)
    return { error }
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Database error');
  }
}

export const memorizedItem = async ({memorizedItems}: {memorizedItems: Pick<Item, 'id' | 'count'>[]}) => {   
  try {
    const res = await Promise.all(memorizedItems.map(async (item) => {
      const { error } = await supabase.from("items").update({memorized_at: new Date, count: item.count}).eq('id', item.id);
      return { error };
    }));

    const isSuccesses = (item: {error: PostgrestError | null }) => {
      return item.error === null
    }
    return res.every(isSuccesses)
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Database error');
  }
}