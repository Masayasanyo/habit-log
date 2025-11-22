// todo: add restart column on supabase (still down) and test

"use server";

import { getUserId } from "@/actions/user-actions";
import { HabitFormSchema } from "@/lib/schemas/habit-form";
import { supabase } from "@/lib/supabase";

export async function createHabit(formData: FormData) {
  const validatedFields = HabitFormSchema.safeParse({
    title: formData.get("title"),
    start: formData.get("start"),
    type: formData.get("type"),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "習慣の新規登録に失敗しました。",
    };
  }

  const { title, start } = validatedFields.data;
  const userId = await getUserId();

  const { error: habitsTableError } = await supabase.from("habits").insert({
    user_id: userId,
    title: title,
    start: start,
    restart: start,
    type: formData.get("type"),
  });

  if (habitsTableError) {
    console.error("Database error:", habitsTableError.message);
    return {
      success: false,
      message: "習慣の新規登録に失敗しました。",
    };
  }
  return { success: true };
}

export async function fetchHabits(type: string) {
  const userId = await getUserId();

  const { data, error } = await supabase
    .from("habits")
    .select()
    .eq("user_id", userId)
    .eq("type", type)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Database Error:", error);
    return [];
  }
  if (!data || data.length < 1) {
    return [];
  }
  return data || [];
}

export async function restartHabit(habitId: number, date: string) {
  const userId = await getUserId();

  const { error: updateError } = await supabase
    .from("habits")
    .update({ restart: date })
    .eq("id", habitId)
    .eq("user_id", userId);

  if (updateError) {
    console.error("Database Error:", updateError);
    throw new Error("習慣のリセットに失敗しました。");
  }
}

export async function deleteHabit(habitId: number) {
  const userId = await getUserId();

  const { error } = await supabase.from("habits").delete().eq("user_id", userId).eq("id", habitId);

  if (error) {
    console.error("Database Error:", error);
    throw new Error("習慣の削除に失敗しました。");
  }
}
