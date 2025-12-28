"use client";

import { useEffect, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Clock, Eye, FileText, Loader2, Save, Upload } from "lucide-react";
import { getAllCategories } from "@/app/(admin-panel)/admin/categories/_actions/actions";
import { type categories as categoriesSchema } from "@/lib/db/schema/categories";
import Tiptap from "../ui/text-ediotr";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  ArticleUpdateInput,
  createArticle,
  updateArticle,
} from "@/app/(admin-panel)/admin/manage-news/_actions/actions";
import { articles } from "@/lib/db/schema";

type Category = typeof categoriesSchema.$inferSelect;
type Article = typeof articles.$inferSelect;

interface AddNewsFormProps {
  initialData?: Article | null;
}

export default function AddNewsFormContent({ initialData }: AddNewsFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // States
  const [title, setTitle] = useState(initialData?.title || "");
  const [categoryId, setCategoryId] = useState(initialData?.categoryId || "");
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "");
  const [content, setContent] = useState(initialData?.content || "<p></p>");
  const [tags, setTags] = useState(initialData?.tags?.join(", ") || "");
  const [videoUrl, setVideoUrl] = useState(initialData?.videoUrl || "");

  useEffect(() => {
    async function fetchCats() {
      setIsLoading(true);
      setError(null);
      try {
        const res = await getAllCategories();
        if ("error" in res) {
          setError(res.error);
        } else if (Array.isArray(res)) {
          setCategories(res);
        }
      } catch (error) {
        console.error("Failed to fetch categories", error);
        setError("An unexpected error occurred while fetching categories");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCats();
  }, []);

  const handleSubmit = async (status: "published" | "draft") => {
    if (!title || !categoryId || !excerpt || content === "<p></p>") {
      toast.error("Please fill all required fields (*)");
      return;
    }

    startTransition(async () => {
      const formData: ArticleUpdateInput = {
        title,
        excerpt,
        content,
        categoryId,
        videoUrl: videoUrl || undefined,
        tags: tags
          ? tags
              .split(",")
              .map((t) => t.trim())
              .filter((t) => t !== "")
          : [],
        status: status,
      };

      try {
        let result;
        // 2. Logic to decide between Update or Create
        if (initialData?.id) {
          result = await updateArticle(initialData.id, formData);
        } else {
          result = await createArticle(formData);
        }

        if (result.success) {
          toast.success(
            initialData ? "Article updated!" : "Article published!"
          );
          router.push("/admin/manage-news");
          router.refresh(); // Refresh list page
        } else {
          toast.error(result.error || "Something went wrong");
        }
      } catch (err) {
        toast.error("An error occurred while saving");
      }
    });
  };

  return (
    <main className="flex-1 overflow-y-auto bg-background">
      <div className="container mx-auto p-6 max-w-4xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">
            {initialData ? "Edit Article" : "Add New Article"}
          </h1>
          <p className="text-muted-foreground">
            {initialData
              ? "Make changes to your article"
              : "Create and publish a new news Article"}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Article Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Article Title *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter article Title..."
                className="text-base"
              />
            </div>

            {/* Category & Author */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select onValueChange={setCategoryId} value={categoryId}>
                  <SelectTrigger id="category">
                    <SelectValue
                      placeholder={isLoading ? "Loading..." : "Select category"}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {isLoading ? (
                      <div className="p-2 text-sm text-muted-foreground">
                        Loading categories...
                      </div>
                    ) : error ? (
                      <div className="p-2 text-sm text-destructive">
                        {error}
                      </div>
                    ) : categories.length > 0 ? (
                      categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="none" disabled>
                        No categories found
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Excerpt */}
            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt *</Label>
              <Textarea
                id="excerpt"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Brief summary of the article (2-3 sentences)..."
                rows={3}
              />
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <Label>Featured Image *</Label>
              <label
                htmlFor="featured-image"
                className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:bg-secondary/50 transition-colors cursor-pointer block"
              >
                <input
                  id="featured-image"
                  type="file"
                  accept="image/png,image/jpeg,image/gif"
                  className="sr-only"
                  aria-label="Upload featured image"
                />
                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-1">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-muted-foreground">
                  PNG, JPG, GIF up to 10MB
                </p>
              </label>
            </div>

            {/* Content Editor */}
            <div className="space-y-2">
              <Label htmlFor="content">Article Content *</Label>
              <Tiptap content={content} onChange={setContent} />
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="tag1, tag2..."
              />
              <p className="text-xs text-muted-foreground">
                Example: politics, economy, reform, etc.
              </p>
            </div>

            {/* Video URL */}
            <div className="space-y-2">
              <Label htmlFor="video">Video URL</Label>
              <Input
                id="video"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="YouTube or Video URL...."
              />
            </div>

            {/* Actions */}
            <div className="pt-6 border-t border-border">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {/* <Button
                  variant="outline"
                  className="w-full"
                  disabled={isPending}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button> */}

                <Button
                  variant="outline"
                  className="w-full"
                  disabled={isPending}
                  onClick={() => handleSubmit("draft")}
                >
                  {isPending ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
                  Save Draft
                </Button>

                <Button
                  className="w-full"
                  disabled={isPending}
                  onClick={() => handleSubmit("published")}
                >
                  {isPending && (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  )}
                  {initialData ? "Update Article" : "Publish Now"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
