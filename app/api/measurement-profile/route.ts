import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken"

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, name, unit, entries } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Missing ID" },
        { status: 400 }
      );
    }

    const updatedProfile = await prisma.measurementProfile.update({
      where: { id },
      data: {
        name,
        unit,
        entries: {
          deleteMany: {},
          create: entries.map((entry: any) => ({
            productType: entry.productType,
            data: entry.data,
          })),
        },
      },
      include: { entries: true },
    });

    return NextResponse.json(updatedProfile);
  } catch (error) {
    console.error("Error updating measurement profile:", error);
    return NextResponse.json(
      { error: "Update failed" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Missing ID" },
        { status: 400 }
      );
    }

    await prisma.measurement.deleteMany({
      where: {
        profileId: id,
      },
    });

    await prisma.measurementProfile.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { error: "Delete failed" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };

    const profiles = await prisma.measurementProfile.findMany({
      where: {
        userId: payload.userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        entries: true,
      },
    });

    return NextResponse.json(profiles);
  } catch (error) {
    console.error("Error loading measurement profiles:", error);
    return NextResponse.json(
      { error: "Error loading profiles" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { userId, name, unit, entries } = body;

    if (!userId || !name || !entries || entries.length === 0) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const profile = await prisma.measurementProfile.create({
      data: {
        userId,
        name,
        unit: unit ?? "cm",
        entries: {
          create: entries.map((entry: any) => ({
            productType: entry.productType,
            data: entry.data
          }))
        }
      },
      include: {
        entries: true
      }
    });


    return NextResponse.json(profile, { status: 201 });
  } catch (error) {
    console.error("Error creating measurement profile:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
