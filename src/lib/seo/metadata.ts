import { PublicArticle } from "@/app/(admin-panel)/admin/manage-news/_actions/actions";
import { Metadata } from "next";

export function getArticleMetadata(article: PublicArticle): Metadata {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://news-media-theta.vercel.app";

  const siteName = "Your News Name";
  const url = `${baseUrl}/article/${article.slug}`;
  const shareImage = article.featuredImage?.startsWith("http")
    ? article.featuredImage
    : `${baseUrl}${article.featuredImage || "/logo.jpeg"}`;

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
          url: shareImage,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      type: "article",
      publishedTime:
        article.createdAt instanceof Date
          ? article.createdAt.toISOString()
          : article.createdAt,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt || article.title,
      images: [shareImage],
    },
  };
}
