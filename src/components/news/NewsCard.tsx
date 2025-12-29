import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { type PublicArticle } from "@/app/(admin-panel)/admin/manage-news/_actions/actions";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Clock, Facebook, Share2, Twitter } from "lucide-react";
import { Button } from "../ui/button";


interface NewsCardProps {
  article: PublicArticle;
  variant: "large" | "small";
}

export function NewsCard({ article, variant }: NewsCardProps) {
  const isLarge = variant === "large";
  const isSmall = variant === "small";

  return (
    <>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <Link href={`/article/${article.slug}`}>
          <div
            className={`relative ${
              isLarge ? "h-[400px]" : isSmall ? "h-[180px]" : "h-[240px]"
            } overflow-hidden`}
          >
            <Image
              src={article.featuredImage || "/placeholder.svg"}
              alt={article.title}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
            <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
              {article.categoryName}
            </Badge>
          </div>
        </Link>
        <CardContent className="p-4">
          <Link href={`/article/${article.slug}`}>
            <h3
              className={`font-bold text-foreground hover:text-primary transition-colors line-clamp-2 ${
                isLarge
                  ? "text-2xl mb-3"
                  : isSmall
                  ? "text-base mb-2"
                  : "text-lg mb-2"
              }`}
            >
              {article.title}
            </h3>
          </Link>
          <p
            className={`text-muted-foreground line-clamp-2 ${
              isSmall ? "text-sm" : "text-sm"
            }`}
          >
            {article.excerpt}
          </p>
        </CardContent>
        <CardFooter className="px-4 pb-4 pt-0 flex items-center justify-between">
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-3.5 w-3.5 mr-1" />
            <span>
              {formatDistanceToNow(new Date(article.createdAt), {
                addSuffix: true,
              })}
            </span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Share2 className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Facebook className="h-4 w-4 mr-2" />
                Share on Facebook
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Twitter className="h-4 w-4 mr-2" />
                Share on Twitter
              </DropdownMenuItem>
              <DropdownMenuItem>
                <svg
                  className="h-4 w-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Share on WhatsApp
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardFooter>
      </Card>

      {/* <Link href={`/news/${article.slug}`} className="group block h-full">
        <div
          className={`flex flex-col gap-3 ${
            isLarge ? "md:grid md:grid-cols-2" : ""
          }`}
        >
          <div className="relative aspect-video overflow-hidden rounded-xl bg-muted">
            <Image
              src={article.featuredImage || "/placeholder.jpg"}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              priority={isLarge}
            />
          </div>
          <div className="space-y-2 flex flex-col justify-center">
            {article.categoryName && (
              <span className="text-[10px] font-bold text-primary uppercase tracking-widest">
                {article.categoryName}
              </span>
            )}
            <h3
              className={`${
                isLarge ? "text-2xl md:text-3xl" : "text-base"
              } font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2`}
            >
              {article.title}
            </h3>
            {isLarge && article.excerpt && (
              <p className="text-muted-foreground line-clamp-3 text-sm">
                {article.excerpt}
              </p>
            )}
            <p className="text-[10px] font-medium text-muted-foreground">
              {formatDistanceToNow(new Date(article.createdAt), {
                addSuffix: true,
              })}
            </p>
          </div>
        </div>
      </Link> */}
    </>
  );
}
