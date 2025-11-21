"use server";

import { differenceInCalendarDays } from "date-fns";
import { getUserId } from "@/actions/user-actions";
import { HabitFormSchema } from "@/lib/schemas/habit-form";
import { supabase } from "@/lib/supabase";
import { HabitFormState } from "@/types/habits";

export async function createHabit(_prevState: HabitFormState | undefined, formData: FormData) {
  const validatedFields = HabitFormSchema.safeParse({
    title: formData.get("title"),
    start: formData.get("start"),
    type: formData.get("type"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "習慣の新規登録に失敗しました。",
    };
  }

  const { title, start } = validatedFields.data;
  const userId = await getUserId();
  const streak = differenceInCalendarDays(new Date(), new Date(start));

  const { error: DatabaseError } = await supabase.from("habits").insert({
    user_id: userId,
    title: title,
    start: start,
    type: formData.get("type"),
    streak: streak,
  });

  if (DatabaseError) {
    console.error("Database error:", DatabaseError.message);
    return {
      message: "習慣の新規登録に失敗しました。",
    };
  }
}

export async function fetchHabits(type: string) {
  const userId = await getUserId();

  const { data, error: DatabaseError } = await supabase
    .from("habits")
    .select()
    .eq("user_id", userId)
    .eq("type", type)
    .order("created_at", { ascending: false });

  if (DatabaseError) {
    console.error("Database Error:", DatabaseError);
    return [];
  }
  if (!data || data.length === 0) {
    return [];
  }
  return data || [];
}
