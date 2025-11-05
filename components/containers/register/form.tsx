"use client";

import { IconNotebook } from "@tabler/icons-react";
import Link from "next/link";
import { useActionState } from "react";
import { register } from "@/actions/user-actions";
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
import type { RegisterState } from "@/types/user";

export default function RegisterForm() {
  const initialState: RegisterState = { message: null, errors: {} };
  const [state, formAction, isPending] = useActionState(register, initialState);

  return (
    <Card className="w-full max-w-md">
      <div className="mb-8 flex items-center justify-center gap-2 text-[#133e87]">
        <IconNotebook className="!size-10 bg-red" />
        <span className="font-semibold text-2xl">Habit Log</span>
      </div>
      <CardHeader>
        <CardTitle>会員登録</CardTitle>
        <CardDescription></CardDescription>
        <CardAction>
          <Button variant="link">
            <Link href="/login">ログイン</Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form id="register-form" action={formAction}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="username">ユーザーネーム</Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="ユーザーネームを入力して下さい"
                required
              />
              <div aria-live="polite" aria-atomic="true">
                {state?.errors?.username?.map((error: string) => (
                  <p className="mt-2 text-red-500 text-sm" key={error}>
                    {error}
                  </p>
                ))}
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">メールアドレス</Label>
              <Input id="email" name="email" type="email" placeholder="m@example.com" required />
              <div aria-live="polite" aria-atomic="true">
                {state?.errors?.email?.map((error: string) => (
                  <p className="mt-2 text-red-500 text-sm" key={error}>
                    {error}
                  </p>
                ))}
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">パスワード</Label>
              <Input id="password" name="password" type="password" required />
              <div aria-live="polite" aria-atomic="true">
                {state?.errors?.password?.map((error: string) => (
                  <p className="mt-2 text-red-500 text-sm" key={error}>
                    {error}
                  </p>
                ))}
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmed-password">確認用パスワード</Label>
              <Input id="confirmed-password" name="confirmed-password" type="password" required />
              <div aria-live="polite" aria-atomic="true">
                {state?.errors?.confirmedPassword?.map((error: string) => (
                  <p className="mt-2 text-red-500 text-sm" key={error}>
                    {error}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <Button type="submit" className="w-full" form="register-form" aria-disabled={isPending}>
            登録
          </Button>
          {state?.message && <p className="mt-2 text-red-500 text-sm">{state.message}</p>}
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2"></CardFooter>
    </Card>
  );
}
