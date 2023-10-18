import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req, res) {
  const data = await req.json();
  const updatedNote = await prisma.notes.update({
    where: {
      id: parseInt(data.id),
    },
    data: {
      content: data.content,
    },
  });

  return NextResponse.json({
    updatedNote,
  });
}
