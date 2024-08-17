"use client";
import { useSession } from "next-auth/react";
import {
  ReactNode,
  Dispatch,
  SetStateAction,
  createContext,
  useState,
  useContext,
} from "react";
import { ProductTable } from "../products/search/search-product-columns";
import { ProductFormInputs } from "../products/search/search-product-form";

interface ProductSearchContextInterface {
  productsData: IProductsData;
  setProductsData: Dispatch<SetStateAction<IProductsData>>;
  data: ProductFormInputs;
  setData: Dispatch<SetStateAction<ProductFormInputs>>;
}

export interface IProductsData {
  products: ProductTable[];
  totalPages: number;
}

export const ProductSearchContext =
  createContext<ProductSearchContextInterface>({
    step: 1,
  } as unknown as ProductSearchContextInterface);

export function ProductSearchContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [productsData, setProductsData] = useState<IProductsData>({
    products: [],
    totalPages: 0,
  });
  const [data, setData] = useState<ProductFormInputs>({
    productName: "",
    price: "",
    dealerPrice: "",
    wholesalePrice: "",
    barcode: "",
    quantity: 0,
  });

  return (
    <ProductSearchContext.Provider
      value={{ productsData, setProductsData, data, setData }}
    >
      {children}
    </ProductSearchContext.Provider>
  );
}

export function useProductSearchContext() {
  return useContext(ProductSearchContext);
}
