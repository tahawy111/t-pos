import bcrypt from "bcrypt";
import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

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
        price,
        barcode,
        quantity: +quantity,
        dealerPrice,
        wholesalePrice,
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
    if (error) console.log("PRODUCT_CREATION_ERROR");
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      // Known request error, for example, a unique constraint violation
      return new Response(`Product is already exists`);
    } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Known request error, for example, a unique constraint violation
      return new Response(
        `Error Code: ${error.code}, Message: ${error.message}`
      );
    } else if (error instanceof Prisma.PrismaClientValidationError) {
      // Validation error
      return new Response(error.message);
    } else {
      // Other errors, such as connection issues
      console.error("An error occurred:", error);
    }
  }
}
