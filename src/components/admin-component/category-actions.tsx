"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2, Edit } from "lucide-react";
import { deleteCategory } from "@/app/(admin-panel)/admin/categories/_actions/actions";
import { EditCategoryDialog } from "./edit-category-dialog";
import { categories } from "@/lib/db/schema/categories";
import { toast } from "sonner";
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
} from "@/components/ui/alert-dialog";

type Category = typeof categories.$inferSelect;

export function CategoryActions({ category }: { category: Category }) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await deleteCategory(category.id);
      if (res?.success) {
        toast.success("Category deleted successfully!");
      } else {
        toast.error(res?.error || "Failed to delete");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex justify-end gap-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsEditDialogOpen(true)}
      >
        <Edit className="h-4 w-4 text-muted-foreground" />
      </Button>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="ghost" size="icon">
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              category{" "}
              <span className="font-bold text-foreground">
                "{category.name}"
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

      <EditCategoryDialog
        category={category}
        open={isEditDialogOpen}
        setOpen={setIsEditDialogOpen}
      />
    </div>
  );
}
