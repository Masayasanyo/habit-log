import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "@/auth.config";
import { supabase } from "@/lib/supabase";
import type { User } from "@/types/user";
import { LoginFormSchema } from "./lib/schemas/login-form";

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
        const validatedFields = LoginFormSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          const user = await getUser(email);
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (session.user) session.user.id = token.id as string;
      return session;
    },
  },
});
