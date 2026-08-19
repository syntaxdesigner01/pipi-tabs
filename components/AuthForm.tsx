"use client";

import { FormEvent, useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";

export default function AuthForm({ redirectTo }: { redirectTo: string }) {
  const { signIn } = useAuthActions();
  const [mode, setMode] = useState<"signIn" | "signUp">("signIn");
  const [submitting, setSubmitting] = useState(false);
  const [googleSubmitting, setGoogleSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;
    const username = (form.elements.namedItem("username") as HTMLInputElement | null)?.value.trim();

    try {
      await signIn("password", { email, password, flow: mode, ...(mode === "signUp" ? { username } : {}) });
    } catch (err: any) {
      setError(err?.message || "Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  async function handleGoogle() {
    setError(null);
    setGoogleSubmitting(true);
    try {
      await signIn("google", { redirectTo });
    } catch (err: any) {
      setError(err?.message || "Google sign-in failed.");
      setGoogleSubmitting(false);
    }
  }

  return (
    <div className="w-full max-w-sm mx-auto bg-white/60 dark:bg-gray-800/60 backdrop-blur-md p-6 rounded-2xl shadow-sm border border-white/20 dark:border-gray-700/50 glass-card">
      <h2 className="text-2xl font-semibold text-center mb-6 dark:text-white">
        {mode === "signIn" ? "Sign in to Pipi" : "Create your Pipi account"}
      </h2>

      <button
        type="button"
        onClick={handleGoogle}
        disabled={googleSubmitting}
        className="w-full flex items-center justify-center gap-3 border border-gray-300 dark:border-gray-600 rounded-lg py-3 mb-6 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition disabled:opacity-50 disabled:cursor-not-allowed dark:text-white"
      >
        <i className="fa-brands fa-google" />
        Continue with Google
      </button>

      <div className="flex items-center gap-3 mb-6">
        <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
        <span className="text-xs text-gray-400">or</span>
        <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
      </div>

      <form className="flex flex-col gap-y-4" onSubmit={handleSubmit}>
        {mode === "signUp" && (
          <input
            type="text"
            name="username"
            placeholder="Username"
            required
            className="border-b-2 border-primary dark:border-gray-600 bg-transparent dark:text-white p-2 w-full outline-none focus:border-secondary"
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="border-b-2 border-primary dark:border-gray-600 bg-transparent dark:text-white p-2 w-full outline-none focus:border-secondary"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          minLength={8}
          className="border-b-2 border-primary dark:border-gray-600 bg-transparent dark:text-white p-2 w-full outline-none focus:border-secondary"
        />

        {error && (
          <p className="text-sm text-red-500 bg-red-50 dark:bg-red-900/30 rounded-md px-3 py-2">{error}</p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="bg-secondary text-white py-3 rounded-md font-semibold hover:bg-black transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? "Please wait…" : mode === "signIn" ? "Sign In" : "Sign Up"}
        </button>
      </form>

      <button
        type="button"
        onClick={() => setMode(mode === "signIn" ? "signUp" : "signIn")}
        className="w-full text-center text-sm text-gray-500 dark:text-gray-400 mt-4 hover:underline"
      >
        {mode === "signIn" ? "Need an account? Sign up" : "Already have an account? Sign in"}
      </button>
    </div>
  );
}
