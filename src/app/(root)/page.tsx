import {
  getPublicArticles,
  type PublicArticle,
} from "@/app/(admin-panel)/admin/manage-news/_actions/actions";
import { NewsCard } from "@/components/news/NewsCard"; // Path check kar lena
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TrendingUp, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { formatDistanceToNowStrict } from "date-fns";

export default async function Home() {
  const allArticles = (await getPublicArticles()) as PublicArticle[];

  if (!allArticles || allArticles.length === 0) {
    return (
      <div className="text-center py-20 font-bold">No News Published Yet.</div>
    );
  }

  // 1. Hero News (Sabse pehli latest news)
  const heroNews = allArticles[0];

  // 2. Group Articles by Category (Dynamic)
  const sections = allArticles.reduce(
    (acc: Record<string, PublicArticle[]>, article) => {
      const cat = article.categoryName || "General";
      if (!acc[cat]) acc[cat] = [];
      if (acc[cat].length < 3) acc[cat].push(article); // Har category ki top 3
      return acc;
    },
    {}
  );

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
                {Object.entries(sections).map(
                  ([categoryName, newsItems]: any, index) => (
                    <div key={categoryName}>
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold border-l-4 border-primary pl-3 text-foreground">
                          {categoryName}
                        </h2>
                        <Button variant="outline" size="sm" asChild>
                          <a href={`/${categoryName.toLowerCase()}`}>
                            View All
                          </a>
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {newsItems.map((item: any) => (
                          <NewsCard
                            key={item.id}
                            article={item}
                            variant="small"
                          />
                        ))}
                      </div>
                      {index < Object.entries(sections).length - 1 && (
                        <Separator className="mt-12" />
                      )}
                    </div>
                  )
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="space-y-6">
                  {/* Trending News */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center text-lg">
                        <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                        Trending Now
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {allArticles.slice(0, 6).map((news, index) => (
                        <div key={news.id}>
                          <Link href={`/article/${news.slug}`}>
                            <div className="flex space-x-3 group cursor-pointer">
                              <span className="text-2xl font-bold text-muted-foreground">
                                {String(index + 1).padStart(2, "0")}
                              </span>
                              <div className="flex-1">
                                <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                                  {news.title}
                                </h4>
                                <div className="flex items-center text-xs text-muted-foreground mt-1">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {formatDistanceToNowStrict(
                                    new Date(news.createdAt),
                                    { addSuffix: true }
                                  )}
                                </div>
                              </div>
                            </div>
                          </Link>
                          {index < allArticles.slice(0, 6).length - 1 && (
                            <Separator className="mt-4" />
                          )}
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Ad Space */}
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-center h-[300px] bg-secondary/50 rounded">
                        <p className="text-xs text-muted-foreground">
                          Advertisement
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Latest News */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center text-lg">
                        <Clock className="h-5 w-5 mr-2 text-primary" />
                        Latest News
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {allArticles.slice(0, 6).map((news, index) => (
                        <div key={news.id}>
                          <Link href={`/article/${news.slug}`}>
                            <div className="flex space-x-3 group cursor-pointer">
                              <span className="text-2xl font-bold text-muted-foreground">
                                {String(index + 1).padStart(2, "0")}
                              </span>
                              <div className="flex-1">
                                <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                                  {news.title}
                                </h4>
                                <div className="flex items-center text-xs text-muted-foreground mt-1">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {formatDistanceToNowStrict(
                                    new Date(news.createdAt),
                                    { addSuffix: true }
                                  )}
                                </div>
                              </div>
                            </div>
                          </Link>
                          {index < allArticles.slice(0, 6).length - 1 && (
                            <Separator className="mt-4" />
                          )}
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Newsletter Subscription */}
                  <Card className="bg-primary text-primary-foreground">
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Subscribe to Newsletter
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-4 text-primary-foreground/90">
                        Get the latest news delivered directly to your inbox
                      </p>
                      <div className="space-y-2">
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
                        />
                        <Button className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                          Subscribe
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      {/* <main className="container mx-auto px-4 py-8">
        <div className="mb-12">
          <NewsCard article={heroNews} variant="large" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-12">
            {Object.entries(sections).map(
              ([categoryName, newsItems]: any, index) => (
                <div key={categoryName}>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold border-l-4 border-primary pl-3">
                      {categoryName}
                    </h2>
                    <Button variant="ghost" size="sm">
                      View All
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {newsItems.map((item: any) => (
                      <NewsCard key={item.id} article={item} variant="small" />
                    ))}
                  </div>
                  {index < Object.entries(sections).length - 1 && (
                    <Separator className="mt-12" />
                  )}
                </div>
              )
            )}
          </div>

          <div className="lg:col-span-1 space-y-6">
            <h2 className="text-xl font-bold bg-black text-white p-2 text-center uppercase">
              Trending
            </h2>
            {allArticles.slice(0, 6).map((item) => (
              <div key={item.id} className="border-b pb-3 group">
                <p className="text-xs text-primary font-bold">
                  {item.categoryName}
                </p>
                <h4 className="font-semibold group-hover:underline cursor-pointer leading-snug">
                  {item.title}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </main> */}
    </>
  );
}
