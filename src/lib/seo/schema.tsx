import { PublicArticle } from "@/app/(admin-panel)/admin/manage-news/_actions/actions";

export function NewsArticleSchema({ article }: { article: PublicArticle }) {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://your-vercel-project-name.vercel.app";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.excerpt || article.title,
    image: [article.featuredImage || "/logo.jpeg"],
    datePublished: new Date(article.createdAt).toISOString(),
    dateModified: new Date(
      article.updatedAt || article.createdAt
    ).toISOString(),
    author: [
      {
        "@type": "Person",
        name: article.authorName || "Editorial Team",
      },
    ],
    publisher: {
      "@type": "Organization",
      name: "Your News Name",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.jpeg`,
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
