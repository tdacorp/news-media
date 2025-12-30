import { NewsCard } from "@/components/news/NewsCard";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { type PublicArticle } from "@/app/(admin-panel)/admin/manage-news/_actions/actions";

export function CategorySections({ articles }: { articles: PublicArticle[] }) {
  // Grouping logic inside component
  const sections = articles.reduce(
    (
      acc: Record<string, { items: PublicArticle[]; slug: string }>,
      article
    ) => {
      const catName = article.categoryName || "General";
      const catSlug = article.categorySlug || "general";

      if (!acc[catName] && Object.keys(acc).length < 4) {
        acc[catName] = { items: [], slug: catSlug };
      }

      if (acc[catName] && acc[catName].items.length < 3) {
        acc[catName].items.push(article);
      }
      return acc;
    },
    {}
  );

  return (
    <div className="space-y-12">
      {Object.entries(sections).map(([name, data], index) => (
        <div key={name}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold border-l-4 border-primary pl-3 text-foreground uppercase tracking-tight">
              {name}
            </h2>
            <Button variant="outline" size="sm" asChild>
              <a href={`/category/${data.slug}`}>View All</a>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.items.map((item) => (
              <NewsCard key={item.id} article={item} variant="grid" />
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
