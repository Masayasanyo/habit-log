"use client";

import { ja } from "date-fns/locale";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import { Toaster, toast } from "sonner";
import { createHabit } from "@/actions/habits-actions";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { formatDateToYYYYMMDD, getDateWithDayOfWeek } from "@/lib/date/date";
import { HabitFormState } from "@/types/habits";

export default function NewHabits() {
  const today = new Date();
  const todayStr = formatDateToYYYYMMDD(today);
  const dateWithDayOfWeek = getDateWithDayOfWeek(todayStr);

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date>(today);
  const [dateStr, setDateStr] = useState<string>(dateWithDayOfWeek);
  const [pending, setPending] = useState<boolean>(false);
  const initialState: HabitFormState = { success: null, message: null, errors: {} };
  const [state, setState] = useState<HabitFormState>(initialState);

  function handleDate(date: Date | undefined) {
    if (!date) return;
    setDate(date);
    let formattedDate = formatDateToYYYYMMDD(date);
    formattedDate = getDateWithDayOfWeek(formattedDate);
    setDateStr(formattedDate);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setState(initialState);
    const formData = new FormData(e.currentTarget);
    const result = await createHabit(formData);
    if (result.success) {
      location.reload();
    } else {
      setState(result);
      toast.error(result.message);
    }
    setPending(false);
  }

  return (
    <Button className="size-full">
      <Dialog>
        <DialogTrigger>習慣を追加</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>新しい習慣</DialogTitle>
            <DialogDescription>新しい習慣を追加しましょう。</DialogDescription>
          </DialogHeader>
          <form id="new-habit" onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
            <Toaster richColors position="top-center" />
            <div className="grid gap-2">
              <Label htmlFor="title">タイトル</Label>
              <Input
                id="title"
                type="text"
                name="title"
                placeholder="習慣のタイトルを入力して下さい"
              />
              <div aria-live="polite" aria-atomic="true">
                {state?.errors?.title?.map((error: string) => (
                  <p className="text-red-500 text-sm" key={error}>
                    {error}
                  </p>
                ))}
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="type">タイプ</Label>
              <Select name="type" defaultValue="good">
                <SelectTrigger className="w-48">
                  <SelectValue defaultValue="good" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="good">続けたい</SelectItem>
                  <SelectItem value="bad">辞めたい</SelectItem>
                </SelectContent>
              </Select>
              <div aria-live="polite" aria-atomic="true">
                {state?.errors?.type?.map((error: string) => (
                  <p className="text-red-500 text-sm" key={error}>
                    {error}
                  </p>
                ))}
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="start">開始日</Label>
              <Input id="start" type="hidden" name="start" value={formatDateToYYYYMMDD(date)} />
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" id="date" className="w-48 justify-between font-normal">
                    {dateStr}
                    <ChevronDownIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    captionLayout="dropdown"
                    locale={ja}
                    onSelect={(date) => {
                      handleDate(date);
                      setOpen(false);
                    }}
                  />
                </PopoverContent>
              </Popover>
              <div aria-live="polite" aria-atomic="true">
                {state?.errors?.start?.map((error: string) => (
                  <p className="text-red-500 text-sm" key={error}>
                    {error}
                  </p>
                ))}
              </div>
            </div>
            <div>
              <Button type="submit" form="new-habit" aria-disabled={pending}>
                {pending && <Spinner />}
                追加
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </Button>
  );
}
