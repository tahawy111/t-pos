import AddProductForm from "@/components/products/add-product-form";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";

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
