import Image from "next/image";
import {
  Clock,
  User,
  Share2,
  Facebook,
  Twitter,
  Bookmark,
  AwardIcon,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { NewsCard } from "@/components/news/NewsCard";
import {
  getArticleBySlug,
  getPublicArticles,
} from "@/app/(admin-panel)/admin/manage-news/_actions/actions";
import { format, formatDistanceToNow } from "date-fns";

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>; // 1. Type ko Promise banayein
}) {
  // 2. Params ko await karke slug nikalen
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
    .filter((a) => a.categoryName === article.category.name && a.slug !== slug)
    .slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      {/* <BreakingNewsTicker /> */}

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Article Content */}
            <article className="lg:col-span-8 space-y-8">
              {/* Category Badge */}
              <Badge className="mb-4">{article.category.name}</Badge>

              {/* Article Title */}
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance leading-tight">
                {article.title}
              </h1>

              {/* Article Meta */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1.5" />
                  <span>{article.authorId?.charAt(0) || "A"}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4" />
                  <span>{format(new Date(article.createdAt), "PPP")}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1.5" />
                  <span>
                    {formatDistanceToNow(new Date(article.createdAt), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
              </div>

              {/* Share Buttons */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full hover:bg-blue-600 hover:text-white transition-colors"
                  >
                    <Facebook className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full hover:bg-sky-500 hover:text-white transition-colors"
                  >
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full hover:bg-green-600 hover:text-white transition-colors"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="ml-auto bg-transparent"
                  >
                    <Bookmark className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                </div>
                {/* <Button variant="outline" size="sm">
                  <Facebook className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm">
                  <Twitter className="h-4 w-4 mr-2" />
                  Tweet
                </Button>
                <Button variant="outline" size="sm">
                  <svg
                    className="h-4 w-4 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  More
                </Button> */}
                {/* <Button
                  variant="outline"
                  size="sm"
                  className="ml-auto bg-transparent"
                >
                  <Bookmark className="h-4 w-4 mr-2" />
                  Save
                </Button> */}
              </div>

              {/* Featured Image */}
              <div className="relative h-[400px] md:h-[500px] mb-8 rounded-lg overflow-hidden">
                <Image
                  src={article.featuredImage || "/placeholder.jpg"}
                  alt={article.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Article Body */}
              <div className="prose prose-lg max-w-none text-foreground">
                {/* <p className="text-xl leading-relaxed text-muted-foreground mb-6">
                  In a landmark policy decision announced today, the Finance Minister unveiled a comprehensive economic
                  reform package aimed at boosting GDP growth and creating millions of jobs across key sectors of the
                  economy.
                </p>

                <p className="leading-relaxed mb-4">
                  The historic announcement came during a special press conference at the Finance Ministry headquarters,
                  where the minister outlined the government's ambitious vision for economic transformation over the
                  next five years. The reform package includes significant tax reforms, infrastructure investments, and
                  incentives for innovation and entrepreneurship.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">Key Highlights of the Reform Package</h2>

                <p className="leading-relaxed mb-4">
                  The economic reform package encompasses several major initiatives designed to stimulate growth across
                  multiple sectors. Key components include a reduction in corporate tax rates for manufacturing and
                  technology companies, increased public spending on infrastructure development, and simplified
                  regulatory frameworks for small and medium enterprises.
                </p> */}

                {/* Ad Space */}
                <Card className="my-8 bg-muted">
                  <div className="flex items-center justify-center h-32 bg-secondary/50 rounded">
                    <p className="text-xs text-muted-foreground">
                      Advertisement
                    </p>
                  </div>
                </Card>

                {/* <p className="leading-relaxed mb-4">
                  Industry experts have welcomed the announcement, noting that these reforms address long-standing
                  concerns about competitiveness and ease of doing business. The minister emphasized that the package
                  was developed after extensive consultations with stakeholders across various sectors.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">Impact on Employment and Growth</h2>

                <p className="leading-relaxed mb-4">
                  According to government estimates, the reform package is expected to create approximately 10 million
                  new jobs over the next five years, with a particular focus on youth employment and skill development.
                  The GDP growth rate is projected to increase by 2-3 percentage points as a result of these measures.
                </p>

                <p className="leading-relaxed mb-4">
                  The Finance Minister also announced plans for enhanced support to the agricultural sector, including
                  modern infrastructure for supply chains, better access to credit, and technology adoption programs.
                  These initiatives aim to double farmers' incomes while ensuring food security for the nation.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">Implementation Timeline</h2>

                <p className="leading-relaxed mb-4">
                  The government has laid out a phased implementation plan, with the first set of reforms to take effect
                  from the beginning of the next fiscal year. A dedicated monitoring committee will oversee the
                  execution and track progress against key performance indicators.
                </p>

                <p className="leading-relaxed mb-4">
                  Opposition parties have sought more details on the funding mechanism and have called for a thorough
                  parliamentary debate on the proposals. The minister assured that detailed documentation would be
                  presented to parliament for comprehensive review and discussion.
                </p> */}
              </div>

              {/* Tiptap Content Rendering */}
              <div
                className="prose prose-lg dark:prose-invert max-w-none mt-10 prose-img:rounded-xl prose-headings:font-black prose-p:leading-relaxed"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              <Separator className="my-8" />

              {/* Tags */}
              {article.tags && article.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 mb-8">
                  <span className="text-sm font-medium text-foreground">
                    Tags:
                  </span>
                  {article.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="px-4 py-1.5 rounded-md hover:bg-primary hover:text-white transition-colors cursor-pointer"
                    >
                      #{tag}
                    </Badge>
                  ))}
                </div>
              )}

              <Separator className="my-8" />

              {/* Related Articles */}
              <div className="mt-12">
                {relatedArticles.length > 0 && (
                  <div className="pt-12 border-t space-y-8">
                    <h2 className="text-3xl font-black italic uppercase tracking-tighter">
                      You Might Also Like
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {relatedArticles.map((item) => (
                        <NewsCard
                          key={item.id}
                          article={item}
                          variant="small"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1">{/* <TrendingSidebar /> */}</aside>
          </div>
        </div>
      </main>
    </div>
  );
}
