// TODO: fix error handling

"use server";

import { getUserId } from "@/actions/user-actions";
import { supabase } from "@/lib/supabase";
import { Diary } from "@/types/diaries";

export async function createDiary(diary: Diary) {
  if (!diary.done && !diary.learned && !diary.challenge && !diary.other) {
    throw Error("日記に何も記入されていません。");
  }
  try {
    const userId = await getUserId();

    const { error: DatabaseError } = await supabase.from("diaries").upsert(
      {
        user_id: userId,
        done: diary.done,
        learned: diary.learned,
        challenge: diary.challenge,
        other: diary.other,
        date: diary.date,
      },
      { onConflict: "user_id,date" },
    );

    if (DatabaseError) {
      console.error("Database error:", DatabaseError.message);
      throw Error("日記の登録に失敗しました。");
    }
  } catch (error) {
    console.error(error);
    throw Error("日記の登録に失敗しました。");
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
    throw new Error("日記の削除に失敗しました。");
  }
}
