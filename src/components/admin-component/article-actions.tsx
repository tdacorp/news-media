"use client";

import { useState } from "react";
import { deleteArticle } from "@/app/(admin-panel)/admin/manage-news/_actions/actions";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Pencil, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import Link from "next/link";

interface ArticleActionsProps {
  article: {
    id: string;
    title: string;
    slug: string;
    status: "draft" | "published" | "archived";
    createdAt: Date;
    categoryName: string | null;
    authorName: string | null;
  };
}

export function ArticleActions({ article }: ArticleActionsProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await deleteArticle(article.id);
      if (res?.success) {
        toast.success("Article deleted successfully!");
      } else {
        toast.error(res?.error || "Failed to delete");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex justify-end gap-2">
      <Button variant="ghost" size="icon" asChild title="Edit">
        <Link href={`/admin/manage-news/edit/${article.id}`}>
          <Pencil className="h-4 w-4" />
        </Link>
      </Button>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="ghost" size="icon" title="Delete">
            <Trash2 className="h-4 w-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. this will permanently delete the
              article{" "}
              <span className="font-bold text-foreground">
                &quot;{article.title}&quot;
              </span>
              .
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
