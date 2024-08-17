import { ProductSearchContextProvider } from "@/components/contexts/product-search-context";
import SearchProductForm from "@/components/products/search/search-product-form";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

interface SearchPageProps {}

export default function SearchPage({}: SearchPageProps) {
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
            <Link href="/products/search-for-products">
              Search For Products
            </Link>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <ProductSearchContextProvider>
        <SearchProductForm />
      </ProductSearchContextProvider>
    </div>
  );
}
