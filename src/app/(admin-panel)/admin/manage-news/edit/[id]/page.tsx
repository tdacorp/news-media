import { getArticleById } from "../../_actions/actions";
import AddNewsFormContent from "@/components/admin-component/add-news-form-content";
import { notFound } from "next/navigation";

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = await getArticleById(id);

  // Check if article is null or has error
  if (!article || "error" in article) {
    return notFound();
  }

  return <AddNewsFormContent key={article.id} initialData={article} />;
}
