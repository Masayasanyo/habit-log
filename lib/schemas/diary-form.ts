import { z } from "zod";

export const DiaryFormSchema = z.object({
  done: z
    .string({
      message: "今日したことを入力してください。",
    })
    .min(1, "今日したことを入力してください。"),
  learned: z
    .string({
      message: "今日学んだことを入力してください。",
    })
    .min(1, "今日学んだことを入力してください。"),
  challenge: z
    .string({
      message: "明日の課題を入力してください。",
    })
    .min(1, "明日の課題を入力してください。"),
  other: z.string({
    message: "その他自由に記入してください",
  }),
  date: z.string({
    message: "",
  }),
});
