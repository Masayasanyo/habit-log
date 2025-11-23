import { z } from "zod";

export const HabitFormSchema = z.object({
  title: z
    .string({
      message: "タイトルを入力して下さい。",
    })
    .min(1, "タイトルを入力して下さい。"),
  start: z
    .string({
      message: "開始日を選択して下さい。",
    })
    .min(1, "開始日を選択して下さい。")
    .refine(
      (value) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const date = new Date(value);
        date.setHours(0, 0, 0, 0);

        return date <= today;
      },
      {
        message: "開始日は今日以前の日付にして下さい。",
      },
    ),
  type: z.enum(["good", "bad"], { message: "習慣のタイプを選択して下さい。" }),
});
