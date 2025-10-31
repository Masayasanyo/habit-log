"use client";

import { create } from "@/actions/diaries-actions";
import { Alert, AlertTitle } from "@/components/ui/alert";
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
import { Textarea } from "@/components/ui/textarea";
import { getDateWithDayOfWeek } from "@/lib/date/date";
import { AlertCircleIcon } from "lucide-react";
import { useActionState } from "react";

export function DiaryForm() {
  const [state, formAction, isPending] = useActionState(create, undefined);

  return (
    <Card className="max-h-xl w-full max-w-xl">
      <CardHeader>
        <CardTitle>今日の日記</CardTitle>
        <CardDescription>
          振り返りの時間。今日の出来事と学びを記録し、明日への糧にしましょう。
        </CardDescription>
        <CardAction>
          <p>{getDateWithDayOfWeek()}</p>
        </CardAction>
      </CardHeader>
      <CardContent className="scrollable">
        <form id="diary-form" action={formAction}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="done">今日したこと</Label>
              <Textarea
                className="h-20 resize-none overflow-y-auto"
                id="done"
                name="done"
                placeholder="今日取り組んだことを入力してください"
                required
              />
              <div aria-live="polite" aria-atomic="true">
                {state?.errors?.done?.map((error: string) => (
                  <p className="mt-2 text-red-500 text-sm" key={error}>
                    {error}
                  </p>
                ))}
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="learned">学んだこと</Label>
              <Textarea
                className="h-20 resize-none overflow-y-auto"
                id="learned"
                name="learned"
                placeholder="今日学んだことを入力してください"
                required
              />
              <div aria-live="polite" aria-atomic="true">
                {state?.errors?.learned?.map((error: string) => (
                  <p className="mt-2 text-red-500 text-sm" key={error}>
                    {error}
                  </p>
                ))}
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="challenge">明日への課題</Label>
              <Textarea
                className="h-20 resize-none overflow-y-auto"
                id="challenge"
                name="challenge"
                placeholder="明日への課題を入力してください"
                required
              />
              <div aria-live="polite" aria-atomic="true">
                {state?.errors?.challenge?.map((error: string) => (
                  <p className="mt-2 text-red-500 text-sm" key={error}>
                    {error}
                  </p>
                ))}
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="other">その他</Label>
              <Textarea
                className="h-20 resize-none overflow-y-auto"
                id="other"
                name="other"
                placeholder="その他自由に入力してください"
              />
              <div aria-live="polite" aria-atomic="true">
                {state?.errors?.other?.map((error: string) => (
                  <p className="mt-2 text-red-500 text-sm" key={error}>
                    {error}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        {state?.message && (
          <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>{state.message}</AlertTitle>
          </Alert>
        )}
        <Button type="submit" form="diary-form" aria-disabled={isPending} className="w-full">
          保存
        </Button>
      </CardFooter>
    </Card>
  );
}
