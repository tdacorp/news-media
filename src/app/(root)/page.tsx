import {
  getPublicArticles,
  type PublicArticle,
} from "@/app/(admin-panel)/admin/manage-news/_actions/actions";
import { NewsCard } from "@/components/news/NewsCard";
import { CategorySections } from "@/components/news/CategorySections";
import { HomeSidebar } from "@/components/news/HomeSidebar";

export default async function Home() {
  const allArticles = (await getPublicArticles()) as PublicArticle[];

  if (!allArticles || allArticles.length === 0) {
    return (
      <div className="text-center py-20 font-bold">No News Published Yet.</div>
    );
  }

  // 1. Hero News (Sabse pehli latest news)
  const heroNews = allArticles[0];

  return (
    <>
      <div className="min-h-screen flex flex-col">
        {/* <BreakingNewsTicker /> */}

        <main className="flex-1">
          <div className="container mx-auto px-4 py-8">
            {/* Hero Section */}
            <div className="mb-12">
              <NewsCard article={heroNews} variant="large" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-12">
                {/* Ad Space */}
                <div className="bg-muted rounded-lg">
                  <div className="flex items-center justify-center h-24 bg-secondary/50 rounded">
                    <p className="text-xs text-muted-foreground">
                      Advertisement
                    </p>
                  </div>
                </div>

                {/* Category Sections */}
                <CategorySections articles={allArticles} />
              </div>

              {/* Sidebar */}
              <aside className="lg:col-span-1">
                <HomeSidebar articles={allArticles} />
              </aside>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
