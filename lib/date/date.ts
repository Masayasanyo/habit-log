export function GetTodayDate(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1);
  const day = String(today.getDate());
  const dayOfWeekLong = today.toLocaleDateString("ja-JP", { weekday: "long" }).split("曜日")[0];

  return `${year}/${month}/${day}(${dayOfWeekLong})`;
}
