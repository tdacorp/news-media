import Image from "next/image";
import { PlayCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { NewsCard } from "@/components/news/NewsCard";
import {
  getArticleBySlug,
  getPublicArticles,
} from "@/app/(admin-panel)/admin/manage-news/_actions/actions";
import { HomeSidebar } from "@/components/news/HomeSidebar";
import { ArticleRenderer } from "@/components/news/ArticleRenderer";
import { getYouTubeID } from "@/lib/utils";
import { AuthorMetaCard } from "@/components/news/AuthorMetaCard";

// SEO Imports
import { Metadata } from "next";
import { getArticleMetadata } from "@/lib/seo/metadata";
import { NewsArticleSchema } from "@/lib/seo/schema";

// 1. GENERATE METADATA (Dynamic SEO)
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) return { title: "Article Not Found" };

  return getArticleMetadata(article);
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return (
      <div className="text-center py-20 font-bold">
        No Article Detail found.
      </div>
    );
  }

  const allArticles = await getPublicArticles();
  const relatedArticles = allArticles
    .filter((a) => a.categoryName === article.categoryName && a.slug !== slug)
    .slice(0, 3);

  const videoUrl = article.videoUrl;
  const ytId = videoUrl ? getYouTubeID(videoUrl) : null;
  const isVideo = !!videoUrl && videoUrl.trim() !== "" && videoUrl !== " ";

  return (
    <div className="min-h-screen bg-background">
      {/* 2. SEO INJECT SCHEMA (JSON-LD) */}
      <NewsArticleSchema article={article} />

      {/* <BreakingNewsTicker /> */}

      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Article Content */}
          <article className="lg:col-span-8 space-y-8">
            <div className="space-y-4">
              {/* Category Badge */}
              <Badge
                variant="destructive"
                className="uppercase tracking-widest px-4 py-1"
              >
                {article.categoryName}
              </Badge>

              {/* Article Title */}
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance leading-tight">
                {article.title}
              </h1>

              <p className="text-lg md:text-md text-muted-foreground mb-4 text-balance leading-tight">
                {article.excerpt}
              </p>
            </div>

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

            {/* MEDIA SECTION */}
            <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl bg-black group">
              {isVideo ? (
                <div className="aspect-video w-full bg-black flex items-center justify-center">
                  {ytId ? (
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${ytId}?autoplay=0&rel=0`}
                      title={article.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <video
                      src={videoUrl}
                      controls
                      poster={article.featuredImage || undefined}
                      className="w-full h-full object-contain"
                    />
                  )}
                </div>
              ) : (
                <div className="relative aspect-video md:h-[500px]">
                  <Image
                    src={article.featuredImage || "/placeholder.jpg"}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                  />
                </div>
              )}

              {/* Optional: Overlay label for Video */}
              {isVideo && (
                <div className="absolute top-4 left-4 pointer-events-none">
                  <Badge className="bg-black/60 backdrop-blur-md border-white/20 text-[10px] gap-1.5">
                    <PlayCircle className="h-3 w-3 fill-white" /> EXCLUSIVE
                    VIDEO
                  </Badge>
                </div>
              )}
            </div>

            {/* AUTHOR & META CARD */}
            <AuthorMetaCard article={article} />

            {/* Article Body Tiptap Content Rendering */}
            <ArticleRenderer content={article.content} />

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-3 mb-8">
                <span className="text-sm font-bold tracking-widest text-muted-foreground">
                  Tags:
                </span>
                {article.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="px-3 py-1 rounded-md hover:bg-primary hover:text-white transition-colors cursor-pointer"
                  >
                    #{tag}
                  </Badge>
                ))}
              </div>
            )}

            <Separator className="my-8" />

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

            {/* Related Articles */}
            <div className="mt-12">
              {relatedArticles.length > 0 && (
                <div className="pt-12 border-t space-y-8">
                  <h2 className="text-3xl font-black italic uppercase tracking-tighter border-l-4 border-primary pl-4">
                    You Might Also Like
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {relatedArticles.map((item) => (
                      <NewsCard key={item.id} article={item} variant="list" />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24 space-y-8">
              <HomeSidebar articles={allArticles} />
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
