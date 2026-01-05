"use server";

import { db } from "@/lib/db";
import { articles } from "@/lib/db/schema/articles";
import { revalidatePath } from "next/cache";
import { slugify } from "@/lib/utils";
import { auth } from "../../../../../../auth";
import { categories, users as usersSchema } from "@/lib/db/schema";
import { and, desc, eq, ilike } from "drizzle-orm";
import { cache } from "react";

type DbUser = typeof usersSchema.$inferSelect;

async function validateAdmin() {
  const session = await auth();
  const user = session?.user as DbUser | undefined;

  if (!user?.id || user.role !== "admin") {
    throw new Error("Unauthorized: Admin access required");
  }
  return user;
}

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
    const user = await validateAdmin();

    const slug = `${slugify(formData.title)}-${Math.random()
      .toString(36)
      .substring(2, 7)}`;

    await db.insert(articles).values({
      ...formData,
      slug,
      authorId: user.id as string,
      tags: formData.tags || [],
    });

    revalidatePath("/admin/manage-news");
    return { success: true };
  } catch (error) {
    console.error("Article Creation Error:", error);
    return { error: "Failed to create article." };
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
      queryConditions.push(
        eq(articles.status, filters.status as ArticleStatus)
      );
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
        authorName: usersSchema.name,
      })
      .from(articles)
      .leftJoin(categories, eq(articles.categoryId, categories.id))
      .leftJoin(usersSchema, eq(articles.authorId, usersSchema.id))
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
      return { error: "No article found for ID" };
    }

    return data;
  } catch (error) {
    console.error("[DATABASE ERROR]:", error);
    return { error: "Failed to fetch article" };
  }
}

export async function getArticleBySlug(slug: string) {
  try {
    const data = await db.query.articles.findFirst({
      where: (articles, { eq, and }) =>
        and(eq(articles.slug, slug), eq(articles.status, "published")),
      with: {
        category: true,
      },
    });

    return data;
  } catch (error) {
    console.error("Fetch Article by Slug Error:", error);
    return null;
  }
}

export async function deleteArticle(id: string) {
  try {
    await validateAdmin();

    await db.delete(articles).where(eq(articles.id, id));

    revalidatePath("/admin/manage-news");
    return { success: true };
  } catch {
    return { error: "Failed to delete article" };
  }
}

export async function updateArticle(id: string, formData: ArticleUpdateInput) {
  try {
    await validateAdmin();

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
  } catch {
    return { error: "Failed to update article" };
  }
}

export const getPublicArticles = cache(async () => {
  try {
    const data = await db
      .select({
        id: articles.id,
        title: articles.title,
        slug: articles.slug,
        excerpt: articles.excerpt,
        featuredImage: articles.featuredImage,
        createdAt: articles.createdAt,
        categoryName: categories.name,
        categorySlug: categories.slug,
      })
      .from(articles)
      .leftJoin(categories, eq(articles.categoryId, categories.id))
      .where(eq(articles.status, "published"))
      .orderBy(desc(articles.createdAt))
      .limit(40);

    return data;
  } catch (error) {
    console.error("Public Fetch Error:", error);
    return [];
  }
});

export const getLatestNotifications = async () => {
  try {
    const data = await db
      .select({
        id: articles.id,
        title: articles.title,
        slug: articles.slug,
        createdAt: articles.createdAt,
      })
      .from(articles)
      .where(eq(articles.status, "published"))
      .orderBy(desc(articles.createdAt))
      .limit(5);

    return data;
  } catch (error) {
    console.error("Notification Fetch Error:", error);
    return [];
  }
};

export async function searchPublicArticles(query: string) {
  try {
    const data = await db
      .select({
        id: articles.id,
        title: articles.title,
        slug: articles.slug,
        createdAt: articles.createdAt,
        categoryName: categories.name,
      })
      .from(articles)
      .leftJoin(categories, eq(articles.categoryId, categories.id))
      .where(
        and(
          eq(articles.status, "published"),
          ilike(articles.title, `%${query}%`)
        )
      )
      .orderBy(desc(articles.createdAt))
      .limit(8);

    return data;
  } catch (error) {
    console.error("Public Search Error:", error);
    return [];
  }
}

export type ArticleListItem = Awaited<ReturnType<typeof getAllArticles>>;
export type ArticleSingleItem = ArticleListItem extends (infer T)[] ? T : never;
export type PublicArticle = Awaited<
  ReturnType<typeof getPublicArticles>
>[number];
