import bcrypt from "bcrypt";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { accountInfo, companyInfo } = body;

    const { name, email, password } = accountInfo;
    const {
      name: companyName,
      email: companyEmail,
      address,
      numbers,
    } = companyInfo;

    if (
      !name ||
      !email ||
      !password ||
      !companyName ||
      !companyEmail ||
      !address ||
      !numbers
    )
      return new Response("Missing Info", { status: 400 });

    const hashedPassword = await bcrypt.hash(password, 12);

    const numbersMap = (numbers as string)
      .split(",")
      .map((number) => ({ number }));

    const user = await db.user.create({
      data: {
        email,
        name,
        hashedPassword,
        image: "https://i.imgur.com/Juc36Wr.jpeg",
      },
    });

    await db.company.create({
      data: {
        name: companyName,
        email: companyEmail,
        address: address,
        userId: user.id,
        numbers: {
          createMany: {
            data: numbersMap,
          },
        },
      },
    });

    return new Response(JSON.stringify(user));
  } catch (error) {
    console.log("REGISTRATION_ERROR");
    return new Response("Internal Error", { status: 500 });
  }
}
