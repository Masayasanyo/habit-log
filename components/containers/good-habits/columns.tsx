"use client";

import { ColumnDef } from "@tanstack/react-table";
import { differenceInCalendarDays } from "date-fns";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { deleteHabit, restartHabit } from "@/actions/habits-actions";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Spinner } from "@/components/ui/spinner";
import { getDateStr } from "@/lib/date/date";
import type { Habits } from "@/types/habits";

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
