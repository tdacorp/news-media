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
import {
  Loader2,
  Save,
  Upload,
  Link as LinkIcon,
  X,
  ImageIcon,
  File,
} from "lucide-react";
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
import Image from "next/image";
import { getYouTubeID } from "@/lib/utils";

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
  const [featuredImage, setFeaturedImage] = useState(
    initialData?.featuredImage || ""
  );
  const [uploadMode, setUploadMode] = useState<"file" | "url">("file");

  useEffect(() => {
    async function fetchCats() {
      setIsLoading(true);
      try {
        const res = await getAllCategories();
        if ("error" in res) setError(res.error);
        else if (Array.isArray(res)) setCategories(res);
      } catch (err) {
        setError("Failed to fetch categories");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCats();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        toast.error("Image is too large! Please select an image under 3MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => setFeaturedImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (status: "published" | "draft") => {
    if (
      !title ||
      !categoryId ||
      !excerpt ||
      !featuredImage ||
      content === "<p></p>"
    ) {
      toast.error("Please fill all required fields (*)");
      return;
    }

    startTransition(async () => {
      const formData: ArticleUpdateInput = {
        title,
        excerpt,
        content,
        categoryId,
        featuredImage,
        videoUrl: videoUrl || undefined,
        tags: tags
          ? tags
              .split(",")
              .map((t) => t.trim())
              .filter((t) => t !== "")
          : [],
        status,
      };

      try {
        const result = initialData?.id
          ? await updateArticle(initialData.id, formData)
          : await createArticle(formData);

        if (result.success) {
          toast.success(initialData ? "Updated!" : "Published!");
          router.push("/admin/manage-news");
          router.refresh();
        } else {
          toast.error(result.error || "Error saving article");
        }
      } catch (err) {
        toast.error("An unexpected error occurred");
      }
    });
  };

  const renderUniversalVideoPreview = (url: string) => {
    if (!url) return null;

    // YouTube Check
    const ytId = getYouTubeID(url);
    if (ytId) {
      return (
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube.com/embed/${ytId}`}
          allowFullScreen
        />
      );
    }

    // Facebook Check
    if (url.includes("facebook.com") || url.includes("fb.watch")) {
      return (
        <iframe
          src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
            url
          )}&show_text=0`}
          className="absolute inset-0 w-full h-full"
          allowFullScreen
        />
      );
    }

    // Instagram Check
    if (url.includes("instagram.com")) {
      const cleanUrl = url.split("?")[0]; // Query params hatane ke liye
      return (
        <iframe
          src={`${cleanUrl}embed`}
          className="absolute inset-0 w-full h-full"
          allowFullScreen
        />
      );
    }

    // Fallback: Agar koi direct MP4 link ya generic link hai
    return (
      <div className="flex items-center justify-center h-full bg-secondary text-xs text-muted-foreground p-4 text-center">
        Preview not available for this platform, but link will be saved.
      </div>
    );
  };

  return (
    <main className="flex-1 bg-background pb-24 md:pb-8">
      <div className="container mx-auto p-4 md:p-8 max-w-5xl">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight">
              {initialData ? "Edit Story" : "Write New Story"}
            </h1>
            <p className="text-muted-foreground text-sm md:text-base">
              {initialData
                ? "Refine your content for better reach."
                : "Start drafting your next big headline."}
            </p>
          </div>

          {/* Desktop Actions - Hidden on Mobile */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => handleSubmit("draft")}
              disabled={isPending}
            >
              {isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              Save Draft
            </Button>
            <Button
              onClick={() => handleSubmit("published")}
              disabled={isPending}
            >
              {isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Upload className="h-4 w-4 mr-2" />
              )}
              {initialData ? "Update Now" : "Publish Now"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-sm border-none md:border">
              <CardContent className="p-4 md:p-6 space-y-6">
                <div className="space-y-2">
                  <Label className="text-base font-bold">Article Title *</Label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Breaking: New Policy Update 2024"
                    className="text-lg py-6 focus-visible:ring-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-base font-bold">Main Content *</Label>
                  <div className="min-h-[400px] prose prose-sm max-w-none">
                    <Tiptap content={content} onChange={setContent} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Short Summary *</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Summarize your story in 2-3 sentences..."
                  className="min-h-[100px] resize-none"
                />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Area (Featured Image & Settings) */}
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Media *</CardTitle>
                  <div className="flex p-1 bg-muted rounded-md scale-90">
                    <Button
                      variant={uploadMode === "file" ? "secondary" : "ghost"}
                      size="sm"
                      onClick={() => setUploadMode("file")}
                      className="h-7 px-2 text-xs"
                    >
                      <File className="h-4 w-4" />
                      File
                    </Button>
                    <Button
                      variant={uploadMode === "url" ? "secondary" : "ghost"}
                      size="sm"
                      onClick={() => setUploadMode("url")}
                      className="h-7 px-2 text-xs"
                    >
                      <LinkIcon className="h-4 w-4" />
                      URL
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {featuredImage ? (
                  <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden border">
                    <Image
                      src={featuredImage}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-7 w-7 rounded-full"
                      onClick={() => setFeaturedImage("")}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="w-full">
                    {uploadMode === "file" ? (
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 border-muted-foreground/20">
                        <ImageIcon className="h-8 w-8 text-muted-foreground mb-2" />
                        <span className="text-xs text-muted-foreground font-medium">
                          Upload Header Image
                        </span>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleFileChange}
                        />
                      </label>
                    ) : (
                      <Input
                        placeholder="Image Link..."
                        value={featuredImage}
                        onChange={(e) => setFeaturedImage(e.target.value)}
                        className="text-sm"
                      />
                    )}
                  </div>
                )}
                <div className="space-y-2">
                  <Label className="text-sm font-bold">Category *</Label>
                  <Select onValueChange={setCategoryId} value={categoryId}>
                    <SelectTrigger className="w-full">
                      <SelectValue
                        placeholder={
                          isLoading ? "Loading..." : "Select Category"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-bold">Tags</Label>
                  <Input
                    placeholder="politics, technology..."
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                  />
                </div>
                <div className="space-y-4 pt-2">
                  <div className="space-y-2">
                    <Label
                      htmlFor="video"
                      className="flex items-center gap-2 text-sm font-bold"
                    >
                      <LinkIcon className="h-4 w-4" /> Video URL
                    </Label>
                    <Input
                      id="video"
                      value={videoUrl}
                      onChange={(e) => setVideoUrl(e.target.value)}
                      placeholder="https://www.youtube.com/..."
                      className="bg-background"
                    />
                  </div>

                  {/* Video Preview Box */}
                  {/* {videoUrl && getYouTubeID(videoUrl) && (
                    <div className="relative aspect-video w-full rounded-xl overflow-hidden border bg-black shadow-inner">
                      <iframe
                        className="absolute top-0 left-0 w-full h-full"
                        src={`https://www.youtube.com/embed/${getYouTubeID(
                          videoUrl
                        )}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  )} */}
                  {videoUrl && (
                    <div className="mt-3 relative aspect-video rounded-lg overflow-hidden border bg-black shadow-sm">
                      {renderUniversalVideoPreview(videoUrl)}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Mobile Floating Bar - Visible ONLY on Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-lg border-t p-4 z-50 flex gap-3">
        <Button
          variant="outline"
          className="flex-1 py-6 border-2"
          onClick={() => handleSubmit("draft")}
          disabled={isPending}
        >
          <Save className="h-4 w-4 mr-2" /> Draft
        </Button>
        <Button
          className="flex-[2] py-6 shadow-lg shadow-primary/20"
          onClick={() => handleSubmit("published")}
          disabled={isPending}
        >
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          ) : (
            <Upload className="h-4 w-4 mr-2" />
          )}
          {initialData ? "Update" : "Publish"}
        </Button>
      </div>
    </main>
  );
}
