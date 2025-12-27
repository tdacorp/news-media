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
import { createArticle } from "@/app/(admin-panel)/admin/manage-news/_actions/actions";

type Category = typeof categoriesSchema.$inferSelect;

export default function AddNewsFormContent() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("<p></p>");
  const [tags, setTags] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

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
      toast.error("Please fill all required fields (*)")
      return;
    }

    startTransition(async () => {
      const result = await createArticle({
        title,
        excerpt,
        content,
        categoryId,
        videoUrl,
        tags: tags.split(",").map((t) => t.trim()).filter((t) => t !== ""),
        status,
      });

      if (result.success) {
        toast.success(`Article ${status === "published" ? "published" : "saved"}!`);
        router.push("/admin/manage-news");
      } else {
        toast.error(result.error || "Failed to save article");
      }
    })
  }

  return (
    <main className="flex-1 overflow-y-auto bg-background">
      <div className="container mx-auto p-6 max-w-4xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">
            Add New Article
          </h1>
          <p className="text-muted-foreground">
            Create and publish a new news Article
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
              <div className="space-y-2">
                <Label htmlFor="author">Author *</Label>
                <Input
                  id="author"
                  placeholder="Author name"
                  defaultValue="Admin User"
                  disabled
                />
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

            {/* Content Editor Placeholder */}
            <div className="space-y-2">
              <Label htmlFor="content">Article Content *</Label>
              {/* <div className="border border-border rounded-lg p-4 bg-secondary/20 min-h-[300px]">
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <FileText className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                  <p className="text-sm font-medium text-foreground mb-1">
                    Rich Text Editor
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Advanced editor for formatting article content
                  </p>
                </div>
              </div> */}
              <Tiptap content={content} onChange={setContent}/>
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Enter tags separated by commas...."
              />
              <p className="text-xs text-muted-foreground">
                Example: politics, economy, reform, etc.
              </p>
            </div>

            {/* Video URL */}
            <div className="space-y-2">
              <Label htmlFor="video">Video URL (optional)</Label>
              <Input 
                id="video"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)} 
                placeholder="YouTube or Video URL...." />
            </div>

            {/* Actions */}
            <div className="pt-6 border-t border-border">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <Button variant="outline" className="w-full" disabled={isPending}>
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>

                <Button 
                  variant="outline" 
                  className="w-full" 
                  disabled={isPending}
                  onClick={() => handleSubmit("draft")}
                >
                  {isPending ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                  Save Draft
                </Button>

                <Button variant="outline" className="w-full" disabled={isPending}>
                  <Clock className="h-4 w-4 mr-2" />
                  Schedule
                </Button>

                <Button 
                  className="w-full"
                  disabled={isPending}
                  onClick={() => handleSubmit("published")}
                >
                  {isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  Publish Now
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
