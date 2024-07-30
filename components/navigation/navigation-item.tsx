"use client";
import { ChevronDown, Settings } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface NavigationItemProps {
  item: any;
}

const NavigationItem = ({ item }: NavigationItemProps) => {
  const [open, setOpen] = useState(false);
  if (item.children) {
    return (
      <div
        className={`sidebar-item px-3 py-4 block text-xl hover:bg-zinc-300/30 transition-colors duration-150 rounded-md`}
      >
        <div
          className={`sidebar-title flex justify-between items-center`}
          onClick={() => setOpen((prev) => !prev)}
        >
          <span className={`flex justify-between gap-x-3 items-center`}>
            {item.Icon && <item.Icon />}
            <span>{item.title}</span>
          </span>
          <ChevronDown
            className={`fa-solid fa-angle-down mt-2 cursor-pointer transition-transform duration-100 ${
              open ? `rotate-180` : ``
            }`}
          />
        </div>
        <div
          className={`sidebar-content pt-1 h-0 overflow-hidden transition-transform duration-300 ${
            open ? `h-auto` : ``
          }`}
        >
          {item.children.map((item: any, index: number) => (
            <NavigationItem item={item} key={index} />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <Link
        href={item.path || ""}
        className={`sidebar-item px-3 py-4 block text-xl hover:bg-neutral-400/30 transition-colors duration-150 rounded-md hover:underline`}
      >
        <div className={`sidebar-title flex justify-between items-center`}>
          <span className={`flex justify-between gap-x-3 items-center`}>
            {item.Icon && <item.Icon />}
            <span>{item.title}</span>
          </span>
        </div>
      </Link>
    );
  }
};

export default NavigationItem;
