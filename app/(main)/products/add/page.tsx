import AddProductForm from "@/components/products/add/add-product-form";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

interface pageProps {}

export default function page({}: pageProps) {
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
            <Link href="/products/add">Add New Product</Link>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <AddProductForm />

    </div>
  );
}
