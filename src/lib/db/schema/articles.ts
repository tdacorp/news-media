import { relations } from "drizzle-orm";
import { users } from "./user"; 
import { categories } from "./categories";
import { pgTable, text, varchar, timestamp, uuid, pgEnum, index } from "drizzle-orm/pg-core";

export const statusEnum = pgEnum("status", ["draft", "published", "archived"]);

export const articles = pgTable("articles", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).unique().notNull(),

  excerpt: text("excerpt"),

  content: text("content").notNull(),

  featuredImage: text("featured_image"),
  videoUrl: text("video_url"),

  authorId: text("author_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  categoryId: uuid("category_id").references(() => categories.id).notNull(),

  tags: text("tags").array().default([]),

  status: statusEnum("status").default("draft").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => {
  return {
    statusIdx: index("status_idx").on(table.status), 
    createdIdx: index("created_idx").on(table.createdAt), 
  };
});

export const articlesRelations = relations(articles, ({ one }) => ({
  author: one(users, {
    fields: [articles.authorId],
    references: [users.id],
  }),
  category: one(categories, {
    fields: [articles.categoryId],
    references: [categories.id],
  }),
}));