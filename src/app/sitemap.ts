import { MetadataRoute } from "next";
import { getPublicArticles } from "@/app/(admin-panel)/admin/manage-news/_actions/actions";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://news-media-theta.vercel.app";

  // 1. Fetch all articles from DB
  const articles = await getPublicArticles();

  // 2. Map articles to sitemap format
  const articleUrls = articles.map((article) => ({
    url: `${baseUrl}/article/${article.slug}`,
    lastModified: new Date(article.updatedAt || article.createdAt),
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  // 3. Static Pages (Home, Category, etc.)
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "always" as const,
      priority: 1,
    },
    ...articleUrls,
  ];
}
