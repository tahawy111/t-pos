"use client";
import { useProductSearchContext } from "@/components/contexts/product-search-context";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

export default function ProductPaginationControls({
  totalPages,
}: {
  totalPages: number;
}) {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) ?? 1;
  const pageSize =
    searchParams.get("pageSize") ??
    process.env.NEXT_PUBLIC_PAGINATION_PAGE_SIZE;
  const router = useRouter();
  const { setProductsData, data } = useProductSearchContext();
  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <Button
        variant="outline"
        size="sm"
        disabled={Number(page) <= 1}
        onClick={() => {
          router.push(
            `/products/search-for-products?page=${
              Number(page) - 1
            }&pageSize=${pageSize}`
          );
          axios
            .post("/api/products/search", {
              ...data,
              pageSize: process.env.NEXT_PUBLIC_PAGINATION_PAGE_SIZE,
              page: page,
            })
            .then((res) => setProductsData(res.data))
            .catch((error) => {
              toast.error(error);
            });
        }}
      >
        Previous
      </Button>
      <div className="">
        {page} / {totalPages}
      </div>
      <Button
        variant="outline"
        size="sm"
        disabled={Number(page) >= totalPages}
        onClick={() => {
          router.push(
            `/products/search-for-products?page=${
              Number(page) + 1
            }&pageSize=${pageSize}`
          );
          axios
            .post("/api/products/search", {
              ...data,
              pageSize: process.env.NEXT_PUBLIC_PAGINATION_PAGE_SIZE,
              page: page,
            })
            .then((res) => setProductsData(res.data))
            .catch((error) => {
              toast.error(error);
            });
        }}
      >
        Next
      </Button>
    </div>
  );
}
