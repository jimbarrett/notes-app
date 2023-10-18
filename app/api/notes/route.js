import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req, res) {
  const allNotes = await prisma.notes.findMany();

  return NextResponse.json({
    allNotes,
  });
}
