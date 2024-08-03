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

async function getData(
  page = 1,
  pageSize = Number(process.env.NEXT_PUBLIC_PAGINATION_PAGE_SIZE)
): Promise<{ data: ProductTable[]; totalPages: number }> {
  try {
    const [data, productsCount] = await Promise.all([
      db.product.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: {
          createdAt: "desc",
        },
      }),
      db.product.count(),
    ]);

    const totalPages = Math.ceil(productsCount / pageSize);

    const productsMap = data.map(
      ({ id, name, price, dealerPrice, wholesalePrice, quantity }) => ({
        id,
        name,
        price: price.toString(),
        dealerPrice: dealerPrice?.toString() || "0",
        wholesalePrice: wholesalePrice?.toString() || "0",
        quantity: quantity.toString(),
      })
    );

    return { data: productsMap, totalPages };
  } catch (error) {
    return { data: [], totalPages: 0 };
  }
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { data, totalPages } = await getData(
    Number(searchParams.page) || 1,
    Number(searchParams.pageSize) ||
      Number(process.env.NEXT_PUBLIC_PAGINATION_PAGE_SIZE)
  );
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
        <ProductDataTable
          columns={columns}
          data={data}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
}
