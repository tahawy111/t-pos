import { Icons } from "@/components/Icons";
import ProductImages from "@/components/products/showProducts/product-images";
import { Button } from "@/components/ui/button";
import { getAuthSession } from "@/lib/auth";
import { ProductWithImages } from "@/types/types";

interface ProductDetailsProps {
  product: ProductWithImages;
}

export default async function ProductDetails({ product }: ProductDetailsProps) {
  const session = await getAuthSession();
  return (
    <div className="center mt-7">
      <div className="grid grid-cols-1 md:grid-cols-[.8fr_1.2fr] gap-x-9 my-9">
        <div className="bg-white rounded-lg p-7">
          <ProductImages images={product.images} />
        </div>
        <div className="">
          <h2 className="font-medium my-7">{product.name}</h2>
          <p className="font-normal my-7">
            {new Date(product.createdAt).toLocaleDateString("ca")}
          </p>

          <div className="flex items-center gap-1 justify-between">
            <div className="text-2xl font-bold space-x-1">
              <span> {product.price.toString()}</span>
              <span>{session?.user.currency}</span>
            </div>
            <Button
              className="flex items-center gap-3"
              variant={"successOutline"}
              disabled={product.quantity < 1}
            >
              <div className="">Add To Cart</div> <Icons.CartIcon />
            </Button>
          </div>

          <div className="space-y-3">
            <Button className="" variant={"warningOutline"}>Edit</Button>
            <Button className="" variant={"roseOutline"}>Delete</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
