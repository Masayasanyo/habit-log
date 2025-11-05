import { fetchDiary } from "@/actions/diaries-actions";
import { Diaries } from "@/components/containers/diary/diaries";
import { DiaryForm } from "@/components/containers/diary/diary-form";
import { getDate } from "@/lib/date/date";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "日記",
};

export default async function Page({ params }: { params: { date: string } }) {
  const todayDate = getDate();
  const { date } = (await params) || { date: todayDate };
  const diary = await fetchDiary(date);

  return (
    <div className="flex gap-4">
      <DiaryForm data={diary} />
      <Diaries />
    </div>
  );
}
