import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req, res) {
  const data = await req.json();
  const newNote = await prisma.notes.delete({
    where: {
      id: data.id,
    },
  });

  return NextResponse.json({
    data: newNote,
  });
}
