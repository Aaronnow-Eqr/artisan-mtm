import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

export async function GET() {
  const cookieStore =  await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    return Response.json({ message: "No autenticado" }, { status: 401 });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        name: true,
        lastName: true,
        email: true,
        createdAt: true,
      },
    });

    if (!user) {
      return Response.json(
        { message: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    return Response.json(user);
  } catch {
    return Response.json({ message: "Token inválido" }, { status: 401 });
  }
}
