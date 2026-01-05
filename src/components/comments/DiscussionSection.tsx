"use client";

import { useState } from "react";
import { CommentForm } from "./comment-form";
import CommentList from "./CommentList";
import { MessageSquare } from "lucide-react";

export function DiscussionSection({ articleId }: { articleId: string }) {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => setRefreshKey((prev) => prev + 1);

  return (
    <section className="w-full space-y-6 pt-6">
      <div className="flex items-center gap-6 mb-6">
        <h2 className="text-xl font-bold flex items-center gap-2 text-muted-foreground">
          <MessageSquare className="h-5 w-5 text-primary" />
          Comments
        </h2>
        <button className="text-sm font-semibold text-muted-foreground hover:text-primary flex items-center gap-2">
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 10H3M18 6H6M15 14H9M12 18H12" strokeLinecap="round" />
          </svg>
          SORT BY
        </button>
      </div>

      {/* Input Area */}
      <div className="bg-background rounded-lg">
        <CommentForm articleId={articleId} onCommentPosted={handleRefresh} />
      </div>

      {/* Divider line */}
      <div className="h-[1px] bg-muted-foreground w-full my-6" />

      {/* Comments List Area */}
      <div className="space-y-4">
        <CommentList key={refreshKey} articleId={articleId} />
      </div>
    </section>
  );
}
