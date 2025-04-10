"use client";
import { IconArrowLeft } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { loginWithEmailAndPassword } from "@/lib/firebaseConfig";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (email, password) => {
    try {
      await loginWithEmailAndPassword(email, password);
      router.push("/");
    } catch (error) {
      alert(error.message);
    }
  };

  const getFriendlyError = (code) => {
    switch (code) {
      case "auth/invalid-email":
        return "Invalid email format";
      case "auth/user-not-found":
        return "No account found with this email";
      case "auth/wrong-password":
        return "Incorrect password";
      case "auth/too-many-requests":
        return "Too many attempts. Try again later or reset your password";
      default:
        return "Login failed. Please try again";
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white rounded-lg p-2 w-full max-w-md dark:bg-neutral-900">
        <div className="mb-8 flex items-center gap-3">
          <button
            onClick={() => router.push("/")}
            className="h-10 w-10 rounded-full flex items-center justify-center hover:bg-neutral-300 hover:dark:bg-neutral-800"
          >
            <IconArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold">Login</h1>
        </div>
        <form
          action="/login"
          method="post"
          className="flex flex-col border p-6 rounded-lg shadow-md"
        >
          <label htmlFor="email" className="mb-2">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            required
            className="bg-gray-200 dark:bg-gray-100 border rounded-lg py-2 px-4 w-full outline-none text-black"
          />
          <label htmlFor="password" className="mb-2 mt-4">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            required
            className="bg-gray-200 dark:bg-gray-100 border rounded-lg py-2 px-4 w-full outline-none text-black"
          />
          <button
            type="submit"
            className="bg-orange-600 hover:bg-orange-700 font-bold py-2 px-4 rounded-lg my-6 w-full"
            onClick={handleLogin}
          >
            Login
          </button>
          <h2 className="text-center font-semibold">Or</h2>
          <button
            type="button"
            className="bg-orange-600 hover:bg-orange-700 font-bold py-2 px-4 rounded-lg mt-6 mb-2 w-full"
            onClick={() => router.push("/signup")}
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}
