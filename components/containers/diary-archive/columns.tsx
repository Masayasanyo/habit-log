"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { deleteDiary } from "@/actions/diaries-actions";
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Spinner } from "@/components/ui/spinner";
import { getDate, getDateWithDayOfWeek } from "@/lib/date/date";
import { DiaryColumns } from "@/types/diaries";

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
      const router = useRouter();
      const [isPending, setIsPending] = useState(false);
      async function handleDeleteDiary(date: string) {
        try {
          setIsPending(true);
          await deleteDiary(date);
          toast.success("日記の削除に成功しました。");
          setIsPending(false);
          router.push(getDate());
        } catch (error: unknown) {
          if (error instanceof Error) {
            toast.error(error.message);
          }
          setIsPending(false);
        }
      }

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
              <DropdownMenuLabel>{getDateWithDayOfWeek(row.getValue("date"))}</DropdownMenuLabel>
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
                      {getDateWithDayOfWeek(row.getValue("date"))}{" "}
                      の日記を本当に削除してもよろしいですか？ この操作は元に戻せません。
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>キャンセル</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => {
                        handleDeleteDiary(row.getValue("date"));
                      }}
                    >
                      {isPending && <Spinner />}
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
