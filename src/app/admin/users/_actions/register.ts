"use server";

import { db } from "@/lib/db";
import { users } from "@/lib/db/schema/user";
import { userRegistrationSchema } from "@/lib/validations/user";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

export async function registerUser(data: any) {
  const rawData =
    data instanceof FormData ? Object.fromEntries(data.entries()) : data;
  const result = userRegistrationSchema.safeParse(rawData);

  if (!result.success) {
    const errorMessages = result.error.flatten().fieldErrors;
    console.log("Validation Failed:", errorMessages);
    return { error: errorMessages };
  }

  const { email, password, name, username } = result.data;

  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    await db.insert(users).values({
      name,
      username,
      email,
      password: hashedPassword,
      role: "user",
    });

    revalidatePath("/admin/users");
    return { success: "User created successfully!" };
  } catch (error: any) {
    if (error.code === "23505") {
      return { error: "Email or Username already exists." };
    }
    return { error: "Something went wrong. Please try again." };
  }
}
