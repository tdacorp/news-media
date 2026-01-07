"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Trash2,
  Search,
  Loader2,
  MessageSquareReply,
  EyeOff,
  Eye,
} from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import {
  deleteComment,
  toggleCommentVisibility,
} from "@/lib/actions/comments/comments";
import { toast } from "sonner";
import { format, formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface AdminComment {
  id: string;
  content: string;
  userName: string;
  createdAt: Date;
  articleTitle: string | null;
  isVisible?: boolean;
}

interface ActionButtonsProps {
  comment: AdminComment;
  isDeleting: boolean;
  onDeleteClick: () => void;
  onVisibleClick: () => void;
}

export function AdminCommentsTable({
  initialData,
}: {
  initialData: AdminComment[];
}) {
  const [comments, setComments] = useState<AdminComment[]>(initialData);
  const [selectedComments, setSelectedComments] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Dialog states
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteMode, setDeleteMode] = useState<"single" | "bulk">("single");
  const [commentToDelete, setCommentToDelete] = useState<string | null>(null);

  // Search filter logic
  const filteredComments = comments.filter((comment) => {
    return (
      comment.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.articleTitle?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const hasHiddenSelected = selectedComments.some((id) => {
    const comment = comments.find((c) => c.id === id);
    return comment?.isVisible === false;
  });

  // Master Delete Handler (Handles both Single and Bulk)
  const executeDelete = async () => {
    setIsProcessing(true);
    try {
      if (deleteMode === "single" && commentToDelete) {
        const res = await deleteComment(commentToDelete);
        if (res.success) {
          setComments((prev) => prev.filter((c) => c.id !== commentToDelete));
          setSelectedComments((prev) =>
            prev.filter((s) => s !== commentToDelete)
          );
          toast.success("Comment deleted successfully");
        }
      } else if (deleteMode === "bulk") {
        const promise = Promise.all(
          selectedComments.map((id) => deleteComment(id))
        );

        await promise; // Waiting for all deletions
        setComments((prev) =>
          prev.filter((c) => !selectedComments.includes(c.id))
        );
        setSelectedComments([]);
        toast.success(`${selectedComments.length} comments removed`);
      }
    } catch {
      toast.error("Operation failed. Please try again.");
    } finally {
      setIsProcessing(false);
      setDeleteDialogOpen(false);
      setCommentToDelete(null);
    }
  };

  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedComments(filteredComments.map((c) => c.id));
    } else {
      setSelectedComments([]);
    }
  };

  const toggleSelect = (id: string, checked: boolean) => {
    setSelectedComments((prev) =>
      checked ? [...prev, id] : prev.filter((s) => s !== id)
    );
  };

  const handleToggleVisible = async (id: string, currentVisible: boolean) => {
    const res = await toggleCommentVisibility(id, currentVisible);
    if (res.success) {
      setComments((prev) =>
        prev.map((c) =>
          c.id === id ? { ...c, isVisible: !currentVisible } : c
        )
      );
      toast.success(currentVisible ? "Comment hidden" : "Comment published");
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <Card>
        <CardHeader className="pt-6 border-b border-border/50 py-4">
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by author, content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background"
              />
            </div>

            {selectedComments.length > 0 && (
              <div className="flex items-center gap-2">
                {hasHiddenSelected && (
                  <p className="text-[10px] text-destructive font-bold uppercase italic animate-pulse">
                    Publish hidden to delete bulk
                  </p>
                )}
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    setDeleteMode("bulk");
                    setDeleteDialogOpen(true);
                  }}
                  className="cursor-pointer font-bold"
                  disabled={hasHiddenSelected}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete ({selectedComments.length})
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="hidden md:block">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="w-12 pl-4">
                    <Checkbox
                      checked={
                        selectedComments.length === filteredComments.length &&
                        filteredComments.length > 0
                      }
                      onCheckedChange={(checked) => toggleSelectAll(!!checked)}
                      className="border-border cursor-pointer"
                    />
                  </TableHead>
                  <TableHead className="font-bold">Author & Date</TableHead>
                  <TableHead className="font-bold">Comment Content</TableHead>
                  <TableHead className="font-bold">Article Reference</TableHead>
                  <TableHead className="text-right pr-4 font-bold">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredComments.map((comment) => (
                  <TableRow
                    key={comment.id}
                    className={cn(
                      "group transition-colors",
                      comment.isVisible === false
                        ? "opacity-50 grayscale bg-muted/20"
                        : "hover:bg-muted/40"
                    )}
                  >
                    <TableCell className="pl-4">
                      <Checkbox
                        checked={selectedComments.includes(comment.id)}
                        onCheckedChange={(checked) =>
                          toggleSelect(comment.id, !!checked)
                        }
                        className="border-border cursor-pointer"
                      />
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      <div className="font-bold text-sm">
                        {comment.userName}
                      </div>
                      <div className="text-[10px] text-muted-foreground uppercase">
                        {format(new Date(comment.createdAt), "dd MMM yyyy • p")}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-xs truncate text-sm">
                      {comment.content}
                    </TableCell>
                    <TableCell className="text-xs font-medium">
                      {comment.articleTitle}
                    </TableCell>
                    <TableCell className="text-right pr-4">
                      <div className="flex justify-end gap-1">
                        <ActionButtons
                          comment={comment}
                          isDeleting={
                            isProcessing && commentToDelete === comment.id
                          }
                          onDeleteClick={() => {
                            setDeleteMode("single");
                            setCommentToDelete(comment.id);
                            setDeleteDialogOpen(true);
                          }}
                          onVisibleClick={() =>
                            handleToggleVisible(
                              comment.id,
                              comment.isVisible !== false
                            )
                          }
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile List View */}
          <div className="grid grid-cols-1 divide-y divide-border md:hidden">
            {filteredComments.map((comment) => (
              <div
                key={comment.id}
                className={cn(
                  "p-4 space-y-3 transition-colors",
                  comment.isVisible === false && "bg-muted/30 opacity-70"
                )}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      className="border-slate-500 mt-1 cursor-pointer"
                      checked={selectedComments.includes(comment.id)}
                      onCheckedChange={(checked) => {
                        if (checked)
                          setSelectedComments((prev) => [...prev, comment.id]);
                        else
                          setSelectedComments((prev) =>
                            prev.filter((id) => id !== comment.id)
                          );
                      }}
                    />
                    <div>
                      <p className="font-bold text-sm leading-none">
                        {comment.userName}
                      </p>
                      <p className="text-[10px] text-muted-foreground mt-1 font-medium italic">
                        {formatDistanceToNow(new Date(comment.createdAt), {
                          addSuffix: true,
                        })}
                      </p>
                    </div>
                  </div>
                  <ActionButtons
                    comment={comment}
                    isDeleting={isProcessing && commentToDelete === comment.id}
                    onDeleteClick={() => {
                      setDeleteMode("single");
                      setCommentToDelete(comment.id);
                      setDeleteDialogOpen(true);
                    }}
                    onVisibleClick={() =>
                      handleToggleVisible(
                        comment.id,
                        comment.isVisible !== false
                      )
                    }
                  />
                </div>
                <p className="text-sm text-foreground/90 bg-muted/20 p-2 rounded-lg border border-border/50">
                  {comment.content}
                </p>
                <p className="text-[10px] font-bold uppercase tracking-tighter">
                  Ref: {comment.articleTitle}
                </p>
              </div>
            ))}
          </div>

          {filteredComments.length === 0 && (
            <div className="py-20 text-center text-muted-foreground">
              No results found.
            </div>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-card rounded-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-black text-2xl tracking-tighter">
              {deleteMode === "bulk"
                ? "Confirm Bulk Deletion"
                : "Delete Comment?"}
            </AlertDialogTitle>
            <AlertDialogDescription className="font-bold text-foreground/70">
              {deleteMode === "bulk"
                ? `Are you sure you want to delete ${selectedComments.length} comments? This action is permanent.`
                : "This comment will be permanently removed from the database. Are you sure?"}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-4 gap-2">
            <AlertDialogCancel className="font-bold cursor-pointer">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                executeDelete();
              }}
              disabled={isProcessing}
            >
              {isProcessing && (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              )}
              Confirm Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

// Sub-component for buttons
function ActionButtons({
  comment,
  isDeleting,
  onDeleteClick,
  onVisibleClick,
}: ActionButtonsProps) {
  const isHidden = comment.isVisible === false;

  return (
    <div className="flex items-center gap-1">
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 cursor-pointer"
        title={isHidden ? "Publish to reply" : "Reply"}
        // disabled={isHidden}
        // onClick={() => toast.info(`Reply to ${comment.userName}`)}
        disabled
      >
        <MessageSquareReply className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 cursor-pointer"
        onClick={onVisibleClick}
        title={isHidden ? "Publish" : "Hide"}
      >
        {isHidden ? (
          <Eye className="h-4 w-4" />
        ) : (
          <EyeOff className="h-4 w-4" />
        )}
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 cursor-pointer"
        disabled={isDeleting || isHidden}
        onClick={onDeleteClick}
        title={isHidden ? "Publish to delete" : "Delete"}
      >
        {isDeleting ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Trash2 className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}
