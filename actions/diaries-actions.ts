"use server";

import { getUserId } from "@/actions/user-actions";
import { supabase } from "@/lib/supabase";
import type { DiaryState } from "@/types/diaries";

export async function create(_prevState: DiaryState | undefined, formData: FormData) {
  try {
    if (
      !formData.get("done") &&
      !formData.get("learned") &&
      !formData.get("challenge") &&
      !formData.get("other")
    )
      return;

    const userId = await getUserId();

    const { error: DatabaseError } = await supabase.from("diaries").upsert(
      {
        user_id: userId,
        done: formData.get("done"),
        learned: formData.get("learned"),
        challenge: formData.get("challenge"),
        other: formData.get("other"),
        date: formData.get("date"),
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

export async function fetchDiary(date: string) {
  try {
    const userId = await getUserId();

    const { data, error: DatabaseError } = await supabase
      .from("diaries")
      .select()
      .eq("user_id", userId)
      .eq("date", date);

    if (DatabaseError) {
      console.error("Database Error:", DatabaseError);
      throw new Error("日記の取得に失敗しました。");
    }
    if (data.length === 0) {
      return null;
    }
    return data[0];
  } catch (_error) {
    throw new Error("予期せぬエラーが発生しました。");
  }
}

export async function fetchDiaries(startDate: string, endDate: string) {
  try {
    const userId = await getUserId();

    const { data, error: DatabaseError } = await supabase
      .from("diaries")
      .select()
      .eq("user_id", userId)
      .gte("date", startDate)
      .lte("date", endDate)
      .order("date", { ascending: false });

    if (DatabaseError) {
      console.error("Database Error:", DatabaseError);
      throw new Error("日記の取得に失敗しました。");
    }
    if (!data || data.length === 0) {
      return [];
    }
    return data;
  } catch (_error) {
    throw new Error("予期せぬエラーが発生しました。");
  }
}

export async function deleteDiary(date: string) {
  try {
    const userId = await getUserId();

    const { error: DatabaseError } = await supabase
      .from("diaries")
      .delete()
      .eq("user_id", userId)
      .eq("date", date);

    if (DatabaseError) {
      console.error("Database Error:", DatabaseError);
      throw new Error("日記の削除に失敗しました。");
    }
  } catch (_error) {
    throw new Error("予期せぬエラーが発生しました。");
  }
}
