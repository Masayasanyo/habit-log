"use client";

import { authenticate } from "@/actions/user-actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { IconNotebook } from "@tabler/icons-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Toaster, toast } from "sonner";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const [isPending, setIsPending] = useState(false);
  // const [error, setError] = useState(undefined);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const formData = new FormData(e.currentTarget);
      setIsPending(true);
      await authenticate(formData);
      setIsPending(false);
      toast.success("ログインに成功しました！");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
      setIsPending(false);
    }
  }

  return (
    <Card className="mx-4 w-sm md:w-md">
      <div className="mb-8 flex items-center justify-center gap-2 text-[#133e87]">
        <IconNotebook className="size-10 bg-red" />
        <span className="font-semibold text-2xl">Habit Log</span>
      </div>
      <CardHeader>
        <CardTitle>ログイン</CardTitle>
        <CardDescription></CardDescription>
        <CardAction>
          <Button variant="link">
            <Link href="/register">会員登録</Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Toaster richColors position="top-center" />
        <form id="login-form" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">メールアドレス</Label>
              <Input id="email" name="email" type="email" placeholder="m@example.com" />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">パスワード</Label>
                <a
                  href="/login/forgot-password"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  パスワードを忘れた場合
                </a>
              </div>
              <Input id="password" name="password" type="password" />
            </div>
          </div>
          <input type="hidden" name="redirectTo" value={callbackUrl} />
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full" form="login-form" aria-disabled={isPending}>
          {isPending && <Spinner />}
          ログイン
        </Button>
      </CardFooter>
    </Card>
  );
}
