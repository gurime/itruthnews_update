"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "../utils/supabase/client";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setMessage("");

    if (password.length < 6) {
      setError("Your password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      setMessage("Your password has been updated. You can now sign in.");
      setPassword("");
      setConfirmPassword("");
    } catch (error: unknown) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to update your password. Request a new reset link and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-linear-to-r from-blue-500 to-blue-900 flex items-center justify-center p-4">
      <section className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <Link href="/" className="block text-center mb-6">
          <Image
            src="/images/it_news.png"
            alt="iTruth News Logo"
            width={200}
            height={80}
            className="mx-auto"
          />
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">
          Set a New Password
        </h1>
        <p className="text-gray-600 text-sm text-center mb-6">
          Enter and confirm your new password.
        </p>

        {error && (
          <p role="alert" className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg mb-4 text-sm">
            {error}
          </p>
        )}
        {message && (
          <p role="status" className="bg-green-50 border border-green-200 text-green-700 p-3 rounded-lg mb-4 text-sm">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            New password
            <input
              type="password"
              autoComplete="new-password"
              minLength={6}
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900"
            />
          </label>
          <label className="block text-sm font-medium text-gray-700">
            Confirm new password
            <input
              type="password"
              autoComplete="new-password"
              minLength={6}
              required
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900"
            />
          </label>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold py-3 px-4 rounded-lg disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm">
          <Link href="/login" className="text-blue-700 hover:underline">
            Back to sign in
          </Link>
        </p>
      </section>
    </main>
  );
}