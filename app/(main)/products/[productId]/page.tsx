import { Icons } from "@/components/Icons";
import ProductDetails from "@/components/products/showProducts/product-details";
import ProductImages from "@/components/products/showProducts/product-images";
import { db } from "@/lib/db";
import { ProductWithImages } from "@/types/types";
import { Product } from "@prisma/client";

interface ProductDetailsPageProps {
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

export default async function ProductDetailsPage({
  params: { productId },
}: ProductDetailsPageProps) {
  const product = await fetchProduct(productId);
  return (
    <div>
      <ProductDetails product={product} />
    </div>
  );
}
