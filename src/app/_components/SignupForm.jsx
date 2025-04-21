"use client";
import { IconArrowLeft } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { signUpWithEmailAndPassword } from "@/firebase/authService";
import { useState } from "react";

export const SignUpForm = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!email || !password || !password2) {
      setFeedback("Please fill in all fields");
    } else if (password != password2) {
      setFeedback("Retyped password doesn't match");
    } else {
      const { user, error } = await signUpWithEmailAndPassword(email, password);
      if (user) {
        router.push("/");
      } else if (error) {
        switch (error.code) {
          case "auth/email-already-in-use":
            setFeedback("This email is already in use.");
            break;
          case "auth/invalid-email":
            setFeedback("Invalid email format.");
            break;
          case "auth/weak-password":
            setFeedback("Password should be at least 6 characters.");
            break;
          default:
            setFeedback("Signup failed. Please try again.");
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
            className="h-10 w-10 rounded-full flex items-center justify-center hover:bg-neutral-300 hover:dark:bg-neutral-800"
          >
            <IconArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold">Sign up</h1>
        </div>

        <form
          onSubmit={handleSignup}
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
          {feedback && <p className="mt-4 text-red-500">{feedback}</p>}
        </form>
      </div>
    </div>
  );
};
