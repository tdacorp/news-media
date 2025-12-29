import { NewsCard } from "@/components/news/NewsCard";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { type PublicArticle } from "@/app/(admin-panel)/admin/manage-news/_actions/actions";

export function CategorySections({ articles }: { articles: PublicArticle[] }) {
  // Grouping logic inside component
  const sections = articles.reduce((acc: Record<string, PublicArticle[]>, article) => {
    const cat = article.categoryName || "General";
    if (!acc[cat]) acc[cat] = [];
    if (acc[cat].length < 3) acc[cat].push(article);
    return acc;
  }, {});

  return (
    <div className="space-y-12">
      {Object.entries(sections).map(([categoryName, newsItems], index) => (
        <div key={categoryName}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold border-l-4 border-primary pl-3 text-foreground uppercase tracking-tight">
              {categoryName}
            </h2>
            <Button variant="outline" size="sm" asChild>
              <a href={`/category/${categoryName.toLowerCase()}`}>View All</a>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {newsItems.map((item) => (
              <NewsCard key={item.id} article={item} variant="small" />
            ))}
          </div>
          {index < Object.entries(sections).length - 1 && (
            <Separator className="mt-12" />
          )}
        </div>
      ))}
    </div>
  );
}