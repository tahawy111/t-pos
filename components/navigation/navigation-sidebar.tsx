"use client";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

import NavigationItem from "@/components/navigation/navigation-item";
import { useState } from "react";
import {
  Bug,
  FileQuestion,
  Home,
  Info,
  List,
  Package,
  Phone,
  Settings,
  User,
} from "lucide-react";
import Link from "next/link";
import LogoutButton from "../auth/logout-button";
import UserButton from "../auth/user-button";
import { Icons } from "@/components/Icons";
export default function NavigationSidebar() {
  const sidebar = [
    {
      title: "Inventory",
      Icon: Package,
      children: [
        {
          title: "Products",
          Icon: Icons.Products,
          path: "/products",
        },
        {
          title: "About",
          Icon: Info,
          path: "/about",
        },
        {
          title: "Contact",
          Icon: Phone,
          children: [
            {
              title: "Facebook",
            },
            {
              title: "Twitter",
            },
            {
              title: "Instagram",
            },
          ],
        },
        {
          title: "FAQ",
          Icon: FileQuestion,
        },
      ],
    },
    {
      title: "Account",
      Icon: Info,
      children: [
        {
          title: "Login",
          path: "/login",
        },
        {
          title: "Register",
          path: "/register",
        },
        {
          title: "Forgot Password",
          path: "/forgot-password",
        },
        {
          title: "Reset Password",
          path: "/reset-password",
        },
      ],
    },
    {
      title: "Profile",
      Icon: User,
      children: [
        {
          title: "Profile",
          path: "/profile",
        },
        {
          title: "Settings",
          children: [
            {
              title: "Account",
              path: "/settings/account",
            },
            {
              title: "Billing",
              children: [
                {
                  title: "Payment",
                  path: "/settings/billing/payment",
                },
                {
                  title: "Subscription",
                  path: "/settings/billing/subscription",
                },
              ],
            },
            {
              title: "Notifications",
              path: "/settings/notifications",
            },
          ],
        },
        {
          title: "Logout",
          path: "/logout",
        },
      ],
    },
    {
      title: "Advance",
      Icon: List,
      children: [
        {
          title: "Search",
          path: "/search",
        },
        {
          title: "History",
          path: "/history",
        },
      ],
    },
    {
      title: "Support",
      Icon: FileQuestion,
      path: "/support",
    },
    {
      title: "Report Bug",
      Icon: Bug,
      path: "/report-bug",
    },
  ];

  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex flex-col items-center h-[calc(100vh-65px)] text-primary w-full bg-gray-50">
      <div className="text-3xl font-semibold text-center my-3 flex justify-evenly items-center md:hidden">
        <Link href={`/`}>T-POS</Link>
      </div>
      <ScrollArea className="flex-1 w-full">
        <hr />
        {sidebar.map((item: any, index: number) => (
          <NavigationItem key={index} item={item} />
        ))}
      </ScrollArea>

      <Separator className="h-[1px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-full my-3 mx-auto" />

      <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
        <UserButton />
        <LogoutButton />
      </div>
    </div>
  );
}
