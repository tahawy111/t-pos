import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function ProductsPage() {
  return (
    <div className="h-full">
      <div className="flex justify-between w-full">
        <Breadcrumb className="py-3 px-3">
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link href="/">Home</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <Link href="/products">products</Link>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <Link href={"/products/add"}>
          <Button>Add New Product</Button>
        </Link>
      </div>
    </div>
  );
}
