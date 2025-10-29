import type { Metadata } from "next";
import { DiaryForm } from "@/components/containers/diary/diary-form";

export const metadata: Metadata = {
  title: "日記",
};

export default function Page() {
  return (
    <div className="">
      <DiaryForm />
    </div>
  );
}
