import Navbar from "@/components/navigation/navbar";
import NavigationSidebar from "@/components/navigation/navigation-sidebar";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAuthSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div>
      <Navbar />
      <div className="flex">
        <div className="hidden md:block inset-y-0">
          <NavigationSidebar />
        </div>
        <div className="w-screen p-2 mt-[65px] md:mt-0 mb-[65px] md:pl-64 md:pt-[65px]">{children}</div>
      </div>
    </div>
  );
}
