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
  X,
  ImageIcon,
  VideoIcon,
  Hash,
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
import { uploadMedia } from "@/lib/actions/media/upload";

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

  // Featured Image States
  const [featuredImage, setFeaturedImage] = useState(
    initialData?.featuredImage || ""
  );
  const [imgUploadMode, setImgUploadMode] = useState<"file" | "url">("file");
  const [isImgUploading, setIsImgUploading] = useState(false);

  // Video States
  const [videoUrl, setVideoUrl] = useState(initialData?.videoUrl || "");
  const [vidUploadMode, setVidUploadMode] = useState<"file" | "url">("url");
  const [isVidUploading, setIsVidUploading] = useState(false);
  const [activeTab, setActiveTab] = useState<"image" | "video">(
    initialData?.videoUrl ? "video" : "image"
  );

  // --- Logic for Active Display Check ---
  const isActuallyVideo =
    activeTab === "video" && videoUrl && videoUrl.trim() !== "";

  useEffect(() => {
    async function fetchCats() {
      setIsLoading(true);
      try {
        const res = await getAllCategories();
        if ("error" in res) setError(res.error as string);
        else if (Array.isArray(res)) setCategories(res);
      } catch {
        setError("Failed to fetch categories");
        toast.error("Failed to fetch categories");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCats();
  }, []);

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "image" | "video"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const maxSize = type === "video" ? 15 * 1024 * 1024 : 5 * 1024 * 1024;

    // Initial checks
    if (file.size > maxSize) {
      toast.error(
        `File too large! Max ${type === "video" ? "15MB" : "5MB"} allowed.`
      );
      return;
    }

    try {
      if (type === "image") setIsImgUploading(true);
      else setIsVidUploading(true);

      const formData = new FormData();
      formData.append("file", file);

      const res = await uploadMedia(formData);

      if (typeof res === "string") {
        if (type === "image") setFeaturedImage(res);
        else setVideoUrl(res);
        toast.success(`${type} uploaded successfully!`);
      } else {
        toast.error("Upload failed.");
      }
    } catch {
      toast.error("Error uploading file.");
    } finally {
      setIsImgUploading(false);
      setIsVidUploading(false);
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
      } catch {
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

    return (
      <video
        src={url}
        controls
        className="w-full h-full object-contain bg-black"
      />
    );
  };

  return (
    <main className="flex-1 bg-background pb-24 md:pb-8">
      <div className="container mx-auto p-4 md:p-8 max-w-6xl">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              {initialData ? "Edit News" : "Create Story"}
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
              {initialData ? "Update Story" : "Publish Story"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-6">
            <Card className="shadow-sm border-none ring-1 ring-border md:border">
              <CardContent className="p-4 md:p-6 space-y-6">
                {error && (
                  <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-2 rounded-md text-sm mb-4">
                    {error}
                  </div>
                )}
                <div className="space-y-2">
                  <Label className="text-sm font-bold uppercase text-muted-foreground">
                    Headline
                  </Label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter catchy news headline..."
                    className="text-2xl font-bold py-7 boder-none focus-visible:ring-1"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-bold uppercase text-muted-foreground">
                    Story Content
                  </Label>
                  <div className="min-h-[400px] rounded-md prose prose-sm max-w-none overflow-hidden">
                    <Tiptap content={content} onChange={setContent} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm ring-1 ring-border">
              <CardHeader>
                <CardTitle className="text-sm">Short Summary </CardTitle>
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

          {/* RIGHT: SIDEBAR */}
          <div className="lg:col-span-4 space-y-6">
            {/* --- MAIN MEDIA CARD --- */}
            <Card
              className={`overflow-hidden border-2 shadow-md bg-card transition-all duration-300 ${
                isActuallyVideo ? "border-amber-500/50" : "border-primary/20"
              }`}
            >
              <CardHeader className="bg-muted/30 pb-4 border-b pb-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <CardTitle className="text-xs font-bold uppercase tracking-widest">
                      Media thumbnails
                    </CardTitle>
                    <p className="text-[10px] text-muted-foreground">
                      Image is mandatory for thumbnails
                    </p>
                  </div>

                  {/* IMPROVED TOGGLE BUTTONS (Segmented Control) */}
                  <div className="flex bg-muted p-1 rounded-lg border shadow-sm scale-90">
                    <button
                      type="button"
                      // onClick={() => {
                      //   setVideoUrl("");
                      //   setVidUploadMode("url");
                      // }}
                      onClick={() => setActiveTab("image")}
                      className={`flex items-center gap-1.5 px-4 py-3 rounded-md text-[10px] font-bold transition-all ${
                        activeTab === "image"
                          ? "bg-background text-primary shadow-sm"
                          : "text-muted-foreground"
                      }`}
                    >
                      <ImageIcon className="h-3 w-3" /> IMAGE
                    </button>
                    <button
                      type="button"
                      // onClick={() => {
                      //   if (!videoUrl) setVideoUrl(" ");
                      //   setVidUploadMode("url");
                      // }}
                      onClick={() => setActiveTab("video")}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[10px] font-bold transition-all ${
                        activeTab === "video"
                          ? "bg-background text-primary shadow-sm"
                          : "text-muted-foreground"
                      }`}
                    >
                      <VideoIcon className="h-3 w-3" /> VIDEO
                    </button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-5 space-y-5">
                {activeTab === "image" ? (
                  <div className="animate-in fade-in duration-300">
                    <div className="flex items-center justify-between mb-2">
                      <Label className="text-[10px] font-bold text-muted-foreground uppercase">
                        Cover Image *
                      </Label>
                      <div className="flex gap-1 scale-75">
                        <Button
                          type="button"
                          variant={
                            imgUploadMode === "file" ? "secondary" : "ghost"
                          }
                          size="sm"
                          onClick={() => setImgUploadMode("file")}
                        >
                          File
                        </Button>
                        <Button
                          type="button"
                          variant={
                            imgUploadMode === "url" ? "secondary" : "ghost"
                          }
                          size="sm"
                          onClick={() => setImgUploadMode("url")}
                        >
                          URL
                        </Button>
                      </div>
                    </div>
                    {featuredImage ? (
                      <div className="relative aspect-video rounded-lg overflow-hidden border">
                        <Image
                          src={featuredImage}
                          alt="Preview"
                          fill
                          className="object-cover"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2 h-7 w-7"
                          onClick={() => setFeaturedImage("")}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : imgUploadMode === "file" ? (
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer bg-slate-50 hover:bg-primary/5">
                        {isImgUploading ? (
                          <Loader2 className="animate-spin text-primary" />
                        ) : (
                          <Upload className="h-5 w-5 text-primary" />
                        )}
                        <span className="text-[10px] font-bold mt-2">
                          Upload Header
                        </span>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, "image")}
                        />
                      </label>
                    ) : (
                      <Input
                        placeholder="Paste image link..."
                        value={featuredImage}
                        onChange={(e) => setFeaturedImage(e.target.value)}
                        className="text-xs h-9"
                      />
                    )}
                  </div>
                ) : (
                  <div className="animate-in fade-in duration-300">
                    <div className="flex items-center justify-between mb-2">
                      <Label className="text-[10px] font-bold text-muted-foreground uppercase">
                        Featured Video
                      </Label>
                      <div className="flex gap-1 scale-75">
                        <Button
                          type="button"
                          variant={
                            vidUploadMode === "file" ? "secondary" : "ghost"
                          }
                          size="sm"
                          onClick={() => setVidUploadMode("file")}
                        >
                          File
                        </Button>
                        <Button
                          type="button"
                          variant={
                            vidUploadMode === "url" ? "secondary" : "ghost"
                          }
                          size="sm"
                          onClick={() => setVidUploadMode("url")}
                        >
                          URL
                        </Button>
                      </div>
                    </div>
                    {videoUrl && videoUrl.trim() !== "" && videoUrl !== " " ? (
                      <div className="relative aspect-video rounded-lg overflow-hidden border bg-black group">
                        {renderUniversalVideoPreview(videoUrl)}
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2 h-7 w-7 z-10 opacity-0 group-hover:opacity-100"
                          onClick={() => setVideoUrl(" ")}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : vidUploadMode === "file" ? (
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer bg-slate-50">
                        {isVidUploading ? (
                          <Loader2 className="animate-spin" />
                        ) : (
                          <VideoIcon className="h-5 w-5" />
                        )}
                        <input
                          type="file"
                          className="hidden"
                          accept="video/*"
                          onChange={(e) => handleFileUpload(e, "video")}
                        />
                      </label>
                    ) : (
                      <Input
                        placeholder="YouTube/FB link..."
                        value={videoUrl === " " ? "" : videoUrl}
                        onChange={(e) => setVideoUrl(e.target.value)}
                        className="text-xs h-9"
                      />
                    )}
                    <p className="text-[9px] text-muted-foreground leading-tight italic">
                      * Note: Featured image will still be used as the thumbnail
                      in lists.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* --- SETTINGS CARD (Category & Tags) --- */}
            <Card className="shadow-sm border-none md:border">
              <CardHeader className="pb-3 border-b bg-muted/20">
                <CardTitle className="text-xs font-bold uppercase tracking-widest">
                  Classification
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 space-y-4">
                <div className="space-y-2">
                  <Label className="text-xs font-bold">Category *</Label>
                  <Select onValueChange={setCategoryId} value={categoryId}>
                    <SelectTrigger className="h-10 border-primary/10 focus:ring-1">
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
                  <Label className="text-xs font-bold">Tags</Label>
                  <div className="relative">
                    <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
                    <Input
                      placeholder="politics, viral, cricket"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      className="pl-8 h-10"
                    />
                  </div>
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
