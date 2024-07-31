import { Menu } from "lucide-react";
import Link from "next/link";
import SidebarMenuToggle from "./sidebar-menu-toggle";

interface NavbarProps {}

export default function Navbar({}: NavbarProps) {
  return (
    <nav className="font-sans flex justify-between text-center py-3 px-6 bg-white shadow w-full items-center h-[65px] fixed md:pl-64">
      <div className="">
        <Link
          href="/"
          className="text-2xl no-underline text-grey-darkest hover:text-blue-dark ml-3"
        >
          T-POS
        </Link>
      </div>
      <div className="">
      <SidebarMenuToggle />
      </div>
    </nav>
  );
}
