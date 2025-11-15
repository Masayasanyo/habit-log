"use server";

import { auth, signIn, signOut } from "@/auth";
import { LoginFormSchema } from "@/lib/schemas/login-form";
import { RegisterFormSchema } from "@/lib/schemas/register-form";
import { supabase } from "@/lib/supabase";
import type { RegisterState } from "@/types/user";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";

export async function getUserId() {
  const session = await auth();
  const userIdString: string = session?.user?.id as string;
  const userId = Number(userIdString);

  return userId;
}

export async function register(_prevState: RegisterState | undefined, formData: FormData) {
  const validatedFields = RegisterFormSchema.safeParse({
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmedPassword: formData.get("confirmed-password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "会員登録に失敗しました。",
    };
  }

  const { username, email, password } = validatedFields.data;

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const { error } = await supabase
    .from("users")
    .insert({ username: username, email: email, password: hashedPassword });
  if (error) {
    if (error.code === "23505") {
      return {
        message: "このメールアドレスはすでに使用されています。",
      };
    }
    return {
      message: "会員登録に失敗しました。",
    };
  }
  await signIn("credentials", formData);
}

export async function authenticate(formData: FormData) {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "ログインに失敗しました。",
    };
  }

  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            message: "メールアドレスまたはパスワードに誤りがあります。",
          };
        default:
          return {
            message: "ログインに失敗しました。",
          };
      }
    }
    throw new Error("ログインに失敗しました。");
  }
}

export async function logout() {
  await signOut({ redirectTo: "/" });
}
