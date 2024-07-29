import Navbar from "@/components/layout/navbar";
import NavigationSidebar from "@/components/layout/navigation-sidebar";
import { getAuthSession } from "@/lib/auth";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAuthSession();

  return (
    <div>
      <Navbar />
      <div className="flex">
        <div className="">
          <NavigationSidebar />
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
