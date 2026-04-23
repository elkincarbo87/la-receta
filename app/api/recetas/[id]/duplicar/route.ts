import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const original = await prisma.recipe.findUnique({
      where: { id },
      include: { ingredients: true, tags: true },
    });

    if (!original) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }

    const tagData = original.tags.map((tag) => ({
      where: { name: tag.name },
      create: { name: tag.name },
    }));

    const duplicated = await prisma.recipe.create({
      data: {
        name: `${original.name} (copia)`,
        date: original.date,
        notes: original.notes,
        rating: original.rating,
        imageUrl: original.imageUrl,
        ingredients: {
          create: original.ingredients.map((i) => ({
            name: i.name,
            quantity: i.quantity,
            unit: i.unit,
          })),
        },
        tags: {
          connectOrCreate: tagData,
        },
      },
      include: { ingredients: true, tags: true },
    });

    return NextResponse.json(duplicated, { status: 201 });
  } catch (error) {
    console.error("Error duplicating recipe:", error);
    return NextResponse.json(
      { error: "Failed to duplicate recipe" },
      { status: 500 }
    );
  }
}
