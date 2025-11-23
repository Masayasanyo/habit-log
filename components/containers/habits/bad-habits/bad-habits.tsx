"use client";

import { fetchHabits } from "@/actions/habits-actions";
import HabitsTable from "@/components/containers/habits/habits-table";
import NewHabits from "@/components/containers/habits/new-habits";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useHabitsTable from "@/hooks/use-habits-table";
import type { Habits } from "@/types/habits";
import { useEffect, useState } from "react";

export default function BadHabits() {
  const [baddHabits, setBadHabits] = useState<Habits[]>([]);
  const { table } = useHabitsTable(baddHabits);

  useEffect(() => {
    async function loadGoodHabits() {
      const data = await fetchHabits("bad");
      setBadHabits(data);
    }

    loadGoodHabits();
  }, []);

  return (
    <Card className="h-full w-full">
      <CardHeader>
        <CardTitle>辞めたい習慣</CardTitle>
        <CardDescription></CardDescription>
        <CardAction>
          <NewHabits />
        </CardAction>
      </CardHeader>
      <CardContent className="w-full">
        <HabitsTable table={table} />
      </CardContent>
    </Card>
  );
}
