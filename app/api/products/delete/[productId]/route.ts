import bcrypt from "bcrypt";
import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function DELETE(
  req: Request,
  { params: { productId } }: { params: { productId: string } }
) {
  try {
    const session = await getAuthSession();

    if (!session?.user)
      return new NextResponse("Unauthorized", { status: 500 });

    const findProduct = await db.product.findUnique({
      where: { id: productId },
      include: { images: true },
    });

    // findProduct?.images.forEach(async (img) => {
    //   // Launch a headless browser
    //   const browser = await puppeteer.launch();

    //   // Open a new page
    //   const page = await browser.newPage();

    //   // Navigate to a website
    //   await page.goto(img.delete_url);

    //   await page.click(".link.link--delete");


    //   await page.click("#fullscreen-modal-box .btn-container button");

    //   await page.waitForSelector("#fullscreen-modal-box .btn-container button")

    //   // Close the browser
    //   await browser.close();
    // });

    if (!findProduct)
      return new Response("This product isn't exist", { status: 404 });

    await db.product.delete({ where: { id: productId } });

    return new Response(JSON.stringify("Deleted Successfully"));
  } catch (error) {
    console.log("PRODUCT_CREATION_ERROR");
    return new Response("Internal Error", { status: 500 });
  }
}
