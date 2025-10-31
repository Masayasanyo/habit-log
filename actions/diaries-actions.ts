"use server";

import { getUserId } from "@/actions/user-actions";
import { getDate } from "@/lib/date/date";
import { DiaryFormSchema } from "@/lib/schemas/diary-form";
import { supabase } from "@/lib/supabase";
import type { DiaryState } from "@/types/diaries";

export async function create(_prevState: DiaryState | undefined, formData: FormData) {
  try {
    const validatedFields = DiaryFormSchema.safeParse({
      done: formData.get("done"),
      learned: formData.get("learned"),
      challenge: formData.get("challenge"),
      other: formData.get("other"),
    });

    if (!validatedFields.success) {
      console.log("Validation errors:", validatedFields.error.flatten().fieldErrors);

      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: "日記の保存に失敗しました。",
      };
    }

    const { done, learned, challenge, other } = validatedFields.data;
    const userId = await getUserId();
    const date = getDate();

    const { error: DatabaseError } = await supabase.from("diaries").upsert(
      {
        user_id: userId,
        done: done,
        learned: learned,
        challenge: challenge,
        other: other,
        date: date,
      },
      { onConflict: "user_id,date" },
    );

    if (DatabaseError) {
      console.error("Database error:", DatabaseError.message);
      return {
        message: "日記の登録に失敗しました。",
      };
    }
  } catch (_error) {
    return {
      message: "予期せぬエラーが発生しました。",
    };
  }
}

export async function getTodayDiary() {
  try {
    const userId = await getUserId();
    const date = getDate();

    const { data, error: DatabaseError } = await supabase
      .from("diaries")
      .select()
      .eq("user_id", userId)
      .eq("date", date);

    if (DatabaseError) {
      console.error("Database Error:", DatabaseError);
      throw new Error("日記の取得に失敗しました。");
    }
    return data[0];
  } catch (_error) {
    return {
      message: "予期せぬエラーが発生しました。",
    };
  }
}
