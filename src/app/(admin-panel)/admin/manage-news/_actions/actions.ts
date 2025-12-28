"use server";

import { db } from "@/lib/db";
import { articles } from "@/lib/db/schema/articles";
import { revalidatePath } from "next/cache";
import { slugify } from "@/lib/utils";
import { auth } from "../../../../../../auth";
import { categories, users } from "@/lib/db/schema";
import { and, desc, eq, ilike } from "drizzle-orm";

export type ArticleStatus = "draft" | "published" | "archived";

export interface ArticleUpdateInput {
  title: string;
  content: string;
  excerpt?: string;
  categoryId: string;
  featuredImage?: string;
  videoUrl?: string;
  tags?: string[];
  status: ArticleStatus;
}

export async function createArticle(formData: ArticleUpdateInput) {
  try {
    const session = await auth();
    if (!session?.user?.id) return { error: "Unauthorized" };

    const slug = `${slugify(formData.title)}-${Math.random()
      .toString(36)
      .substring(2, 7)}`;

    await db.insert(articles).values({
      ...formData,
      slug,
      authorId: session.user.id,
      tags: formData.tags || [],
    });

    revalidatePath("/admin/manage-news");
    return { success: true };
  } catch (error) {
    console.error("Article Creation Error:", error);
    return { error: "Failed to create article. Title might be duplicate." };
  }
}

export async function getAllArticles(filters?: {
  search?: string;
  category?: string;
  status?: string;
}) {
  try {
    const queryConditions = [];

    if (filters?.search) {
      queryConditions.push(ilike(articles.title, `%${filters.search}%`));
    }

    if (filters?.category && filters.category !== "all") {
      queryConditions.push(eq(categories.slug, filters.category));
    }

    if (filters?.status && filters.status !== "all") {
      queryConditions.push(eq(articles.status, filters.status as any));
    }

    const data = await db
      .select({
        id: articles.id,
        title: articles.title,
        slug: articles.slug,
        status: articles.status,
        createdAt: articles.createdAt,
        updatedAt: articles.updatedAt,
        categoryName: categories.name,
        authorName: users.name,
      })
      .from(articles)
      .leftJoin(categories, eq(articles.categoryId, categories.id))
      .leftJoin(users, eq(articles.authorId, users.id))
      .where(and(...queryConditions))
      .orderBy(desc(articles.createdAt));

    return data;
  } catch (error) {
    console.error("Fetch Articles Error:", error);
    return { error: "Failed to fetch articles" };
  }
}

export async function getArticleById(id: string) {
  try {
    const data = await db.query.articles.findFirst({
      where: (articles, { eq }) => eq(articles.id, id),
      with: {
        category: true,
      },
    });

    if (!data) {
      console.warn(`[DEBUG] No article found for ID: ${id}`);
      return null;
    }

    return data;
  } catch (error) {
    console.error("[DATABASE ERROR]:", error);
    return { error: "Failed to fetch article" };
  }
}

export async function deleteArticle(id: string) {
  try {
    await db.delete(articles).where(eq(articles.id, id));

    revalidatePath("/admin/manage-news");
    return { success: true };
  } catch (error) {
    return { error: "Failed to delete article" };
  }
}

export async function updateArticle(id: string, formData: ArticleUpdateInput) {
  try {
    const session = await auth();
    if (!session?.user?.id) return { error: "Unauthorized" };

    const slug = `${slugify(formData.title)}-${id.substring(0, 5)}`;

    await db
      .update(articles)
      .set({
        ...formData,
        slug,
        updatedAt: new Date(),
      })
      .where(eq(articles.id, id));

    revalidatePath("/admin/manage-news");
    return { success: true };
  } catch (error) {
    return { error: "Failed to update article" };
  }
}

export type ArticleListItem = Awaited<ReturnType<typeof getAllArticles>>;
export type ArticleSingleItem = Extract<ArticleListItem, any[]>[number];
