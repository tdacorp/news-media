"use client";

import { PublicArticle } from "@/app/(admin-panel)/admin/manage-news/_actions/actions";
import { NewsCard } from "./NewsCard";

export function VisualStories({ articles }: { articles: PublicArticle[] }) {
  return (
    <section className="bg-slate-950 py-10 rounded-2xl overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-6 w-2 bg-red-600 rounded-full" />
          <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter">
            Visual Stories
          </h2>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide snap-x">
          {articles.map((article) => (
            <div
              key={article.id}
              className="min-w-[280px] md:min-w-[320px] snap-start"
            >
              <NewsCard article={article} variant="hero" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
