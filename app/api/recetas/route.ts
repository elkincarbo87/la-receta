import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const recipes = await prisma.recipe.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { ingredients: true },
      },
      tags: true,
      photos: {
        orderBy: { order: "asc" },
        take: 1,
      },
    },
  });
  return NextResponse.json(recipes);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, date, notes, ingredients, tags, rating, photos } = body;

    const tagData = tags?.map((tagName: string) => ({
      where: { name: tagName },
      create: { name: tagName },
    }));

    const photoData = photos?.map((url: string, index: number) => ({
      url,
      order: index,
    }));

    const recipe = await prisma.recipe.create({
      data: {
        name,
        date: date ? new Date(date) : new Date(),
        notes,
        rating,
        ingredients: {
          create: ingredients,
        },
        tags: {
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

    return NextResponse.json(recipe, { status: 201 });
  } catch (error) {
    console.error("Error creating recipe:", error);
    return NextResponse.json(
      { error: "Failed to create recipe" },
      { status: 500 }
    );
  }
}
