import AddProductForm from "@/components/products/add/add-product-form";
import EditProductForm from "@/components/products/edit/edit-product-form";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { db } from "@/lib/db";
import { ProductWithImages } from "@/types/types";
import Link from "next/link";

interface pageProps {
  params: {
    productId: string;
  };
}

async function fetchProduct(productId: string): Promise<ProductWithImages> {
  try {
    const product = await db.product.findUnique({
      where: { id: productId },
      include: { images: true },
    });
    if (!product) throw new Error("Product Not Found");

    return product;
  } catch (error: any) {
    console.log(error);
    return {} as ProductWithImages;
  }
}

export default async function page({ params: { productId } }: pageProps) {
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
            <Link href={`/products/edit/${productId}`}>Edit Product</Link>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <EditProductForm product={product} />
    </div>
  );
}
