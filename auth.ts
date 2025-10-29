import { authConfig } from "@/auth.config";
import { supabase } from "@/lib/supabase";
import type { User } from "@/types/user";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

async function getUser(email: string): Promise<User | undefined> {
  try {
    const { data, error } = await supabase.from("users").select().eq("email", email);

    if (error) {
      console.error("Supabase error:", error);
      throw new Error("Failed to fetch user.");
    }

    return data?.[0];
  } catch (err) {
    console.error("Unexpected error in getUser:", err);
    throw err;
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) return user;
        }

        console.log("Invalid credentials");
        return null;
      },
    }),
  ],
});
