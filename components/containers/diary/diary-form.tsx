"use client";

import Link from "next/link";
import { useState } from "react";
import { Toaster, toast } from "sonner";
import { create } from "@/actions/diaries-actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { getDate, getDateWithDayOfWeek } from "@/lib/date/date";
import { Diary } from "@/types/diaries";

export function DiaryForm(props: { data?: Diary }) {
  const [isPending, setIsPending] = useState(false);
  const [diary, setDiary] = useState<Diary>(
    props.data || {
      id: null,
      userId: null,
      done: "",
      learned: "",
      challenge: "",
      other: "",
      date: getDate(),
      createdAt: "",
    },
  );

  async function saveDiary() {
    try {
      setIsPending(true);
      await create(diary);
      setIsPending(false);
      toast.success("日記が保存されました！");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
      setIsPending(false);
    }
  }

  return (
    <Card className="max-h-xl w-full max-w-xl">
      <CardHeader>
        <CardTitle>{getDateWithDayOfWeek(diary.date)}</CardTitle>
        <CardDescription>
          振り返りの時間。今日の出来事と学びを記録し、明日への糧にしましょう。
        </CardDescription>
        <CardAction>
          <Button variant="outline">
            <Link href={getDate()}>今日の日記</Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="scrollable">
        <Toaster richColors position="top-center" />
        <form id="diary-form" action={saveDiary}>
          <div className="flex flex-col gap-6">
            <input type="hidden" name="date" value={diary.date}></input>
            <div className="grid gap-2">
              <Label htmlFor="done">今日したこと</Label>
              <Textarea
                className="h-20 resize-none overflow-y-auto"
                id="done"
                name="done"
                placeholder="今日取り組んだことを入力してください"
                value={diary.done}
                onChange={(e) => setDiary((prev) => ({ ...prev, done: e.target.value }))}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="learned">学んだこと</Label>
              <Textarea
                className="h-20 resize-none overflow-y-auto"
                id="learned"
                name="learned"
                placeholder="今日学んだことを入力してください"
                value={diary.learned}
                onChange={(e) => setDiary((prev) => ({ ...prev, learned: e.target.value }))}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="challenge">明日への課題</Label>
              <Textarea
                className="h-20 resize-none overflow-y-auto"
                id="challenge"
                name="challenge"
                placeholder="明日への課題を入力してください"
                value={diary.challenge}
                onChange={(e) => setDiary((prev) => ({ ...prev, challenge: e.target.value }))}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="other">その他</Label>
              <Textarea
                className="h-20 resize-none overflow-y-auto"
                id="other"
                name="other"
                placeholder="その他自由に入力してください"
                value={diary.other}
                onChange={(e) => setDiary((prev) => ({ ...prev, other: e.target.value }))}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" form="diary-form" aria-disabled={isPending} className="w-full">
          {isPending && <Spinner />}
          保存
        </Button>
      </CardFooter>
    </Card>
  );
}
