"use server";

import { db } from "@/lib/db";
import { articles } from "@/lib/db/schema/articles";
import { revalidatePath } from "next/cache";
import { slugify } from "@/lib/utils";
import { auth } from "../../../../../../auth";
import { categories, users } from "@/lib/db/schema";
import { and, desc, eq, ilike } from "drizzle-orm";

export async function createArticle(formData: {
  title: string;
  content: string;
  excerpt?: string;
  categoryId: string;
  featuredImage?: string;
  videoUrl?: string;
  tags?: string[];
  status: "draft" | "published";
}) {
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
        status: articles.status,
        createdAt: articles.createdAt,
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
