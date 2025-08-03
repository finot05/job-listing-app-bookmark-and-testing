"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

type FormData = {
  email: string;
  password: string;
};

const Login = () => {
  const [loginError, setLoginError] = useState("");
  const { handleSubmit, register, formState } = useForm<FormData>();
  const { errors, isSubmitting } = formState;
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    setLoginError(""); // reset error before new attempt

    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (res?.ok) {
      router.push("/");
    } else if (res?.error === "CredentialsSignin") {
      setLoginError("Invalid email or password.");
    } else {
      setLoginError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="w-full max-w-md p-8 shadow-lg rounded-lg">
        <h1 className="text-4xl text-blue-950 text-center font-extrabold mb-10">
          Welcome Back,
        </h1>

        {/*  Error Message Display */}
        {loginError && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-center text-sm font-medium">
            {loginError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email input */}
          <div className="mb-6">
            <label className="block text-gray-600 text-lg mb-2 font-semibold">
              Email Address
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
              placeholder="Enter email address"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-red-500 text-sm">{errors.email?.message}</p>
          </div>

          {/* Password input */}
          <div className="mb-6">
            <label className="block text-gray-600 text-lg mb-2 font-semibold">
              Password
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters",
                },
              })}
              placeholder="Enter password"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-red-500 text-sm">{errors.password?.message}</p>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-4 py-3 rounded-full text-white font-bold w-full  ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "  bg-blue-800  hover:bg-blue-500 transition  "
            }`}
          >
            {isSubmitting ? "Logging..." : "Log in"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="text-blue-700 font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;