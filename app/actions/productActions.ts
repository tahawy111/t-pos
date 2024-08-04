"use server";

import { db } from "@/lib/db";

export async function checkIfBarcodeAvailable(barcode: string) {
  try {
    if (!barcode) return { status: "Barcode is required", isAvailable: false };

    const product = await db.product.findFirst({ where: { barcode } });

    if (product)
      return { status: "This barcode is not available", isAvailable: false };

    return { status: "This barcode is available", isAvailable: true };
  } catch (error) {
    return { status: "CHECK_BARCODE_ERROR", isAvailable: false };
  }
}
