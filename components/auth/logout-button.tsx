"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LogoutButtonProps {}

export default function LogoutButton({}: LogoutButtonProps) {
  const router = useRouter();
  const logout = () => {
    signOut().then(() => {
      return router.push("/login");
    });
  };

  return (
    <Button className="flex gap-3" onClick={logout} variant={"ghost"}>
      <LogOut className="w-4 h-4" /> <p>Logout</p>
    </Button>
  );
}
