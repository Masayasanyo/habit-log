// TODO: change text color or bg color

import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <div className="mt-30 flex w-full items-center justify-center gap-4">
      <Spinner className="size-8 text-primary" />
      <span className="text-xl">読み込み中...</span>
    </div>
  );
}
