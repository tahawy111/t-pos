import { Icons } from "@/components/Icons";
import ProductDetails from "@/components/products/showProducts/product-details";
import ProductImages from "@/components/products/showProducts/product-images";
import { db } from "@/lib/db";
import { Product } from "@prisma/client";

interface ProductDetailsPageProps {
  params: {
    productId: string;
  };
}

async function fetchProduct(productId: string): Promise<Product> {
  try {
    const product = await db.product.findUnique({ where: { id: productId } });
    if (!product) throw new Error("Product Not Found");

    return product
  } catch (error: any) {
    console.log(error);
    return {} as Product;
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
