"use client"

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/users/logout");
    router.push("/login"); // Redirect to login page
  };

  return (
    <Button onClick={handleLogout} className="mx-8" variant="destructive">
      Logout
    </Button>
  );
};
