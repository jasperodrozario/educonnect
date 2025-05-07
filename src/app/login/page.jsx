"use client";
import { IconArrowLeft } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { loginWithEmailAndPassword } from "@/firebase/authService";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setFeedback("Please fill in all fields");
    } else {
      const { user, error } = await loginWithEmailAndPassword(email, password);
      if (user) {
        window.location.href = "/";
      } else if (error) {
        switch (error.code) {
          case "auth/invalid-email":
            setFeedback("Invalid email format");
          case "auth/user-not-found":
            setFeedback("No account found with this email");
          case "auth/wrong-password":
            setFeedback("Incorrect password");
          case "auth/too-many-requests":
            setFeedback(
              "Too many attempts. Try again later or reset your password"
            );
          default:
            setFeedback("Login failed. Please try again");
        }
      }
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white rounded-lg p-2 pb-6 w-full max-w-md dark:bg-neutral-900">
        <div className="mb-8 flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="h-10 w-10 rounded-full flex items-center justify-center hover:bg-neutral-300 dark:hover:bg-neutral-800"
          >
            <IconArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold">Login</h1>
        </div>
        <form
          onSubmit={handleLogin}
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
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-200 dark:bg-gray-100 border rounded-lg py-2 px-4 w-full outline-none text-black"
          />
          {feedback && <p className="mt-4 text-red-500">{feedback}</p>}
          <button
            type="submit"
            className="text-white font-bold py-2 px-4 rounded-lg my-6 w-full bg-orange-500 hover:bg-orange-400"
            onClick={handleLogin}
          >
            Login
          </button>
          <h2 className="text-center font-semibold">Or</h2>
          <button
            type="button"
            className="text-white font-bold py-2 px-4 rounded-lg my-6 w-full bg-orange-500 hover:bg-orange-400"
            onClick={() => router.push("/signup")}
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}
