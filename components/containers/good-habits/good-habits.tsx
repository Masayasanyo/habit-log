"use client";

import { fetchHabits } from "@/actions/habits-actions";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useGoodHabitsTable from "@/hooks/use-good-habits-table";
import type { Habits } from "@/types/habits";
import { useEffect, useState } from "react";
import GoodHabitsTable from "./good-habits-table";
import NewHabits from "./new-habits";

export default function GoodHabits() {
  const [goodHabits, setGoodHabits] = useState<Habits[]>([]);
  const { table } = useGoodHabitsTable(goodHabits);

  useEffect(() => {
    async function loadGoodHabits() {
      const data = await fetchHabits("good");
      setGoodHabits(data);
    }

    loadGoodHabits();
  }, []);

  return (
    <Card className="h-full w-full">
      <CardHeader>
        <CardTitle>続けたい習慣</CardTitle>
        <CardDescription></CardDescription>
        <CardAction>
          <NewHabits />
        </CardAction>
      </CardHeader>
      <CardContent className="w-full">
        <GoodHabitsTable table={table} />
      </CardContent>
    </Card>
  );
}
