"use client";

import type React from "react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, LogIn } from "lucide-react";
import { useSession, signIn } from "next-auth/react";
import { toast } from "sonner";
import { addComment } from "@/lib/actions/comments/comments";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface CommentFormProps {
  articleId: string;
  onCommentPosted?: () => void;
}

export function CommentForm({ articleId, onCommentPosted }: CommentFormProps) {
  const { data: session, status } = useSession();
  const [content, setContent] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  if (status === "loading")
    return <div className="h-24 w-full animate-pulse bg-muted rounded-xl" />;

  if (status === "unauthenticated") {
    return (
      <div className="bg-muted/30 border border-border rounded-xl p-6 text-center">
        <p className="text-muted-foreground mb-4">Please login to comment.</p>
        <Button
          onClick={() => signIn()}
          variant="outline"
          className="font-bold border-primary text-primary hover:bg-primary hover:text-white transition-all"
        >
          <LogIn className="h-4 w-4 mr-2" /> Login / Sign Up
        </Button>
      </div>
    );
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || isPending) return;

    setIsPending(true);
    try {
      const res = await addComment({
        articleId,
        userId: session?.user?.id as string,
        userName: session?.user?.name || "User",
        userImage: session?.user?.image || undefined,
        content: content.trim(),
      });

      if (res.success) {
        setContent("");
        setIsFocused(false);
        toast.success("Comment posted!");
        if (onCommentPosted) onCommentPosted();
      } else {
        toast.error(res.error || "Failed to post comment");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="group relative flex gap-4 bg-card p-4 rounded-xl border border-border transition-all duration-300 focus-within:shadow-md"
      >
        <Avatar className="h-10 w-10 shrink-0 border border-border">
          <AvatarImage src={session?.user?.image || ""} />
          <AvatarFallback className="bg-primary/10 text-primary font-bold">
            {session?.user?.name?.charAt(0)}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 space-y-3">
          <Textarea
            placeholder="Add a comment..."
            value={content}
            onFocus={() => setIsFocused(true)}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[40px] max-h-[200px] w-full resize-none border-none bg-transparent p-0 text-foreground focus-visible:ring-0 shadow-none text-base placeholder:text-muted-foreground/60"
          />

          {/* Expandable Footer */}
          {(isFocused || content.length > 0) && (
            <div className="flex justify-end gap-3 pt-2 border-t border-border animate-in fade-in slide-in-from-top-1">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  setContent("");
                  setIsFocused(false);
                }}
                className="text-muted-foreground hover:text-foreground"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isPending || !content.trim()}
                size="sm"
                className="bg-primary text-primary-foreground font-bold rounded-full px-6 transition-transform active:scale-95"
              >
                {isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Post Comment"
                )}
              </Button>
            </div>
          )}
        </div>
      </form>
    </>
  );
}
