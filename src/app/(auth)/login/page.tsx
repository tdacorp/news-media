"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { registerUser } from "@/app/(admin-panel)/admin/users/_actions/register";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);

    if (isLogin) {
      const res = await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid email or password");
      } else {
        router.push("/");
        router.refresh();
      }
    } else {
      const res = await registerUser(formData);
      if (res?.error) {
        setError(
          typeof res.error === "string" ? res.error : "Validation failed"
        );
      } else {
        setIsLogin(true);
        alert("Account created! Please login.");
      }
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isLogin
              ? "Login to manage your news"
              : "Join our news media platform"}
          </p>
        </div>

        {error && (
          <div className="rounded bg-red-50 p-3 text-sm text-red-500">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          {!isLogin && (
            <>
              <input
                name="name"
                type="text"
                placeholder="Full Name"
                required
                className="w-full rounded-md border p-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <input
                name="username"
                type="text"
                placeholder="Username"
                required
                className="w-full rounded-md border p-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </>
          )}
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            required
            className="w-full rounded-md border p-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            className="w-full rounded-md border p-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <button
            disabled={loading}
            className="w-full rounded-md bg-blue-600 py-2 text-white hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Processing..." : isLogin ? "Sign In" : "Register"}
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-gray-500">
              Or continue with
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
            className="flex w-full items-center justify-center gap-2 rounded-md border py-2 hover:bg-gray-50 transition cursor-pointer"
          >
            <span>GitHub</span>
          </button>
        </div>

        <p className="text-center text-sm text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="font-semibold text-blue-600 hover:underline cursor-pointer"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}
