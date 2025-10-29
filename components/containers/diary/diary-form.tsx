"use client";

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
import { GetTodayDate } from "@/lib/date/date";

export function DiaryForm() {
  return (
    <Card className="h-180 w-full max-w-sm">
      <CardHeader>
        <CardTitle>今日の日記</CardTitle>
        <CardDescription>
          振り返りの時間。今日の出来事と学びを記録し、明日への糧にしましょう。
        </CardDescription>
        <CardAction>
          <p>{GetTodayDate()}</p>
        </CardAction>
      </CardHeader>
      <CardContent className="scrollable">
        {/* <ScrollArea className="h-[200px] w-[350px]"> */}
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="done">今日したこと</Label>
              <Textarea
                className="h-20 overflow-y-auto"
                id="done"
                placeholder="今日取り組んだことを入力してください"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="learned">学んだこと</Label>
              <Textarea
                className="h-20 overflow-y-auto"
                id="learned"
                placeholder="今日学んだことを入力してください"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="challenge">明日への課題</Label>
              <Textarea
                className="h-20 overflow-y-auto"
                id="challenge"
                placeholder="明日への課題を入力してください"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="other">その他</Label>
              <Textarea
                className="h-20 overflow-y-auto"
                id="other"
                placeholder="その他自由に入力してください"
              />
            </div>
          </div>
        </form>
        {/* </ScrollArea> */}
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          保存
        </Button>
      </CardFooter>
    </Card>
  );
}
