import type { Metadata } from "next";
import { Diaries } from "@/components/containers/diary/diaries";
import { DiaryForm } from "@/components/containers/diary/diary-form";

export const metadata: Metadata = {
  title: "日記",
};

export default function Page() {
  return (
    <div className="flex gap-2">
      <DiaryForm />
      <Diaries />
    </div>
  );
}
