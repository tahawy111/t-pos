"use client";

import { cn } from "@/lib/utils";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import {} from "react";

interface UserButtonProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {}

export default function UserButton({ className, ...props }: UserButtonProps) {
  const { data } = useSession();
  // const logout = () => {
  //   signOut().then(() => {
  //     return redirect("/login");
  //   });
  // };

  return (
    <div className={cn("", className)} {...props}>
      <button className="flex justify-between gap-x-3">
        {data?.user && (
          <div className="relative w-12 h-12">
            <Image
              className="rounded-full"
              fill
              src={(data.user?.image && data.user.image) || ""}
              alt="Profile Picture"
            />
          </div>
        )}
        <div className="flex flex-col items-start text-neutral-600/90">
          <p className="font-semibold">{data?.user.name}</p>
          <p className="text-sm">{data?.user.email}</p>
        </div>
      </button>
    </div>
  );
}
