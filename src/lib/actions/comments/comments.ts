"use server";

import { db } from "@/lib/db";
import { articles } from "@/lib/db/schema";
import { comments } from "@/lib/db/schema/comments";
import { eq, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// 1. Comment Add Karne ke liye
export async function addComment(data: {
  articleId: string;
  userId: string;
  userName: string;
  userImage?: string;
  content: string;
}) {
  try {
    await db.insert(comments).values({
      articleId: data.articleId,
      userId: data.userId,
      userName: data.userName,
      userImage: data.userImage,
      content: data.content,
    });

    revalidatePath(`/article/[slug]`, "page");
    return { success: true };
  } catch (error) {
    console.error("Comment Error:", error);
    return { success: false, error: "Failed to post comment" };
  }
}

// 2. Comments Fetch karne ke liye
// export async function getCommentsByArticle(articleId: string) {
//   try {
//     const data = await db
//       .select()
//       .from(comments)
//       .where(eq(comments.articleId, articleId))
//       .orderBy(desc(comments.createdAt));

//     return data;
//   } catch (error) {
//     return [];
//   }
// }

// 2. Comments Fetch karne ke liye (With Pagination)
export async function getCommentsByArticle(
  articleId: string,
  page: number = 1,
  limit: number = 10
) {
  try {
    const offset = (page - 1) * limit;

    const data = await db
      .select()
      .from(comments)
      .where(eq(comments.articleId, articleId))
      .limit(limit)
      .offset(offset)
      .orderBy(desc(comments.createdAt));

    return data;
  } catch (error) {
    console.error("Fetch Comments Error:", error);
    return [];
  }
}

// 3. Admin ke liye Delete Action
export async function deleteComment(commentId: string) {
  // Isme hum check kar sakte hain ki request admin se hai ya nahi
  try {
    await db.delete(comments).where(eq(comments.id, commentId));
    revalidatePath(`/article/[slug]`, "page");
    return { success: true };
  } catch {
    return { success: false };
  }
}

// 4. Admin Dashboard ke liye: Sabhi comments fetch karna with Pagination
export async function getAllCommentsAdmin(
  page: number = 1,
  limit: number = 10
) {
  try {
    const offset = (page - 1) * limit;

    const data = await db
      .select({
        id: comments.id,
        content: comments.content,
        userName: comments.userName,
        createdAt: comments.createdAt,
        // Hum article title bhi fetch karenge taki admin ko pata chale comment kis news par hai
        articleTitle: articles.title,
      })
      .from(comments)
      .leftJoin(articles, eq(comments.articleId, articles.id))
      .limit(limit)
      .offset(offset)
      .orderBy(desc(comments.createdAt));

    return data;
  } catch (error) {
    console.error("Admin Fetch Error:", error);
    return [];
  }
}
