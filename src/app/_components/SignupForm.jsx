"use client";
import { IconArrowLeft } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { signUpWithEmailAndPassword } from "@/lib/firebaseConfig";
import { useState } from "react";

export const SignUpForm = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let message;
    if (password != password2) {
      alert("Passwords do not match");
    }
    message = await signUpWithEmailAndPassword(email, password);
    if ("Registration Successful! Try logging in!" === message) {
      alert(message);
      router.push("/login");
    }
    alert(message);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white rounded-lg p-2 w-full max-w-md dark:bg-neutral-900">
        <div className="mb-8 flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="h-10 w-10 rounded-full flex items-center justify-center hover:bg-neutral-300 hover:dark:bg-neutral-800"
          >
            <IconArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold">Sign Up</h1>
        </div>

        <form
          onSubmit={handleSubmit}
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
          <label htmlFor="password" className="mb-2 mt-4">
            Retype Password:
          </label>
          <input
            type="password"
            id="password2"
            name="password2"
            placeholder="Retype your password"
            required
            onChange={(e) => setPassword2(e.target.value)}
            className="bg-gray-200 dark:bg-gray-100 border rounded-lg py-2 px-4 w-full outline-none text-black"
          />
          <button
            type="submit"
            className="bg-orange-600 hover:bg-orange-700 font-bold py-2 px-4 rounded-lg mt-6 mb-2 w-full"
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};
