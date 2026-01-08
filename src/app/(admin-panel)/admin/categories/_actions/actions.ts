"use server";

import { db } from "@/lib/db";
import { articles } from "@/lib/db/schema";
import { categories } from "@/lib/db/schema/categories";
import { eq, desc, InferSelectModel } from "drizzle-orm";
import { PublicArticle } from "../../manage-news/_actions/actions";
import { updateTag } from "next/cache";

export type CategoryWithArticles = InferSelectModel<typeof categories> & {
  articles: PublicArticle[];
};

const slugify = (text: string) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
};

// Get All Categories
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

// Get Category With Articles
export async function getCategoryWithArticles(
  slug: string
): Promise<CategoryWithArticles | null> {
  try {
    const data = await db.query.categories.findFirst({
      where: eq(categories.slug, slug),
      with: {
        articles: {
          where: eq(articles.status, "published"),
          orderBy: [desc(articles.createdAt)],
          limit: 25,
        },
      },
    });
    if (!data) return null;

    const formattedArticles: PublicArticle[] = data.articles.map((article) => ({
      id: article.id,
      title: article.title,
      slug: article.slug,
      excerpt: article.excerpt,
      featuredImage: article.featuredImage,
      categoryName: data.name,
      categorySlug: data.slug,
      authorName: "Editorial Team",
      createdAt: article.createdAt,
      updatedAt: article.updatedAt,
    }));

    return {
      ...data,
      articles: formattedArticles,
    };
  } catch (error) {
    console.error("Fetch Category Details Error:", error);
    return null;
  }
}

// Add New Category
export async function addCategory(
  name: string,
  slug: string,
  description?: string
) {
  try {
    if (!name || !slug) return { error: "Name and Slug are required" };

    const formattedSlug = slugify(slug || name);

    await db
      .insert(categories)
      .values({ name, slug: formattedSlug, description });

    updateTag("/admin/categories");
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

// Delete Category
export async function deleteCategory(
  id: string
): Promise<{ success?: boolean; error?: string }> {
  try {
    if (!id) return { error: "ID is required" };

    await db.delete(categories).where(eq(categories.id, id));
    updateTag("/admin/categories");
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

// Update Category
export async function updateCategory(
  id: string,
  name: string,
  slug: string,
  description?: string
) {
  try {
    if (!id || !name || !slug)
      return { error: "ID, Name, and Slug are required" };

    const formattedSlug = slugify(slug || name);

    await db
      .update(categories)
      .set({
        name,
        slug: formattedSlug,
        description,
        updatedAt: new Date(),
      })
      .where(eq(categories.id, id));

    updateTag("/admin/categories");
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
