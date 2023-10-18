import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req, res) {
  const data = await req.json();
  const foundNote = await prisma.notes.findFirst({
    where: {
      id: parseInt(data.id),
    },
  });

  return NextResponse.json({
    foundNote,
  });
}
