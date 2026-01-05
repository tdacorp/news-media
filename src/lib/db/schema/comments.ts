import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { articles } from "./articles"; 

export const comments = pgTable("comments", {
  id: uuid("id").primaryKey().defaultRandom(),
  articleId: uuid("article_id")
    .references(() => articles.id, { onDelete: "cascade" })
    .notNull(),
  
  userId: text("user_id").notNull(),
  userName: text("user_name").notNull(),
  userImage: text("user_image"), 
  
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Comment = typeof comments.$inferSelect;
export type NewComment = typeof comments.$inferInsert;