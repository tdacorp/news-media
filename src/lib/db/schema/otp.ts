import { pgTable, uuid, text, timestamp, integer } from "drizzle-orm/pg-core"

export const otps = pgTable("otps", {
  id: uuid("id").defaultRandom().primaryKey(),

  identifier: text("identifier").notNull(), // email or phone
  code: text("code").notNull(),

  purpose: text("purpose").notNull(), // "login" | "verify"

  expiresAt: timestamp("expires_at").notNull(),
  consumedAt: timestamp("consumed_at"),

  attempts: integer("attempts").default(0).notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
})
