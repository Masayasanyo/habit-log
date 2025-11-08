import { fetchDiary } from "@/actions/diaries-actions";
import { Diaries } from "@/components/containers/diary/diaries";
import { DiaryForm } from "@/components/containers/diary/diary-form";
import { Skeleton } from "@/components/ui/skeleton";
import { getDate } from "@/lib/date/date";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "日記",
};

export default async function Page({ params }: { params: { date: string } }) {
  const todayDate = getDate();
  const { date } = (await params) || { date: todayDate };
  const diary = await fetchDiary(date);

  return (
    <div className="grid h-full grid-cols-1 gap-4 md:grid-cols-2">
      <Suspense fallback={<Skeleton className="h-full w-full rounded-xl" />}>
        <DiaryForm data={diary} />
      </Suspense>
      <Suspense fallback={<Skeleton className="h-full w-full rounded-xl" />}>
        <Diaries />
      </Suspense>
    </div>
  );
}
