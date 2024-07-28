import LoginForm from "@/components/auth/login-form";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import {} from "react";

interface LoginPageProps {}

export default async function LoginPage({}: LoginPageProps) {
  const session = await getAuthSession();
  console.log(session);
  

  const user = await db.user.findFirst();

  if (!user && !session?.user) {
    redirect("/register");
  }
  if (user && session && session.user) {
    redirect("/");
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
