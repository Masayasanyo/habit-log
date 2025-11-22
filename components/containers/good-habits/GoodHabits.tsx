// todo: components!!
// todo: test restart habit button

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
import { differenceInCalendarDays } from "date-fns";
import { MoreHorizontal } from "lucide-react";
import * as React from "react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { deleteHabit, fetchHabits, restartHabit } from "@/actions/habits-actions";
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
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getDateStr } from "@/lib/date/date";
import type { Habits } from "@/types/habits";
import NewHabits from "../new-habits/NewHabits";

export const columns: ColumnDef<Habits>[] = [
  {
    accessorKey: "restart",
    header: "経過日数",
    cell: ({ row }) => {
      const streak = differenceInCalendarDays(new Date(), new Date(row.getValue("restart")));
      return <div>{streak}日</div>;
    },
  },
  {
    accessorKey: "title",
    header: "習慣",
    cell: ({ row }) => <div>{row.getValue("title")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const [pending, setPending] = useState<boolean>(false);
      const habitId = row.original.id as number;

      async function handleRestartHabit() {
        const date = getDateStr();
        try {
          setPending(true);
          await restartHabit(habitId, date);
          toast.success("習慣のリセットに成功しました。");
          location.reload();
        } catch (error: unknown) {
          if (error instanceof Error) {
            toast.error(error.message);
          }
        } finally {
          setPending(false);
        }
      }

      async function handleDeleteHabit() {
        try {
          setPending(true);
          await deleteHabit(habitId);
          toast.success("習慣の削除に成功しました。");
          location.reload();
        } catch (error: unknown) {
          if (error instanceof Error) {
            toast.error(error.message);
          }
        } finally {
          setPending(false);
        }
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>リセット</DropdownMenuItem>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>習慣をリセット</AlertDialogTitle>
                  <AlertDialogDescription>
                    この習慣をリセットしますか？ この操作は元に戻せません。
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>キャンセル</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      handleRestartHabit();
                    }}
                  >
                    {pending && <Spinner />}
                    OK
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>削除</DropdownMenuItem>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>習慣を削除</AlertDialogTitle>
                  <AlertDialogDescription>
                    この習慣を削除しますか？ この操作は元に戻せません。
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>キャンセル</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      handleDeleteHabit();
                    }}
                  >
                    {pending && <Spinner />}
                    OK
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function GoodHabits() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [goodHabits, setGoodHabits] = useState<Habits[]>([]);

  useEffect(() => {
    async function loadGoodHabits() {
      const data = await fetchHabits("good");
      setGoodHabits(data);
    }

    loadGoodHabits();
  }, []);

  const table = useReactTable({
    data: goodHabits,
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
    <Card className="h-full w-full">
      <CardHeader>
        <CardTitle>続けたい習慣</CardTitle>
        <CardDescription></CardDescription>
        <CardAction>
          <Button className="size-full">
            <Dialog>
              <DialogTrigger>習慣を追加</DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>新しい習慣</DialogTitle>
                  <DialogDescription>新しい習慣を追加しましょう。</DialogDescription>
                </DialogHeader>
                <NewHabits />
              </DialogContent>
            </Dialog>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="w-full">
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
                    習慣がありません。
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
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
    </Card>
  );
}
