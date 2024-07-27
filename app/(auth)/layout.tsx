import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

async function AuthLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();

  const user = await db.user.findFirst();

  if (user && session && session.user) {
    redirect("/");
  }

  // console.log(await db.company.deleteMany());
  // console.log(await db.user.deleteMany());

  return (
    <div className="h-full">
      <h1 className="text-center text-3xl font-bold text-neutral-700/80 my-3">
        Welcome to T-POS Application
      </h1>
      {children}
    </div>
  );
}

export default AuthLayout;
