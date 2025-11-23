"use server";

import { getUserId } from "@/actions/user-actions";
import { supabase } from "@/lib/supabase";
import { Diary } from "@/types/diaries";

export async function createDiary(diary: Diary) {
  if (!diary.done && !diary.learned && !diary.challenge && !diary.other) {
    return {
      success: false,
      message: "日記の登録に失敗しました。",
    };
  }
  const userId = await getUserId();

  const { error } = await supabase.from("diaries").upsert(
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

  if (error) {
    console.error("Database error:", error.message);
    return {
      success: false,
      message: "日記の登録に失敗しました。",
    };
  }
  return { success: true };
}

export async function fetchDiary(date: string) {
  const userId = await getUserId();

  const { data, error } = await supabase
    .from("diaries")
    .select()
    .eq("user_id", userId)
    .eq("date", date);

  if (error) {
    console.error("Database Error:", error);
    return {
      success: false,
      message: "日記の取得に失敗しました。",
    };
  }
  if (!data || data.length < 1) {
    return {
      success: false,
      message: "日記の取得に失敗しました。",
    };
  }
  return {
    success: true,
    data: data[0],
  };
}

export async function fetchDiaries(startDate: string, endDate: string) {
  const userId = await getUserId();

  const { data, error } = await supabase
    .from("diaries")
    .select()
    .eq("user_id", userId)
    .gte("date", startDate)
    .lte("date", endDate)
    .order("date", { ascending: false });

  if (error) {
    console.error("Database Error:", error);
    return [];
  }
  if (!data || data.length < 1) {
    return [];
  }
  return data || [];
}

export async function deleteDiary(date: string) {
  const userId = await getUserId();

  const { error } = await supabase.from("diaries").delete().eq("user_id", userId).eq("date", date);

  if (error) {
    console.error("Database Error:", error);
    return {
      success: false,
      message: "日記の削除に失敗しました。",
    };
  } else {
    return {
      success: true,
    };
  }
}
