import bcrypt from "bcrypt";
import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params: { productId } }: { params: { productId: string } }
) {
  try {
    const body = await req.json();
    const session = await getAuthSession();

    if (!session?.user)
      return new NextResponse("Unauthorized", { status: 500 });

    const {
      productName,
      price,
      dealerPrice,
      wholesalePrice,
      barcode,
      quantity,
      images,
    } = body;

    const findProduct = await db.product.findUnique({
      where: { id: productId },
    });

    if (!findProduct)
      return new Response("This product isn't exist", { status: 404 });

    if (!productName || !price || !barcode || !quantity)
      return new Response("Missing Info", { status: 400 });

    const product = await db.product.update({
      where: { id: productId },
      data: {
        name: productName,
        price,
        dealerPrice,
        wholesalePrice,
        barcode,
        quantity: +quantity,
        images: {
          createMany: {
            data: images,
          },
        },
      },
    });

    return new Response(JSON.stringify(product));
  } catch (error) {
    console.log("PRODUCT_CREATION_ERROR");
    return new Response("Internal Error", { status: 500 });
  }
}
