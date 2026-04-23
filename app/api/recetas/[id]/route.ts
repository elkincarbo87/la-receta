import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const recipe = await prisma.recipe.findUnique({
    where: { id },
    include: { ingredients: true, tags: true },
  });

  if (!recipe) {
    return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
  }

  return NextResponse.json(recipe);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const body = await request.json();
    const { name, date, notes, ingredients, tags, rating, imageUrl } = body;

    await prisma.ingredient.deleteMany({ where: { recipeId: id } });

    const currentRecipe = await prisma.recipe.findUnique({
      where: { id },
      include: { tags: true },
    });

    const currentTagIds = currentRecipe?.tags.map((t) => t.id) ?? [];

    const tagData = tags?.map((tagName: string) => ({
      where: { name: tagName },
      create: { name: tagName },
    }));

    const recipe = await prisma.recipe.update({
      where: { id },
      data: {
        name,
        date: date ? new Date(date) : undefined,
        notes,
        rating,
        imageUrl,
        ingredients: {
          create: ingredients,
        },
        tags: {
          disconnect: currentTagIds.map((id) => ({ id })),
          connectOrCreate: tagData,
        },
      },
      include: { ingredients: true, tags: true },
    });

    return NextResponse.json(recipe);
  } catch (error) {
    console.error("Error updating recipe:", error);
    return NextResponse.json(
      { error: "Failed to update recipe" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await prisma.recipe.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting recipe:", error);
    return NextResponse.json(
      { error: "Failed to delete recipe" },
      { status: 500 }
    );
  }
}
