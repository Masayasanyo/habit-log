import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <div className="mt-50 flex w-full text-secondary items-center justify-center gap-4">
      <Spinner className="size-8" />
      <span className="text-xl">読み込み中...</span>
    </div>
  );
}
