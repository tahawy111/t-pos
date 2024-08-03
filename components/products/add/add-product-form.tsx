"use client";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import FileUpload from "@/components/file-upload";
import { Repeat, UploadCloud } from "lucide-react";
import { imageUpload } from "@/lib/ImageUplaod";
import Image from "next/image";
import { cn, generateBarcode } from "@/lib/utils";
import ActionTooltip from "../../action-tooltip";
import { checkIfBarcodeAvailable } from "@/app/actions/productActions";

interface AddProductFormProps {}

export interface ProductFormInputs {
  productName: string;
  price: number;
  dealerPrice: number;
  wholesalePrice: number;
  barcode: string;
  quantity: number;
}

export default function AddProductForm({}: AddProductFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProductFormInputs>();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [barcodeStatus, setBarcodeStatus] = useState({
    status: "",
    isAvailable: true,
  });
  const [imagesUrl, setImagesUrl] = useState<
    { url: string; delete_url: string }[]
  >([]);
  const barcode = watch("barcode");

  useEffect(() => {
    checkIfBarcodeAvailable(barcode)
      .then(({ isAvailable, status }) => {
        setBarcodeStatus((prev) => ({ ...prev, isAvailable, status }));
      })
      .catch(({ isAvailable, status }) => {
        setBarcodeStatus((prev) => ({ ...prev, isAvailable, status }));
      });
  }, [barcode]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (!barcodeStatus.isAvailable) return;

    setIsLoading(true);
    axios
      .post("/api/products/add", { ...data, images: imagesUrl })
      .then((res) => {
        toast.success("Product Created Successfully!");
        router.push(`/products/${res.data.id}`);
      })
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => setIsLoading(false));
  };
  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      // Show a preview of the selected image
      const file = event.target.files[0];
      setIsImageLoading(true);
      const res = await imageUpload(file);
      setImagesUrl((prev) => [...prev, res]);
      setIsImageLoading(false);
    }
  };

  // Handle drag events
  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.dropEffect = "copy";
    event.currentTarget.classList.replace(
      "border-gray-900/10",
      "border-gray-900"
    );
  };
  const handleDragLeave = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.classList.replace(
      "border-gray-900",
      "border-gray-900/10"
    );
  };

  const handleDrop = async (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.classList.replace(
      "border-gray-900",
      "border-gray-900/10"
    );
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      const file = event.dataTransfer.files[0];
      setIsImageLoading(true);
      const res = await imageUpload(file);
      setImagesUrl((prev) => [...prev, res]);
      setIsImageLoading(false);

      // Trigger file input change event
      const fileInput = document.getElementById("image") as HTMLInputElement;
      if (fileInput) {
        fileInput.files = event.dataTransfer.files;
        fileInput.dispatchEvent(new Event("change", { bubbles: true }));
      }
    }
  };

  return (
    <div className="w-full flex justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Add New Product 📝
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
              {...register("productName", {
                required: "Product Name is required",
              })}
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
                required: "Price is required",
                pattern: {
                  value: /^\d+(\.\d+)?$/,
                  message: "Please enter a valid price (integer or decimal)",
                },
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
            <div className="relative">
              <Input
                defaultValue={generateBarcode()}
                type="text"
                id="barcode"
                className="w-full p-2 border rounded"
                placeholder="Enter Barcode"
                {...register("barcode", {
                  required: "Barcode is required",
                })}
              />
              {errors.wholesalePrice && (
                <p className="text-red-500 text-sm">
                  {errors.wholesalePrice.message}
                </p>
              )}
              {barcodeStatus && (
                <p
                  className={cn(
                    "text-sm",
                    barcodeStatus.isAvailable
                      ? "text-green-500"
                      : "text-red-500"
                  )}
                >
                  {barcodeStatus.status}
                </p>
              )}
              {/* TODO: Check if barcode is available */}
              <div
                className="absolute top-2 right-1"
                onClick={(e) => {
                  e.preventDefault();
                  setValue("barcode", generateBarcode());
                }}
              >
                <ActionTooltip label="Regenerate">
                  <Repeat />
                </ActionTooltip>
              </div>
            </div>
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
                required: "Quantity is required",
                pattern: {
                  value: /^\d+(\.\d+)?$/,
                  message: "Please enter a valid quantity (integer or decimal)",
                },
              })}
            />
            {errors.quantity && (
              <p className="text-red-500 text-sm">{errors.quantity.message}</p>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="image" className="block text-gray-700 mb-2">
              Product Image
            </label>
            <input
              onChange={handleImageChange}
              type="file"
              className="hidden"
              id={"image"}
            />
            <label
              htmlFor={"image"}
              className="w-full h-full flex justify-center items-center flex-col border-gray-900/10 border-2 py-10 rounded-lg border-dashed cursor-pointer"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <UploadCloud size={40} className="text-gray-500" />

              <h2 className="text-blue-500 font-semibold">
                Choose files or drag and drop
              </h2>
              <p className="text-sm text-gray-600">Image (32MB)</p>
            </label>

            <div className="flex">
              {imagesUrl.map(({ url }, index) => (
                <div className="w-32 h-32 relative m-3" key={index}>
                  <Image alt="Product image" src={url} fill />
                </div>
              ))}
              {isImageLoading && <span>Uploading Image....</span>}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-400"
          >
            Add New Product
          </button>
        </form>
      </div>
    </div>
  );
}
