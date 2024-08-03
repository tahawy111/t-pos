import { Icons } from "@/components/Icons";
import ProductImages from "@/components/products/showProducts/product-details";
import { Product } from "@prisma/client";

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <div className="center mt-7">
      <div className="grid grid-cols-1 md:grid-cols-[.8fr_1.2fr] gap-x-9 my-9">
        <div className="bg-white rounded-lg p-7">
          {/* <ProductImages images={product} /> */}
        </div>
        <div className="">
          <h2 className="font-medium my-7">{product.name}</h2>
          <p className="font-normal my-7">
            {new Date(product.createdAt).toLocaleDateString("ca")}
          </p>

          <div className="flex items-center gap-1 justify-between">
            <div className="text-2xl font-bold">
              ${product.price.toString()}
            </div>
            <button
              disabled={product.quantity < 1}
              className="btn-primary-outline py-1"
            >
              <span className="flex items-center gap-3">
                <div className="">Add To Cart</div> <Icons.CartIcon />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
