"use client";

import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { IconNotebook } from "@tabler/icons-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useActionState } from "react";
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

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined);

  return (
    <Card className="w-full max-w-md">
      <div className="mb-8 flex items-center justify-center gap-2 text-[#133e87]">
        <IconNotebook className="!size-10 bg-red" />
        <span className="font-semibold text-2xl">Habit Log</span>
      </div>
      <CardHeader>
        <CardTitle>ログイン</CardTitle>
        <CardDescription>
          メールアドレスとパスワードを入力して
          <br />
          「ログイン」ボタンをクリックして下さい。
        </CardDescription>
        <CardAction>
          <Button variant="link">
            <Link href="/register">会員登録</Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form id="login-form" action={formAction}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">メールアドレス</Label>
              <Input id="email" name="email" type="email" placeholder="m@example.com" required />
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
              <Input id="password" name="password" type="password" required />
            </div>
          </div>
          <input type="hidden" name="redirectTo" value={callbackUrl} />
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full" form="login-form" aria-disabled={isPending}>
          ログイン
        </Button>
        <div className="flex h-8 items-end space-x-1" aria-live="polite" aria-atomic="true">
          {errorMessage && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-red-500 text-sm">{errorMessage}</p>
            </>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
