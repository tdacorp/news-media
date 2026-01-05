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
        <p>No Comments</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 mt-10">
      {/* <div className="flex items-center gap-2 mb-4">
        <h3 className="font-bold text-lg italic uppercase tracking-tighter">
          Comments
        </h3>
        <span className="font-bold text-lg italic uppercase tracking-tighter">
          {comments.length} Comments
        </span>
      </div> */}

      <div className="space-y-8">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4 group">
            <Avatar className="h-10 w-10 shrink-0 border border-border">
              <AvatarImage src={comment.userImage || ""} />
              <AvatarFallback className="bg-muted text-muted-foreground text-xs">
                {comment.userName.charAt(0)}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[14px] text-foreground">
                  {comment.userName}
                </span>
                <span className="text-[11px] text-muted-foreground">
                  {formatDistanceToNow(new Date(comment.createdAt), {
                    addSuffix: true,
                  })}
                </span>
              </div>

              {/* Chat Bubble Style */}
              <div className="relative">
                <p className="text-[15px] leading-relaxed text-foreground bg-muted/30 dark:bg-muted/10 px-4 py-2.5 rounded-2xl rounded-tl-none inline-block border border-border/50">
                  {comment.content}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {hasMore && (
        <Button
          variant="ghost"
          onClick={() => {
            const p = page + 1;
            setPage(p);
            loadComments(p);
          }}
          disabled={loading}
          className="w-full py-6 text-primary font-bold hover:bg-primary/5 border border-primary/10 rounded-xl"
        >
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            "Load Older Comments"
          )}
        </Button>
      )}
    </div>
  );
}
