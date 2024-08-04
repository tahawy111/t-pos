import ProductDetails from "@/components/products/showProducts/product-details";
import { db } from "@/lib/db";
import { ProductWithImages } from "@/types/types";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

interface ProductDetailsPageProps {
  params: {
    productId: string;
  };
}

async function fetchProduct(productId: string): Promise<ProductWithImages> {
  try {
    const product = await db.product.findUnique({
      where: { id: productId },
      include: { images: { orderBy: { createdAt: "asc" } } },
    });
    if (!product) throw new Error("Product Not Found");

    return product;
  } catch (error: any) {
    console.log(error);
    return {} as ProductWithImages;
  }
}

export default async function ProductDetailsPage({
  params: { productId },
}: ProductDetailsPageProps) {
  const product = await fetchProduct(productId);
  return (
    <div>
      <Breadcrumb className="py-3 px-3">
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link href="/">Home</Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <Link href="/products">products</Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <Link href={`/products/${productId}`}>Product Details</Link>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <ProductDetails product={product} />
    </div>
  );
}
