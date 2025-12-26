"use server";

import { db } from "@/lib/db";
import { categories } from "@/lib/db/schema/categories";
import { eq, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// 1. Get All Categories
export async function getAllCategories() {
  try {
    return await db
      .select()
      .from(categories)
      .orderBy(desc(categories.createdAt));
  } catch (error) {
    console.error("Fetch Categories Error:", error);
    return { error: "Failed to fetch categories. Please try again." };
  }
}

// 2. Add New Category
export async function addCategory(
  name: string,
  slug: string,
  description?: string
) {
  try {
    if (!name || !slug) return { error: "Name and Slug are required" };

    await db
      .insert(categories)
      .values({ name, slug: slug.toLowerCase().trim(), description });
    revalidatePath("/admin/categories");
    return { success: true };
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "23505"
    ) {
      return {
        error:
          "Failed to add category. Category name or slug already exists. Please try again.",
      };
    }
    return { error: "Something went wrong. Please try again." };
  }
}

// 3. Delete Category
export async function deleteCategory(
  id: string
): Promise<{ success?: boolean; error?: string }> {
  try {
    if (!id) return { error: "ID is required" };

    await db.delete(categories).where(eq(categories.id, id));
    revalidatePath("/admin/categories");
    return { success: true };
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "23505"
    ) {
      return {
        error: "Could not delete category. It might be in use.",
      };
    }
    return { error: "Something went wrong. Please try again." };
  }
}

// 4. Update Category
export async function updateCategory(
  id: string,
  name: string,
  slug: string,
  description?: string
) {
  try {
    if (!id || !name || !slug)
      return { error: "ID, Name, and Slug are required" };

    await db
      .update(categories)
      .set({
        name,
        slug: slug.toLowerCase().trim(),
        description,
        updatedAt: new Date(),
      })
      .where(eq(categories.id, id));

    revalidatePath("/admin/categories");
    return { success: true };
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "23505"
    ) {
      return {
        error: "Category name or slug already exists",
      };
    }
    return { error: "Something went wrong. Please try again." };
  }
}
