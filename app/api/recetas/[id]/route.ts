import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const recipe = await prisma.recipe.findUnique({
    where: { id },
    include: {
      ingredients: true,
      tags: true,
      photos: {
        orderBy: { order: "asc" },
      },
    },
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
    const { name, date, notes, ingredients, tags, rating, photos } = body;

    await prisma.ingredient.deleteMany({ where: { recipeId: id } });
    await prisma.photo.deleteMany({ where: { recipeId: id } });

    const currentRecipe = await prisma.recipe.findUnique({
      where: { id },
      include: { tags: true },
    });

    const currentTagIds = currentRecipe?.tags.map((t) => t.id) ?? [];

    const tagData = tags?.map((tagName: string) => ({
      where: { name: tagName },
      create: { name: tagName },
    }));

    const photoData = photos?.map((url: string, index: number) => ({
      url,
      order: index,
    }));

    const recipe = await prisma.recipe.update({
      where: { id },
      data: {
        name,
        date: date ? new Date(date) : undefined,
        notes,
        rating,
        ingredients: {
          create: ingredients,
        },
        tags: {
          disconnect: currentTagIds.map((id) => ({ id })),
          connectOrCreate: tagData,
        },
        photos: {
          create: photoData,
        },
      },
      include: {
        ingredients: true,
        tags: true,
        photos: {
          orderBy: { order: "asc" },
        },
      },
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
