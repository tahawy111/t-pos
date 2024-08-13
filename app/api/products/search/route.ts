import bcrypt from "bcrypt";
import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { NextResponse } from "next/server";

// Function to build the filter
function buildFilter(criteria: any) {
  const filter: any = {};

  // Apply different types of filters based on the criteria
  if (criteria.productName) {
    filter.name = { contains: criteria.productName, mode: "insensitive" };
  }
  if (criteria.price) {
    filter.price = { contains: criteria.price };
  }
  if (criteria.dealerPrice) {
    filter.dealerPrice = { contains: criteria.dealerPrice };
  }
  if (criteria.wholesalePrice) {
    filter.wholesalePrice = { contains: criteria.wholesalePrice };
  }
  if (criteria.barcode) {
    filter.barcode = { contains: criteria.barcode };
  }
  if (criteria.quantity) {
    filter.quantity = { ...filter.quantity, lte: +criteria.quantity };
  }
  return filter;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log(body);
    const session = await getAuthSession();

    if (!session?.user)
      return new NextResponse("Unauthorized", { status: 500 });

    const filter = buildFilter(body);

    const [products, productsCount] = await Promise.all([
      db.product.findMany({
        where: filter,
        skip: (Number(body.page) - 1) * Number(body.pageSize),
        take: Number(body.pageSize),
        orderBy: {
          createdAt: "desc",
        },
      }),
      db.product.count(),
    ]);
    console.log(products);

    const totalPages = Math.ceil(productsCount / body.pageSize);

    const productsMap = products.map(
      ({ id, name, price, dealerPrice, wholesalePrice, quantity }) => ({
        id,
        name,
        price: price.toString(),
        dealerPrice: dealerPrice?.toString() || "0",
        wholesalePrice: wholesalePrice?.toString() || "0",
        quantity: quantity.toString(),
      })
    );

    return new Response(JSON.stringify({ products: productsMap, totalPages }));
  } catch (error) {
    console.log("PRODUCT_SEARCH_ERROR");
    return new Response("Internal Error", { status: 500 });
  }
}
