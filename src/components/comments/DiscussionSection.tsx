"use client";

import { useState } from "react";
import { CommentForm } from "./comment-form";
import CommentList from "./CommentList";

export function DiscussionSection({ articleId }: { articleId: string }) {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => setRefreshKey((prev) => prev + 1);

  return (
    // <section className="max-w-3xl mx-auto space-y-10 pb-20">
    //   <div className="flex items-center gap-3">
    //     <div className="h-8 w-2 bg-primary rounded-full" />
    //     <h2 className="text-3xl font-black uppercase tracking-tighter italic">
    //       Join the Conversation
    //     </h2>
    //   </div>

    //   <CommentForm
    //     articleId={articleId}
    //     onCommentPosted={handleRefresh}
    //   />

    //   <CommentList key={refreshKey} articleId={articleId} />
    // </section>
    // return section ko update karein
    <section className="max-w-3xl mx-auto space-y-12 pb-20">
      <div className="flex items-center gap-4">
        <div className="h-10 w-1.5 bg-red-500 rounded-full" />
        <h2 className="text-4xl font-[900] uppercase tracking-tighter italic text-gray-900">
          Join the Conversation
        </h2>
      </div>

      <CommentForm articleId={articleId} onCommentPosted={handleRefresh} />

      <div className="pt-4">
        <CommentList key={refreshKey} articleId={articleId} />
      </div>
    </section>
  );
}
