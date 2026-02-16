import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const order = await prisma.order.create({
      data: {
        userId: body.userId,
        status: "DRAFT",
      },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error creando Order" },
      { status: 500 }
    );
  }
}
