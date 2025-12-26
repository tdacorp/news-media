import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "admin" | "user";
      username?: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    role?: "admin" | "user";
    username?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: "admin" | "user";
    username?: string | null;
  }
}
