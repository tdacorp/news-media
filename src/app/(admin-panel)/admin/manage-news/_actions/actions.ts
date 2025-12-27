"use server";

import { db } from "@/lib/db";
import { articles } from "@/lib/db/schema/articles";
import { revalidatePath } from "next/cache";
import { slugify } from "@/lib/utils";
import { auth } from "../../../../../../auth";

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

    const slug = `${slugify(formData.title)}-${Math.random().toString(36).substring(2, 7)}`;

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