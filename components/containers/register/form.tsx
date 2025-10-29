"use client";

import Link from "next/link";
import { useActionState } from "react";
import { register } from "@/actions/user-actions";
import { Button } from "@/components/ui/button";
import type { RegisterState } from "@/types/errors/register";

export default function RegisterForm() {
  const initialState: RegisterState = { message: null, errors: {} };
  const [state, formAction] = useActionState(register, initialState);

  return (
    <form action={formAction} className="">
      <div className="">
        <h1 className="mb-10 font-bold text-2xl">会員登録</h1>
        <div className="w-full">
          <div className="mt-4">
            <label className="mt-5 mb-3 block font-medium text-xs" htmlFor="name">
              ユーザーネーム
            </label>
            <div className="relative">
              <input
                className="w-full rounded-2xl bg-[#ffffff] p-3"
                id="name"
                type="text"
                name="name"
                placeholder="ユーザーネームを入力してください"
                maxLength={50}
                required
              />
            </div>
            <div aria-live="polite" aria-atomic="true">
              {state?.errors?.name?.map((error: string) => (
                <p className="mt-2 text-red-500 text-sm" key={error}>
                  {error}
                </p>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <label className="mt-5 mb-3 block font-medium text-xs" htmlFor="email">
              メールアドレス
            </label>
            <div className="relative">
              <input
                className="w-full rounded-2xl bg-[#ffffff] p-3"
                id="email"
                type="email"
                name="email"
                placeholder="メールアドレスを入力してください"
                maxLength={50}
                required
              />
            </div>
            <div aria-live="polite" aria-atomic="true">
              {state?.errors?.email?.map((error: string) => (
                <p className="mt-2 text-red-500 text-sm" key={error}>
                  {error}
                </p>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <label className="mt-5 mb-3 block font-medium text-xs" htmlFor="password">
              パスワード
            </label>
            <div className="relative">
              <input
                className="w-full rounded-2xl bg-[#ffffff] p-3"
                id="password"
                type="password"
                name="password"
                placeholder="パスワードを入力してください"
                required
                minLength={6}
              />
            </div>
            <div aria-live="polite" aria-atomic="true">
              {state?.errors?.password?.map((error: string) => (
                <p className="mt-2 text-red-500 text-sm" key={error}>
                  {error}
                </p>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <label className="mt-5 mb-3 block font-medium text-xs" htmlFor="confirmed-password">
              確認用パスワード
            </label>
            <div className="relative">
              <input
                className="w-full rounded-2xl bg-[#ffffff] p-3"
                id="confirmed-password"
                type="password"
                name="confirmedPassword"
                placeholder="再度パスワードを入力してください"
                required
                minLength={6}
              />
            </div>
            <div aria-live="polite" aria-atomic="true">
              {state?.errors?.confirmedPassword?.map((error: string) => (
                <p className="mt-2 text-red-500 text-sm" key={error}>
                  {error}
                </p>
              ))}
            </div>
          </div>
        </div>
        {state?.message && <p className="mt-2 text-red-500 text-sm">{state.message}</p>}
        <Button className="w-full">登録</Button>
        <p className="mt-6 flex gap-4">
          ア_p_className
          <Link href="/login" className="font-medium">
            ログイン
          </Link>
        </p>
      </div>
    </form>
  );
}
