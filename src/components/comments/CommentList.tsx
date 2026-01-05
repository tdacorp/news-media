"use client";

import { useState, useEffect, useCallback } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getCommentsByArticle } from "@/lib/actions/comments/comments";
import { formatDistanceToNow } from "date-fns";
import { Loader2, MessageSquare } from "lucide-react";

interface Comment {
  id: string;
  userName: string;
  userImage: string | null;
  content: string;
  createdAt: Date;
}

export default function CommentList({ articleId }: { articleId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadComments = useCallback(
    async (currentPage: number) => {
      setLoading(true);
      try {
        // Humne server action call kiya
        const newComments = await getCommentsByArticle(
          articleId,
          currentPage,
          5
        );

        if (newComments.length < 5) {
          setHasMore(false);
        }

        if (currentPage === 1) {
          setComments(newComments as Comment[]);
        } else {
          setComments((prev) => [...prev, ...(newComments as Comment[])]);
        }
      } catch (error) {
        console.error("Error loading comments:", error);
      } finally {
        setLoading(false);
      }
    },
    [articleId]
  );

  // Initial load
  useEffect(() => {
    loadComments(1);
  }, [loadComments]);

  if (comments.length === 0 && !loading) {
    return (
      <div className="text-center py-10 text-muted-foreground border rounded-xl bg-muted/5">
        <MessageSquare className="h-10 w-10 mx-auto mb-3 opacity-20" />
        <p>Abhi tak koi discussion nahi hua. Pehla comment aap karein!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 mt-10">
      <div className="flex items-center gap-2 mb-4">
        <h3 className="font-bold text-lg italic uppercase tracking-tighter">
          Comments
        </h3>
        <span className="bg-primary text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
          {comments.length}+
        </span>
      </div>
      {/* <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4 group">
            <Avatar className="h-10 w-10 border-2 border-background shadow-sm">
              <AvatarImage src={comment.userImage || ""} />
              <AvatarFallback className="bg-muted text-xs">
                {comment.userName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-foreground">
                  {comment.userName}
                </span>
                <span className="text-[10px] text-muted-foreground">
                  {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground bg-muted/30 p-3 rounded-2xl rounded-tl-none inline-block max-w-full">
                {comment.content}
              </p>
            </div>
          </div>
        ))}
      </div> */}
      <div className="space-y-8">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4 group items-start">
            <Avatar className="h-10 w-10 border-2 border-white shadow-sm shrink-0">
              <AvatarImage src={comment.userImage || ""} />
              <AvatarFallback className="bg-gray-100 text-gray-400 text-xs">
                {comment.userName.charAt(0)}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-3">
                <span className="font-bold text-[15px] text-gray-900">
                  {comment.userName}
                </span>
                <span className="text-[11px] text-gray-400 font-medium">
                  {formatDistanceToNow(new Date(comment.createdAt), {
                    addSuffix: true,
                  })}
                </span>
              </div>

              {/* Chat Bubble Style */}
              <div className="relative">
                <p className="text-[15px] leading-relaxed text-gray-700 bg-[#F3F4F6] px-5 py-3 rounded-[24px] rounded-tl-none inline-block max-w-[90%] md:max-w-[80%]">
                  {comment.content}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {hasMore && (
        <div className="flex justify-center pt-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              const nextPage = page + 1;
              setPage(nextPage);
              loadComments(nextPage);
            }}
            disabled={loading}
            className="text-primary font-bold hover:bg-primary/5"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              "Load Older Comments"
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
