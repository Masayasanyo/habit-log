"use client";

import { fetchDiaries } from "@/actions/diaries-actions";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CardAction, CardDescription, CardTitle } from "@/components/ui/card";
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
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import {
  formatDateToYYYYMMDD,
  getDate,
  getDateOneMonthAgo,
  getDateWithDayOfWeek,
} from "@/lib/date/date";
import { diaryColumns } from "@/lib/diaries/diary-columns";
import { DateRangeStr, Diary, DiaryColumns } from "@/types/diaries";
import { Table } from "@tanstack/react-table";
import { ja } from "date-fns/locale";
import { ChevronDown } from "lucide-react";
import * as React from "react";
import { useState } from "react";
import type { DateRange } from "react-day-picker";

export default function DiaryArchiveSearchDialog({
  setDiaries,
  table,
}: {
  setDiaries: React.Dispatch<React.SetStateAction<Diary[]>>;
  table: Table<DiaryColumns>;
}) {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [dateRangeStr, setDateRangeStr] = useState<DateRangeStr>({
    from: getDateOneMonthAgo(),
    to: getDate(),
  });
  const [selectedColumn, setSelectedColumn] = useState<string>("したこと");

  async function handleFilterByRange(selectedDateRange: DateRange | undefined) {
    setDateRange(selectedDateRange);
    if (!selectedDateRange?.from || !selectedDateRange.to) return;

    const from = formatDateToYYYYMMDD(selectedDateRange.from);
    const to = formatDateToYYYYMMDD(selectedDateRange.to);
    const data = await fetchDiaries(from, to);
    setDateRangeStr({
      from: from,
      to: to,
    });
    setDiaries(data);
  }

  return (
    <div>
      <CardTitle>過去の日記一覧</CardTitle>
      <CardDescription></CardDescription>
      <CardAction>
        <Dialog>
          <DialogTrigger>
            <Button variant="outline">詳細検索</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>詳細検索</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-6 py-4">
              <div className="grid gap-2">
                <Label>期間</Label>
                <Dialog>
                  <DialogTrigger>
                    <Button variant="outline" className="mr-auto block">
                      {getDateWithDayOfWeek(dateRangeStr?.from)}
                      {` - `}
                      {getDateWithDayOfWeek(dateRangeStr?.to)}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="h-[450px] w-[350px] overflow-scroll sm:max-w-[550px] md:w-[550px]">
                    <DialogHeader>
                      <DialogTitle>日記の期間</DialogTitle>
                      <DialogDescription>
                        {getDateWithDayOfWeek(dateRangeStr?.from)}
                        {` - `}
                        {getDateWithDayOfWeek(dateRangeStr?.to)}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex w-full justify-center">
                      <Calendar
                        mode="range"
                        defaultMonth={dateRange?.from}
                        selected={dateRange}
                        onSelect={(date) => {
                          handleFilterByRange(date);
                        }}
                        numberOfMonths={2}
                        locale={ja}
                        className="rounded-md border"
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="grid gap-2">
                <Label>項目</Label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-[180px] justify-between">
                      {selectedColumn}
                      <ChevronDown />
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
                        setSelectedColumn(diaryColumns[value]);
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
          </DialogContent>
        </Dialog>
      </CardAction>
    </div>
  );
}
