"use client";
import { useRouter } from "next/navigation";
import { IconSettings, IconArrowLeft } from "@tabler/icons-react";
import { DarkModeToggler } from "@/components/ui/DarkModeToggler";
import { Button } from "@/components/ui/Button";

export default function SettingsPage() {
  const router = useRouter();

  // Handler for the "Login as Admin" button
  const handleAdminLogin = async () => {
    // Navigate to the admin route
    window.location.href = "/admin";
  };

  return (
    <div className="container max-w-full mx-auto px-4 py-8">
      <div className="mb-8 flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="h-10 w-10 rounded-full flex items-center justify-center hover:bg-neutral-300 hover:dark:bg-neutral-800"
        >
          <IconArrowLeft size={20} />
        </button>
        <div className="h-10 w-10 rounded-full bg-orange-600 flex items-center justify-center text-white">
          <IconSettings size={20} />
        </div>
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>

      <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-md p-6 border border-neutral-300 dark:border-neutral-700 overflow-scroll">
        <div className="flex items-center gap-4">
          <h1 className="font-semibold">Toggle Dark Mode:</h1>
          <DarkModeToggler />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="my-4 text-sm text-orange-300">Want special access?</h2>
          <Button onClick={handleAdminLogin}>Login as Admin</Button>
        </div>
      </div>
    </div>
  );
}
