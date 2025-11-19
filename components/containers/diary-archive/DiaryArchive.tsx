// TODO: create components
"use client";

import { fetchDiaries } from "@/actions/diaries-actions";
import { columns } from "@/components/containers/diary-archive/columns";
import DiaryArchiveSearchDialog from "@/components/containers/diary-archive/DiaryArchiveSearchDialog";
import DiaryArchiveTable from "@/components/containers/diary-archive/DiaryArchiveTable";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getDate, getDateOneMonthAgo } from "@/lib/date/date";
import { Diary } from "@/types/diaries";
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import * as React from "react";
import { useEffect, useState } from "react";

export function DiaryArchive() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({
    date: true,
    done: true,
    learned: false,
    challenge: false,
    other: false,
  });
  const [rowSelection, setRowSelection] = React.useState({});

  const [diaries, setDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    async function loadDiaries() {
      const today = getDate();
      const oneMonthAgo = getDateOneMonthAgo();
      const data = await fetchDiaries(oneMonthAgo, today);
      setDiaries(data);
    }

    loadDiaries();
  }, []);

  const table = useReactTable({
    data: diaries || [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

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
