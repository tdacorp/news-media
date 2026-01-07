"use server";

import { db } from "@/lib/db";
import { articles } from "@/lib/db/schema";
import { comments } from "@/lib/db/schema/comments";
import { eq, desc, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { auth } from "../../../../auth";

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

// 3. Delete Action both User/Admin
export async function deleteComment(commentId: string) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { success: false, error: "Authentication required" };
    }

    const userId = session.user.id;
    const isAdmin = session.user.role === "admin";

    if (isAdmin) {
      await db.delete(comments).where(eq(comments.id, commentId));
    } else {
      await db
        .delete(comments)
        .where(and(eq(comments.id, commentId), eq(comments.userId, userId)));
    }
    revalidatePath("/admin/comments");
    revalidatePath("/article/[slug]", "page");
    return { success: true };
  } catch (error) {
    console.error("Delete Error:", error);
    return { success: false, error: "operation failed" };
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

// Toggle Visibility Action
export async function toggleCommentVisibility(
  commentId: string,
  currentStatus: boolean
) {
  try {
    await db
      .update(comments)
      .set({ isVisible: currentStatus ? "false" : "true" })
      .where(eq(comments.id, commentId));
    revalidatePath("/admin/comments");
    return { success: true };
  } catch {
    return { success: false };
  }
}

// Admin Reply Action
// export async function adminReplyToComment(
//   commentId: string,
//   replyText: string
// ) {
//   return { success: true, message: "Reply functionality ready for V2" };
// }
