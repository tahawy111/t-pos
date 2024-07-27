import LoginForm from "@/components/auth/login-form";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import {} from "react";

interface LoginPageProps {}

export default async function LoginPage({}: LoginPageProps) {
  const session = await getServerSession();

  const user = await db.user.findFirst();

  if (!user && !session?.user) {
    redirect("/register");
  }

  return (
    <div className="flex items-center justify-center h-full">
      <div className="">
        <h1 className="text-center text-xl font-bold text-neutral-700/50 my-3">
          Welcome Back 🖐🖐🖐
        </h1>
        <LoginForm />
      </div>
    </div>
  );
}
