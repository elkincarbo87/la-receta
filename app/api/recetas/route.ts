import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const recipes = await prisma.recipe.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { ingredients: true },
      },
    },
  });
  return NextResponse.json(recipes);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, date, notes, ingredients } = body;

    const recipe = await prisma.recipe.create({
      data: {
        name,
        date: date ? new Date(date) : new Date(),
        notes,
        ingredients: {
          create: ingredients,
        },
      },
      include: {
        ingredients: true,
      },
    });

    return NextResponse.json(recipe, { status: 201 });
  } catch (error) {
    console.error("Error creating recipe:", error);
    return NextResponse.json(
      { error: "Failed to create recipe" },
      { status: 500 }
    );
  }
}
