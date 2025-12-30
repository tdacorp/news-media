import {
  getPublicArticles,
  type PublicArticle,
} from "@/app/(admin-panel)/admin/manage-news/_actions/actions";
import { NewsCard } from "@/components/news/NewsCard";
import { CategorySections } from "@/components/news/CategorySections";
import { HomeSidebar } from "@/components/news/HomeSidebar";
import { Separator } from "@/components/ui/separator";
import { VisualStories } from "@/components/news/VisualStories";

export default async function Home() {
  const allArticles = (await getPublicArticles()) as PublicArticle[];

  if (!allArticles || allArticles.length === 0) {
    return (
      <div className="text-center py-20 font-bold">No News Published Yet.</div>
    );
  }

  const heroNews = allArticles[0];
  const sideGridNews = allArticles.slice(1, 5);
  const horizontalWall = allArticles.slice(5, 9);
  const visualStoriesData = allArticles.slice(9, 15);
  const infiniteWall = allArticles.slice(15);

  return (
    <>
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-6 space-y-10">
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8">
              <NewsCard article={heroNews} variant="hero" />
            </div>
            <div className="lg:col-span-4 flex flex-col gap-4">
              <h2 className="text-xl font-black italic uppercase border-l-4 border-primary pl-3 mb-2">
                Trending Now
              </h2>
              {sideGridNews.map((article) => (
                <NewsCard
                  key={article.id}
                  article={article}
                  variant="compact"
                />
              ))}
            </div>
          </section>

          <Separator />
          <div className="w-full bg-muted/50 rounded-xl border-2 border-dashed border-border p-8 flex items-center justify-center">
            <div className="text-center">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-1">
                Advertisement
              </span>
              <div className="text-xl font-medium text-muted-foreground/40 italic">
                Global Ad Space
              </div>
            </div>
          </div>

          <section className="space-y-6">
            <div className="flex items-center justify-between border-b-2 border-primary/20 pb-2">
              <h2 className="text-2xl font-black uppercase italic tracking-tighter">
                Top Headlines
              </h2>
              <span className="text-xs font-bold text-primary hover:underline cursor-pointer">
                View All
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {horizontalWall.map((article) => (
                <NewsCard key={article.id} article={article} variant="grid" />
              ))}
            </div>
          </section>

          <div className="w-full bg-muted/50 rounded-xl border-2 border-dashed border-border p-8 flex items-center justify-center">
            <div className="text-center">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-1">
                Advertisement
              </span>
              <div className="text-xl font-medium text-muted-foreground/40 italic">
                Global Ad Space
              </div>
            </div>
          </div>

          {/* VISUAL STORIES (CAROUSEL) */}
          <VisualStories articles={visualStoriesData} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-16">
              <CategorySections articles={allArticles} />
              <section className="space-y-6">
                <h2 className="text-xl font-black uppercase bg-primary text-white inline-block px-4 py-1 skew-x-[-10deg]">
                  Must Read
                </h2>
                <div className="grid grid-cols-1 gap-6">
                  {infiniteWall.slice(13, 18).map((article) => (
                    <NewsCard
                      key={article.id}
                      article={article}
                      variant="list"
                    />
                  ))}
                </div>
              </section>
            </div>

            <aside className="lg:col-span-1 space-y-8">
              <div className="sticky top-24">
                <HomeSidebar articles={allArticles} />
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}
