"use server";

import { db } from "@/lib/db";
import { users } from "@/lib/db/schema/user";
import { eq, and, ne, or, ilike, desc } from "drizzle-orm";
import { auth } from "../../../../../auth";
import { revalidatePath } from "next/cache";

// ID se user lana
export async function getUserById(id: string) {
  return await db.query.users.findFirst({
    where: eq(users.id, id),
  });
}

// Username se user lana
export async function getUserByUsername(username: string) {
  return await db.query.users.findFirst({
    where: eq(users.username, username),
  });
}

export async function getAllUsers(query?: string) {
  try {
    if (!query || query.trim() === "") {
      return await db.select().from(users).orderBy(desc(users.createdAt));
    }

    // search queryfilter by Name, Email ya Username
    return await db
      .select()
      .from(users)
      .where(
        or(
          ilike(users.name, `%${query}%`),
          ilike(users.email, `%${query}%`),
          ilike(users.username, `%${query}%`)
        )
      )
      .orderBy(desc(users.createdAt));
  } catch (error) {
    return [];
  }
}

// Helper: Admin Check function
async function isAdmin() {
  const session = await auth();
  if (!session?.user?.id) return { authorized: false, id: null };

  const [currentUser] = await db
    .select({ role: users.role })
    .from(users)
    .where(eq(users.id, session.user.id));

  return {
    authorized: currentUser?.role === "admin",
    currentUserId: session.user.id,
  };
}

// 1. UPDATE USER (Full Edit: Name, Username, Role)
export async function updateUserDetails(
  userId: string,
  data: { name: string; username: string; role: "admin" | "user" }
) {
  const check = await isAdmin();
  if (!check.authorized)
    return { error: "Unauthorized! Only admins can edit users." };

  try {
    if (data.username) {
      const [existingUser] = await db
        .select()
        .from(users)
        .where(and(eq(users.username, data.username), ne(users.id, userId)));

      if (existingUser) return { error: "Username already taken." };
    }

    await db
      .update(users)
      .set({
        name: data.name,
        username: data.username,
        role: data.role,
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId));

    revalidatePath("/admin/users");
    return { success: "User updated successfully" };
  } catch (error) {
    return { error: "Database error: Could not update user." };
  }
}

// 2. DELETE USER (Safe Delete)
export async function deleteUser(userId: string) {
  const check = await isAdmin();
  if (!check.authorized) return { error: "Unauthorized!" };

  if (check.currentUserId === userId) {
    return { error: "You cannot delete your own admin account!" };
  }

  try {
    const result = await db.delete(users).where(eq(users.id, userId));

    revalidatePath("/admin/users");
    return { success: "User deleted successfully" };
  } catch (error: any) {
    if (error.code === "23503") {
      return {
        error: "User has linked data (Articles/Posts) and cannot be deleted.",
      };
    }
    return { error: "Failed to delete user." };
  }
}
