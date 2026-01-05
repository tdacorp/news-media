"use client";

import type React from "react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, LogIn, Send } from "lucide-react";
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

  const isAuthenticated = status === "authenticated";
  const isLoadingSession = status === "loading";

  // const validateForm = () => {
  //   const newErrors: Record<string, string> = {}

  //   if (!formData.name.trim()) {
  //     newErrors.name = "Name is required"
  //   }

  //   if (!formData.email.trim()) {
  //     newErrors.email = "Email is required"
  //   } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
  //     newErrors.email = "Please enter a valid email"
  //   }

  //   if (!formData.content.trim()) {
  //     newErrors.content = "Comment cannot be empty"
  //   } else if (formData.content.trim().length < 10) {
  //     newErrors.content = "Comment must be at least 10 characters"
  //   }

  //   setErrors(newErrors)
  //   return Object.keys(newErrors).length === 0
  // }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    if (!isAuthenticated || !session?.user) {
      toast.error("Please login to comment");
      return;
    }

    setIsPending(true);
    try {
      const res = await addComment({
        articleId,
        userId: session.user.id as string, 
        userName: session.user.name || "User",
        userImage: session.user.image || undefined,
        content: content.trim(),
      });

      if (res.success) {
        setContent("");
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

  if (isLoadingSession) {
    return <div className="h-20 w-full animate-pulse bg-muted rounded-xl" />;
  }

  if (!isAuthenticated) {
    return (
      <div className="bg-muted/30 border-2 border-dashed rounded-xl p-8 text-center space-y-4">
        <p className="text-muted-foreground font-medium">
          Aapka kya rai hai? Comment karne ke liye login karein.
        </p>
        <Button
          onClick={() => signIn()}
          variant="outline"
          className="font-bold border-primary text-primary hover:bg-primary hover:text-white"
        >
          <LogIn className="h-4 w-4 mr-2" /> Login / Sign Up
        </Button>
      </div>
    );
  }

  return (
    <>
      {/* <Card className="p-4 sm:p-6 border border-border bg-background">
      <form onSubmit={handleSubmit} className="space-y-5">
        Header
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-foreground">
            Share Your Thoughts
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Be respectful and constructive while commenting.
          </p>
        </div>

        Success Message
        {submitted && (
          <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
            <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
            <p className="text-sm text-green-800 dark:text-green-200">
              Comment submitted successfully!
            </p>
          </div>
        )}

        Name
        <div className="space-y-2">
          <Label htmlFor="name">Your Name</Label>
          <Input
            id="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            disabled={isLoading}
          />
          {errors.name && (
            <p className="flex items-center gap-2 text-xs text-destructive">
              <AlertCircle className="h-3 w-3" />
              {errors.name}
            </p>
          )}
        </div>

        Email
        <div className="space-y-2">
          <Label htmlFor="email">Your Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            disabled={isLoading}
          />
          {errors.email && (
            <p className="flex items-center gap-2 text-xs text-destructive">
              <AlertCircle className="h-3 w-3" />
              {errors.email}
            </p>
          )}
        </div>

        Comment
        <div className="space-y-2">
          <Label htmlFor="content">Your Comment</Label>
          <Textarea
            id="content"
            rows={5}
            placeholder="Write your comment..."
            value={formData.content}
            onChange={(e) =>
              handleChange("content", e.target.value.slice(0, maxChars))
            }
            disabled={isLoading}
            className="resize-none"
          />

          <div className="flex justify-between text-xs text-muted-foreground">
            {errors.content ? (
              <span className="flex items-center gap-2 text-destructive">
                <AlertCircle className="h-3 w-3" />
                {errors.content}
              </span>
            ) : (
              <span />
            )}
            <span>
              {charCount} / {maxChars}
            </span>
          </div>
        </div>

        Buttons
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto"
          >
            Post Comment
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setFormData({ name: "", email: "", content: "" })
              setErrors({})
            }}
            className="w-full sm:w-auto"
          >
            Clear
          </Button>
        </div>

        Footer note
        <p className="text-xs text-muted-foreground">
          Your email will not be displayed publicly.
        </p>
      </form>
    </Card> */}
      {/* <form onSubmit={handleSubmit} className="space-y-4 bg-card p-5 rounded-xl border shadow-sm">
      <div className="flex gap-4">
        <Avatar className="h-10 w-10 ring-2 ring-primary/10">
          <AvatarImage src={session?.user?.image || ""} />
          <AvatarFallback className="bg-primary text-white">
            {session?.user?.name?.charAt(0) || "U"}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-foreground">{session?.user?.name}</span>
            <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">You</span>
          </div>
          
          <Textarea
            placeholder="Apne vichar likhein..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[100px] resize-none focus-visible:ring-primary bg-muted/20 border-none shadow-none text-base"
          />
          
          <div className="flex justify-end">
            <Button 
              type="submit" 
              disabled={isPending || !content.trim()}
              className="px-8 py-5 rounded-full font-bold shadow-lg shadow-primary/20"
            >
              {isPending ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Send className="h-4 w-4 mr-2" />
              )}
              Post Comment
            </Button>
          </div>
        </div>
      </div>
    </form> */}

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm"
      >
        <div className="flex gap-4">
          <div className="relative">
            <Avatar className="h-10 w-10">
              <AvatarImage src={session?.user?.image || ""} />
              <AvatarFallback className="bg-primary text-white text-xs">
                {session?.user?.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <span className="absolute -top-1 -right-1 bg-red-500 text-[8px] text-white px-1.5 py-0.5 rounded-full font-bold uppercase ring-2 ring-white">
              You
            </span>
          </div>

          <div className="flex-1 space-y-4">
            <Textarea
              placeholder="Apne vichar likhein..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[100px] resize-none border-none bg-gray-50/50 focus-visible:ring-0 focus-visible:bg-gray-50 transition-all text-base p-0 shadow-none placeholder:text-gray-400"
            />

            <div className="flex justify-end pt-2 border-t border-gray-50">
              <Button
                type="submit"
                disabled={isPending || !content.trim()}
                className="rounded-full px-8 py-6 bg-[#E98282] hover:bg-[#d67171] text-white font-bold shadow-md transition-transform active:scale-95"
              >
                {isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Send className="h-4 w-4 mr-2 text-white/80" />
                )}
                Post Comment
              </Button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
