import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getAllArticles } from "./_actions/actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { db } from "@/lib/db";
import { categories } from "@/lib/db/schema";
import { ArticleFilters } from "@/components/admin-component/article-filters";
import { ArticleActions } from "@/components/admin-component/article-actions";

export default async function ManageNewsPage({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    category?: string;
    status?: string;
  }>;
}) {
  const filters = await searchParams;
  const articlesData = await getAllArticles(filters);
  const categoriesList = await db.select().from(categories);

  // Error handling
  if ("error" in articlesData) {
    return <div className="p-6 text-destructive">{articlesData.error}</div>;
  }

  return (
    <main className="flex-1 overflow-y-auto bg-background">
      <div className="container mx-auto p-4 md:p-6">
        {/* Page Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Manage Articles
            </h1>
            <p className="text-muted-foreground mt-1">
              Create, edit and manage your news stories across all categories.
            </p>
          </div>
          <Button asChild className="shrink-0 shadow-sm">
            <Link href="/admin/add-news">
              <Plus className="w-4 h-4 mr-2" /> New Article
            </Link>
          </Button>
        </div>

        {/* Filters */}
        <ArticleFilters categoriesList={categoriesList} />

        {/* Articles Table */}
        <Card>
          <CardHeader>
            <CardTitle>Articles</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {articlesData.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center py-10 text-muted-foreground"
                    >
                      No articles found. Start by creating one!
                    </TableCell>
                  </TableRow>
                ) : (
                  articlesData.map((article) => (
                    <TableRow key={article.id}>
                      <TableCell className="font-medium max-w-xs">
                        <div className="truncate">{article.title}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {article.categoryName}
                        </Badge>
                      </TableCell>
                      <TableCell>{article.authorName}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            article.status === "published"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {article.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {format(new Date(article.createdAt), "MMM dd, yyyy")}
                      </TableCell>
                      <TableCell className="text-right">
                        <ArticleActions article={article} />
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
