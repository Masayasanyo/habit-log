export function GetTodayDate(): string {
  const today = new Date();
  const date = today.toLocaleDateString();
  const dayOfWeekLong = today.toLocaleDateString("ja-JP", { weekday: "long" }).split("曜日")[0];

  return `${date}(${dayOfWeekLong})`;
}
