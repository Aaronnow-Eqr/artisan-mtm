import { prisma } from "@/lib/prisma";

export async function GET() {
  if (!process.env.DATABASE_URL) {
    return Response.json(
      {
        db: "missing",
        message:
          "DATABASE_URL no está configurado. Copia .env.example a .env y pega tu conexión de Postgres.",
      },
      { status: 500 }
    );
  }

  try {
    const result = await prisma.$queryRaw`SELECT 1 as ok`;
    return Response.json({ db: "ok", result });
  } catch (err: unknown) {
    return Response.json(
      {
        db: "error",
        message:
          "No se pudo conectar a Postgres. Revisa DATABASE_URL y que la DB esté accesible.",
      },
      { status: 500 }
    );
  }
}
