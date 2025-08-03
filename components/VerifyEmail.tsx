"use client";

import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const VerifyEmail = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const email = searchParams.get("email") || "";

  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [resendMessage, setResendMessage] = useState("");

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setResendMessage("");

    const trimmedCode = code.trim();

    if (!trimmedCode) {
      setError("Verification code is required.");
      return;
    }

    if (trimmedCode.length !== 4) {
      setError("Verification code must be 4 digits.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        "https://akil-backend.onrender.com/verify-email",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, OTP: trimmedCode }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("Email verified successfully! You can now log in.");
        router.push("/login");
      } else {
        setError(data.message || "Verification failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = () => {
    setError("");
    setResendMessage(
      "Please check your inbox or spam folder for the verification code."
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-blue-950 mb-6">
          Verify Your Email
        </h1>
        <p className="text-center mb-6">
          We sent a verification code to <strong>{email}</strong>. Please enter
          it below to activate your account.
        </p>

        {(error || resendMessage) && (
          <div
            className={`mb-4 p-3 rounded text-center text-sm font-medium ${
              error ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
            }`}
          >
            {error || resendMessage}
          </div>
        )}

        <form onSubmit={handleVerify}>
          <input
            type="text"
            inputMode="numeric"
            maxLength={4}
            placeholder="Enter 4-digit verification code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full p-3 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-900 text-white py-3 rounded-md hover:bg-blue-800 transition font-semibold"
          >
            {loading ? "Verifying..." : "Verify Email"}
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-600">
          Didn't receive a code?{" "}
          <button
            className="text-blue-700 font-semibold hover:underline"
            onClick={handleResend}
          >
            Resend Code
          </button>
        </p>
      </div>
    </div>
  );
};

export default VerifyEmail;