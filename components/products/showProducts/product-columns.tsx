"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Eye, MoreHorizontal, PenBox, View } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProductTable = {
  id: string;
  name: string;
  price: string;
  dealerPrice: string;
  quantity: string;
};

export const columns: ColumnDef<ProductTable>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "dealerPrice",
    header: "Dealer price",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const product = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(product.id)}
            >
              Compy Product ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <Link href={`/products/${product.id}`}>
              <DropdownMenuItem className="flex gap-x-1">
                <Eye className="text-blue-500" /> <span>View Product</span>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem className="flex gap-x-1">
              <PenBox className="text-yellow-500" /> <span>Edit Product</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
