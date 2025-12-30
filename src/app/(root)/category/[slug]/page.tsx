import { NewsCard } from "@/components/news/NewsCard";
import { getCategoryWithArticles } from "@/app/(admin-panel)/admin/categories/_actions/actions";
import { HomeSidebar } from "@/components/news/HomeSidebar";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const categoryData = await getCategoryWithArticles(slug);

  if (!categoryData || categoryData.articles.length === 0) {
    return (
      <div className="text-center py-20 font-bold">
        No Category Article found.
      </div>
    );
  }

  const allArticles = categoryData.articles || [];

  const featured = allArticles[0];
  const gridArticles = allArticles.slice(1, 9);
  const sidebarArticles = allArticles.slice(0, 6);

  return (
    <main className="container mx-auto px-4 py-10">
      {/* Top Ad Space */}
      <div className="w-full bg-muted/30 rounded-xl border border-border p-8 mb-10 flex items-center justify-center">
        <div className="text-center">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
            Advertisement - Global Ad Space
          </span>
        </div>
      </div>

      {/* Category Header */}
      <header className="mb-12 border-b-4 border-primary pb-4">
        <h1 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter">
          {categoryData.name}
        </h1>
        <p className="text-muted-foreground mt-2">
          {categoryData.name} se judi har badi khabar sabse pehle.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Main Section: High Density */}
        <div className="lg:col-span-8 space-y-12">
          {featured && <NewsCard article={featured} variant="hero" />}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {gridArticles.map((article) => (
              <NewsCard key={article.id} article={article} variant="grid" />
            ))}
          </div>
        </div>

        {/* Right Sidebar: Quick Links */}
        <aside className="lg:col-span-4 sticky top-24 space-y-10">
            <div className="bg-muted/50 p-6 rounded-2xl border border-border mb-6">
              <h3 className="font-bold mb-4 border-l-4 border-primary pl-2">
                Top in {categoryData.name}
              </h3>
              <div className="space-y-6">
                {sidebarArticles.map((article) => (
                  <NewsCard
                    key={article.id}
                    article={article}
                    variant="compact"
                  />
                ))}
              </div>
            </div>

            <HomeSidebar articles={allArticles} />
            <div className="mt-8 aspect-[3/4] bg-muted/20 rounded-xl border-2 border-dashed border-muted-foreground/20 flex items-center justify-center">
              <span className="text-[10px] font-bold text-muted-foreground/40 uppercase">
                Side Ad Space
              </span>
            </div>
        </aside>
      </div>
    </main>
  );
}
