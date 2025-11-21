// TODO: fix resetHabit
// TODO: fix fetchHabit

"use server";

import { getUserId } from "@/actions/user-actions";
import { HabitFormSchema } from "@/lib/schemas/habit-form";
import { supabase } from "@/lib/supabase";
import { differenceInCalendarDays } from "date-fns";

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
  const streak = differenceInCalendarDays(new Date(), new Date(start));

  const { error } = await supabase.from("habits").insert({
    user_id: userId,
    title: title,
    start: start,
    type: formData.get("type"),
    streak: streak,
  });

  if (error) {
    console.error("Database error:", error.message);
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
  if (!data || data.length === 0) {
    return [];
  }
  return data || [];
}

export async function resetHabit(habitId: number, date: string) {
  const userId = await getUserId();

  const { error: updateError } = await supabase
    .from("habits")
    .update({ streak: 0 })
    .eq("id", habitId)
    .eq("user_id", userId);

  if (updateError) {
    console.error("Database Error:", updateError);
    return {
      success: false,
      message: "習慣のリセットに失敗しました。",
    };
  }

  const { error: upsertError } = await supabase
    .from("habit_records")
    .upsert({ user_id: userId, habit_id: habitId, date: date, status: false })
    .eq("habit_id", habitId)
    .eq("date", date)
    .eq("user_id", userId);

  if (upsertError) {
    console.error("Database Error:", upsertError);
    return {
      success: false,
      message: "習慣のリセットに失敗しました。",
    };
  }
  return { success: true };
}
