import React from "react";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { diaries } from "@/lib/test-data/diaries";

export function Diaries() {
  return (
    <Card className="h-180 w-full">
      <CardHeader>
        <CardTitle>過去の日記一覧</CardTitle>
        <CardDescription></CardDescription>
        <CardAction></CardAction>
      </CardHeader>
      <Separator />
      <CardContent className="h-150">
        <ScrollArea className="h-full">
          <div className="">
            {diaries.map((diary) => (
              <React.Fragment key={diary.id}>
                <Card className="my-2">
                  <CardHeader>
                    <CardTitle>{diary.dateStr}</CardTitle>
                    <CardAction>
                      <Button variant="link">詳細を見る</Button>
                    </CardAction>
                  </CardHeader>
                  <CardContent>
                    <div>{diary.done}</div>
                  </CardContent>
                </Card>
              </React.Fragment>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="flex-col gap-2"></CardFooter>
    </Card>
  );
}
