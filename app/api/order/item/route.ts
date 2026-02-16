import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

const profile = body.measurementProfileId
  ? await prisma.measurementProfile.findUnique({
      where: { id: body.measurementProfileId },
      include: { entries: true },
    })
  : null;

  const item = await prisma.orderItem.create({
    data: {
      orderId: body.orderId,
      productType: body.productType,
      quantity: body.quantity ?? 1,

      size: body.size ?? null,

      measurementProfileId: body.measurementProfileId ?? null,
      measurementSnapshot: profile ? profile.entries : undefined,

      config: body.config ?? {},
      notes: body.notes ?? null,

      totalCents: body.totalCents ?? 0,
    },
  });

    
    return NextResponse.json(item);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error creando OrderItem" },
      { status: 500 }
    );
  }
}
