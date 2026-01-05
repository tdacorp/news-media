"use client";

import { useState } from "react";
import { ThumbsUp, Share2, MoreVertical, MessageSquareText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DiscussionSection } from "@/components/comments/DiscussionSection";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { format } from "date-fns";

interface CommentToggleProps {
  article: {
    id: string;
    authorId?: string | null;
    createdAt: Date | string;
    updatedAt?: Date | string | null;
    location?: string;
    title?: string;
  };
}

export function AuthorMetaCard({ article }: CommentToggleProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full flex flex-col">
      <div className="py-4 border-y border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12 border border-border">
            <AvatarImage src="/logo.jpeg" />
            <AvatarFallback>TA</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-bold text-foreground text-lg leading-tight">
              News Media Desk
              {/* {article.authorId || "News Media Desk"} */}
            </span>
            <span className="text-xs text-muted-foreground font-medium">
              {/* {article.location || "नई दिल्ली"},{" "} */}
              {format(new Date(article.createdAt), "dd MMMM yyyy")}
              {article.updatedAt && (
                <span className="ml-1">
                  | updated:{" "}
                  {format(new Date(article.updatedAt), "dd MMMM yyyy, h:mm a")}{" "}
                  IST
                </span>
              )}
            </span>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex items-center justify-end gap-1 border-y border-border py-1 my-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-secondary h-9 w-9"
          >
            <ThumbsUp className="h-5 w-5" />
          </Button>

          {/* Comment Toggle Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "h-9 w-9 transition-colors",
              isOpen
                ? "text-secondary bg-primary"
                : "text-muted-foreground hover:text-secondary"
            )}
          >
            <MessageSquareText className="h-5 w-5" />
          </Button>

          {/* WhatsApp Icon (Static for now) */}
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-secondary h-9 w-9"
          >
            <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </Button>

          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Share2 className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Collapsible Section */}
      {isOpen && (
        <div className="w-full animate-in slide-in-from-top-2 duration-300 ease-out border-b border-gray-100">
          <div className="py-6 px-1">
            {/* Main Comment Component */}
            <DiscussionSection articleId={article.id} />
          </div>
        </div>
      )}
    </div>
  );
}
