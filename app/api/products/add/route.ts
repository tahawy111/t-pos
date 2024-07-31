import bcrypt from "bcrypt";
import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
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

    if (!productName || !price || !barcode || !quantity)
      return new Response("Missing Info", { status: 400 });

    const product = await db.product.create({
      data: {
        name: productName,
        price: +price,
        barcode,
        quantity: +quantity,
        dealerPrice: +dealerPrice,
        wholesalePrice: +wholesalePrice,
        userId: session.user.id,
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
