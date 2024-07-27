import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

async function AuthLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();

  if (session && session.user) {
    redirect("/");
  }
  
  console.log(await db.company.deleteMany());
  console.log(await db.user.deleteMany());

  return <div className="h-full">{children}</div>;
}

export default AuthLayout;
