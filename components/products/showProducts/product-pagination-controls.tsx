"use client";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";

export default function ProductPaginationControls({
  totalPages,
}: {
  totalPages: number;
}) {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? "1";
  const pageSize = searchParams.get("pageSize") ?? process.env.NEXT_PUBLIC_PAGINATION_PAGE_SIZE;
  const router = useRouter();
  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <Button
        variant="outline"
        size="sm"
        disabled={Number(page) <= 1}
        onClick={() => {
          router.push(
            `/products?page=${Number(page) - 1}&pageSize=${pageSize}`
          );
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
            `/products?page=${Number(page) + 1}&pageSize=${pageSize}`
          );
        }}
      >
        Next
      </Button>
    </div>
  );
}
