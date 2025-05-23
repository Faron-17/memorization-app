import { Category } from "@/lib/definitions";
import { supabase } from "@/lib/supabase/client";
import { fetchItems } from "@/lib/actions/root/item/action";
import { createClient } from "@/lib/supabase/server";

export const fetchCategories = async () => {
  try {
    const supabaseServer = await createClient()

    const { data: userData, error: userError } = await supabaseServer.auth.getUser()
  
    if (userError) {
      throw new Error(userError.message);
    }

    const { data, error } = await supabase.from("categories").select('*').eq('user_id', userData.user.id);

    if (error) {
      throw new Error(error.message);
    }

    const categories = data as Category[]

    const pinnedCategoriesCount = categories.filter((item) => item.pin).length

    const total = await Promise.all(categories.map(async (item) => {
      const id = item.id;
      const { total } = await fetchItems({ id });
      return { id: id, total: total };
    }));
  
    return { categories, total, pinnedCategoriesCount };

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Database error');
  }
};

export const fetchCategory = async ({id}: {id: string}) => {
  try {
    const { data, error } = await supabase.from("categories").select('*').eq('id', id);

    return { data, error };

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Database error');
  }
};

export const createCategory = async ({item}: {item: Pick<Category, 'name' | 'pin'>}) => {
  try {
    const { error } = await supabase.from("categories").insert(item)
    if (error) {
      throw new Error(error.message);
    }
    return { error };
  } catch(error) {
    console.error('Database Error:', error);
    throw new Error('Database error');
  }
}

export const updateCategory = async ({id, item}: {id: string, item: Pick<Category, 'name' | 'pin'>}) => {
  try {
    const { data, error } =  await supabase.from("categories").update({name: item.name, pin: item.pin, updated_at: new Date}).eq('id', id);
    return { data, error }
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Database error');
  }
}

export const deleteCategory = async ({id}: {id: string}) => {
  try {
    const { data, error } = await supabase.from("categories").delete().eq('id', id)

    return { data, error }
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Database error');
  }
}