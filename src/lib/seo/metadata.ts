import { PublicArticle } from "@/app/(admin-panel)/admin/manage-news/_actions/actions";
import { Metadata } from "next";

export function getArticleMetadata(article: PublicArticle): Metadata {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://news-media-theta.vercel.app";

  const siteName = "Your News Name";
  const url = `${baseUrl}/article/${article.slug}`;

  return {
    title: article.title,
    description: article.excerpt || article.title,
    alternates: { canonical: url },
    openGraph: {
      title: article.title,
      description: article.excerpt || article.title,
      url: url,
      siteName: siteName,
      images: [
        {
          url: article.featuredImage || "/logo.jpeg",
          width: 1200,
          height: 630,
        },
      ],
      type: "article",
      publishedTime: article.createdAt instanceof Date 
        ? article.createdAt.toISOString() 
        : article.createdAt,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt || article.title,
      images: [article.featuredImage || "/logo.jpeg"],
    },
  };
}
