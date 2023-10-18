import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req, res) {
  const data = await req.json();
  const foundNotes = await prisma.notes.findMany({
    where: {
      content: {
        contains: data.search,
      },
    },
  });

  return NextResponse.json({
    foundNotes,
  });
}
