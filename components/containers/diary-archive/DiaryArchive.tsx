"use client";

import { useEffect, useState } from "react";
import { fetchDiaries } from "@/actions/diaries-actions";
import DiaryArchiveSearchDialog from "@/components/containers/diary-archive/DiaryArchiveSearchDialog";
import DiaryArchiveTable from "@/components/containers/diary-archive/DiaryArchiveTable";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useDiaryArchiveTable } from "@/hooks/use-diary-archive-table";
import { getDate, getDateOneMonthAgo } from "@/lib/date/date";
import { Diary } from "@/types/diaries";

export function DiaryArchive() {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const { table } = useDiaryArchiveTable(diaries);

  useEffect(() => {
    async function loadDiaries() {
      const today = getDate();
      const oneMonthAgo = getDateOneMonthAgo();
      const data = await fetchDiaries(oneMonthAgo, today);
      setDiaries(data);
    }

    loadDiaries();
  }, []);

  return (
    <Card>
      <CardHeader>
        <DiaryArchiveSearchDialog setDiaries={setDiaries} table={table} />
      </CardHeader>
      <CardContent className="h-full">
        <DiaryArchiveTable table={table} />
      </CardContent>
    </Card>
  );
}
