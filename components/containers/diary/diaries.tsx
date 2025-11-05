"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { ja } from "date-fns/locale";
import { ChevronDown, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { useEffect, useState } from "react";
import type { DateRange } from "react-day-picker";
import { deleteDiary, fetchDiaries } from "@/actions/diaries-actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDateToYYYYMMDD, getDate, getDateOneMonthAgo } from "@/lib/date/date";
import { diaryColumns } from "@/lib/diaries/diary-columns";
import { Diary, DiaryColumns } from "@/types/diaries";

export const columns: ColumnDef<DiaryColumns>[] = [
  {
    accessorKey: "date",
    header: "日付",
    cell: ({ row }) => <div>{row.getValue("date")}</div>,
  },
  {
    accessorKey: "done",
    header: "したこと",
    cell: ({ row }) => <div className="max-w-xl truncate">{row.getValue("done")}</div>,
  },
  {
    accessorKey: "learned",
    header: "学んだこと",
    cell: ({ row }) => <div className="max-w-xl truncate">{row.getValue("learned")}</div>,
  },
  {
    accessorKey: "challenge",
    header: "次の日への課題",
    cell: ({ row }) => <div className="max-w-xl truncate">{row.getValue("challenge")}</div>,
  },
  {
    accessorKey: "other",
    header: "その他",
    cell: ({ row }) => <div className="max-w-xl truncate">{row.getValue("other")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{row.getValue("date")}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href={`${row.getValue("date")}`}>編集</Link>
              </DropdownMenuItem>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>削除</DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>日記削除</AlertDialogTitle>
                    <AlertDialogDescription>
                      {row.getValue("date")} の日記を本当に削除してもよろしいですか？
                      この操作は元に戻せません。
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>キャンセル</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => {
                        deleteDiary(row.getValue("date"));
                      }}
                    >
                      OK
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];

export function Diaries() {
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

  const [dateRange, setDateRange] = useState<DateRange | undefined>();
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

  async function handleFilterByRange() {
    if (!dateRange?.from || !dateRange.to) return;

    const from = formatDateToYYYYMMDD(dateRange.from);
    const to = formatDateToYYYYMMDD(dateRange.to);
    const data = await fetchDiaries(from, to);
    setDiaries(data);
  }

  return (
    <Card className="h-200 w-full">
      <CardHeader>
        <CardTitle>過去の日記一覧</CardTitle>
        <CardDescription></CardDescription>
        <CardAction></CardAction>
      </CardHeader>
      <Separator />
      <CardContent className="h-90">
        <div className="w-full">
          <div className="flex items-start justify-between py-4">
            <Input
              placeholder="検索"
              value={(table.getColumn("done")?.getFilterValue() as string) ?? ""}
              onChange={(event) => table.getColumn("done")?.setFilterValue(event.target.value)}
              className="max-w-sm"
            />
            <div className="flex gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">期間</Button>
                </DialogTrigger>

                <DialogContent className="max-w-[95vw] overflow-hidden sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>期間を選択</DialogTitle>
                    <DialogDescription>表示したい期間を指定してください。</DialogDescription>
                  </DialogHeader>
                  <Calendar
                    mode="range"
                    defaultMonth={dateRange?.from}
                    selected={dateRange}
                    onSelect={setDateRange}
                    numberOfMonths={2}
                    className="w-full rounded-lg border shadow-sm"
                    locale={ja}
                  />
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">キャンセル</Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button onClick={handleFilterByRange}>適用</Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="ml-auto">
                    項目 <ChevronDown />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuRadioGroup
                    value={
                      table.getAllColumns().find((col) => col.getIsVisible() && col.id !== "date")
                        ?.id ?? ""
                    }
                    onValueChange={(value) => {
                      table.getAllColumns().forEach((col) => {
                        if (col.id === "date") {
                          col.toggleVisibility(true);
                        } else {
                          col.toggleVisibility(col.id === value);
                        }
                      });
                    }}
                  >
                    {table
                      .getAllColumns()
                      .filter((column) => column.getCanHide() && column.id !== "date")
                      .map((column) => (
                        <DropdownMenuRadioItem key={column.id} value={column.id}>
                          {diaryColumns[column.id]}
                        </DropdownMenuRadioItem>
                      ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="overflow-hidden rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                      日記がありません。
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              前へ
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              次へ
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2"></CardFooter>
    </Card>
  );
}
