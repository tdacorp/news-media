import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { type PublicArticle } from "@/app/(admin-panel)/admin/manage-news/_actions/actions";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";

interface NewsCardProps {
  article: PublicArticle;
  variant: "hero" | "grid" | "list" | "compact";
}

export function NewsCard({ article, variant }: NewsCardProps) {
  const isHero = variant === "hero";
  const isGrid = variant === "grid";
  const isList = variant === "list";
  const isCompact = variant === "compact";

  return (
    <>
      <Card
        className={`group overflow-hidden border-none shadow-none bg-transparent transition-all`}
      >
        <Link
          href={`/article/${article.slug}`}
          className={`
        flex flex-col gap-2 
        ${isList ? "flex-row items-start gap-4" : ""} 
      `}
        >
          {/* IMAGE SECTION */}
          <div
            className={`relative overflow-hidden rounded-lg bg-muted shadow-sm
          ${isHero ? "w-full aspect-[16/8]" : "aspect-video"}
          ${isList ? "w-40 min-w-[160px]" : "w-full"}
          ${isCompact ? "h-16 w-16 min-w-[64px] rounded-md" : ""}
        `}
          >
            <Image
              src={article.featuredImage || "/placeholder.jpg"}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority={isHero}
            />

            {/* Overlay for Hero Variant */}
            {isHero && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6">
                <Badge className="w-fit mb-3 bg-red-600 hover:bg-red-700 border-none font-bold uppercase text-[10px]">
                  {article.categoryName}
                </Badge>
                <h2 className="text-white text-3xl md:text-5xl font-black leading-[1.1] tracking-tighter drop-shadow-md">
                  {article.title}
                </h2>
              </div>
            )}
          </div>

          {/* CONTENT SECTION (Non-Hero) */}
          {!isHero && (
            <div className="flex flex-col space-y-1">
              <h3
                className={`font-black text-foreground group-hover:text-red-600 transition-colors tracking-tight leading-[1.2]
              ${isGrid ? "text-lg line-clamp-3" : ""}
              ${isList ? "text-xl line-clamp-2" : ""}
              ${isCompact ? "text-[13px] font-bold line-clamp-2" : ""}
            `}
              >
                {article.title}
              </h3>

              {isList && article.excerpt && (
                <p className="text-muted-foreground line-clamp-2 text-xs font-medium leading-snug">
                  {article.excerpt}
                </p>
              )}

              <div className="flex items-center gap-2 text-[9px] font-bold text-muted-foreground/70 uppercase pt-1">
                <span className="text-red-600">●</span>
                <time
                  dateTime={new Date(article.createdAt).toISOString()}
                  suppressHydrationWarning
                >
                  {formatDistanceToNow(new Date(article.createdAt), {
                    addSuffix: true,
                  })}
                </time>
              </div>
            </div>
          )}
        </Link>
      </Card>
    </>
  );
}
