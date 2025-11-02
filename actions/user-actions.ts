"use server";

import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { signIn, signOut, auth } from "@/auth";
import { RegisterFormSchema } from "@/lib/schemas/register-form";
import { supabase } from "@/lib/supabase";
import type { RegisterState } from "@/types/errors/register";

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

export async function authenticate(_prevState: string | undefined, formData: FormData) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function logout() {
  await signOut({ redirectTo: "/" });
}
