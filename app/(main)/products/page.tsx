import { ProductDataTable } from "@/components/products/showProducts/product-data-table";
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
import {
  ProductTable,
  columns,
} from "@/components/products/showProducts/product-columns";
import { db } from "@/lib/db";

async function getData(): Promise<ProductTable[]> {
  try {
    const products = await db.product.findMany();

    const productsMap = products.map(
      ({ id, name, price, dealerPrice, wholesalePrice, quantity }) => ({
        id,
        name,
        price: price.toString(),
        dealerPrice: dealerPrice?.toString() || "0",
        wholesalePrice: wholesalePrice?.toString() || "0",
        quantity: quantity.toString(),
      })
    );
    return productsMap;
  } catch (error) {
    return [];
  }
}

export default async function ProductsPage() {
  const data = await getData();
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

      <div className="container mx-auto py-10">
        <ProductDataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
