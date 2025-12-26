"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2, Edit } from "lucide-react";
import { deleteCategory } from "@/app/admin/categories/_actions/actions";
import { EditCategoryDialog } from "./edit-category-dialog";
import { toast } from "sonner";

export function CategoryActions({ category }: { category: any }) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this category?")) {
      const res = await deleteCategory(category.id);
      if (res?.success) {
        toast.success("Deleted!");
      } else {
        toast.error(res?.error || "Error");
      }
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
      <Button variant="ghost" size="icon" onClick={handleDelete}>
        <Trash2 className="h-4 w-4 text-destructive" />
      </Button>

      <EditCategoryDialog
        category={category}
        open={isEditDialogOpen}
        setOpen={setIsEditDialogOpen}
      />
    </div>
  );
}
