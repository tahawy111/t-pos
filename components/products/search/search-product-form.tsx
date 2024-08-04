"use client";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { UploadCloud } from "lucide-react";
import { imageUpload } from "@/lib/ImageUplaod";
import Image from "next/image";
import { Product } from "@prisma/client";

interface SearchProductFormProps {}

export interface ProductFormInputs {
  productName: string;
  price: string;
  dealerPrice: string;
  wholesalePrice: string;
  barcode: string;
  quantity: number;
}

export default function SearchProductForm({}: SearchProductFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProductFormInputs>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [searchResult, setSearchResult] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/products/search", data)
      .then((res) => {
        // router.push(`/products/${res.data.id}`);
      })
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => setIsLoading(false));
  };

  // Initialize form values from URL search params
  useEffect(() => {
    const productName = searchParams.get("productName");
    const price = searchParams.get("price");
    const dealerPrice = searchParams.get("dealerPrice");
    const wholesalePrice = searchParams.get("wholesalePrice");
    const barcode = searchParams.get("barcode");
    const quantity = searchParams.get("quantity");
    if (productName) setValue("productName", productName);
    if (price) setValue("price", price);
    if (dealerPrice) setValue("dealerPrice", dealerPrice);
    if (wholesalePrice) setValue("wholesalePrice", wholesalePrice);
    if (barcode) setValue("barcode", barcode);
    if (quantity) setValue("quantity", +quantity);
  }, [searchParams, setValue]);

  // Handle input changes to update search params
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="w-full flex justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Search For Products 🔎
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="product-name" className="block text-gray-700 mb-2">
              Product Name
            </label>
            <Input
              type="text"
              id="product-name"
              className="w-full p-2 border rounded"
              placeholder="Enter product name"
              {...register("productName", { onChange: handleInputChange })}
            />
            {errors.productName && (
              <p className="text-red-500 text-sm">
                {errors.productName.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="price" className="block text-gray-700 mb-2">
              Price
            </label>
            <Input
              type="text"
              id="price"
              className="w-full p-2 border rounded"
              placeholder="Enter price"
              {...register("price", {
                pattern: {
                  value: /^\d+(\.\d+)?$/,
                  message: "Please enter a valid price (integer or decimal)",
                },
                onChange: handleInputChange,
              })}
            />
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="dealer-price" className="block text-gray-700 mb-2">
              Dealer Price
            </label>
            <Input
              type="text"
              id="dealer-price"
              className="w-full p-2 border rounded"
              placeholder="Enter dealer price"
              {...register("dealerPrice", {
                pattern: {
                  value: /^\d+(\.\d+)?$/,
                  message:
                    "Please enter a valid dealer price (integer or decimal)",
                },
                onChange: handleInputChange,
              })}
            />
            {errors.dealerPrice && (
              <p className="text-red-500 text-sm">
                {errors.dealerPrice.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="wholesale-price"
              className="block text-gray-700 mb-2"
            >
              Wholesale Price
            </label>
            <Input
              type="text"
              id="wholesale-price"
              className="w-full p-2 border rounded"
              placeholder="Enter wholesale price"
              {...register("wholesalePrice", {
                pattern: {
                  value: /^\d+(\.\d+)?$/,
                  message:
                    "Please enter a valid wholesale price (integer or decimal)",
                },
                onChange: handleInputChange,
              })}
            />
            {errors.wholesalePrice && (
              <p className="text-red-500 text-sm">
                {errors.wholesalePrice.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="barcode" className="block text-gray-700 mb-2">
              Barcode
            </label>
            <Input
              type="text"
              id="barcode"
              className="w-full p-2 border rounded"
              placeholder="Enter Barcode"
              {...register("barcode", { onChange: handleInputChange })}
            />
            {errors.barcode && (
              <p className="text-red-500 text-sm">{errors.barcode.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="quantity" className="block text-gray-700 mb-2">
              Quantity
            </label>
            <Input
              type="text"
              id="quantity"
              className="w-full p-2 border rounded"
              placeholder="Enter quantity"
              {...register("quantity", {
                pattern: {
                  value: /^\d+(\.\d+)?$/,
                  message: "Please enter a valid quantity (integer or decimal)",
                },
                onChange: handleInputChange,
              })}
            />
            {errors.quantity && (
              <p className="text-red-500 text-sm">{errors.quantity.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-400"
          >
            Search 🔎
          </button>
        </form>
      </div>
    </div>
  );
}
