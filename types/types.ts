import { Image, Product } from "@prisma/client";

export type ProductWithImages = Product & {
  images: Image[];
};
