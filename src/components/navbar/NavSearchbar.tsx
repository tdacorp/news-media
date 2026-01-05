"use client";

import { useEffect, useState } from "react";
import { Loader2, Search } from "lucide-react";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  Command,
} from "@/components/ui/command";
import { searchPublicArticles } from "@/app/(admin-panel)/admin/manage-news/_actions/actions";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

interface SearchResult {
  id: string;
  title: string;
  slug: string;
  createdAt: Date | string | null;
  categoryName: string | null;
}

export default function NavbarSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Keyboard shortcut (Ctrl+K or Cmd+K) setup
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // Search logic
  useEffect(() => {
    const fetchResults = async () => {
      if (query.trim().length < 2) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const data = await searchPublicArticles(query);
        if (Array.isArray(data)) {
          setResults(data);
        }
      } finally {
        setIsLoading(false); 
      }
    };

    const timer = setTimeout(fetchResults, 300); // Debouncing
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen(true)}
        className="h-9 w-9 text-muted-foreground hover:text-primary-foreground transition-colors"
      >
        <Search className="h-5 w-5" />
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command shouldFilter={false} className="border-none bg-transparent">
          <div className="relative flex items-center border-b px-3">
            <CommandInput
              placeholder="Search breaking news..."
              onValueChange={setQuery}
              className="flex-1 border-none focus:ring-0 h-12"
            />
            {isLoading && (
              <Loader2 className="absolute right-10 h-4 w-4 animate-spin text-primary" />
            )}
          </div>
          <CommandList className="max-h-[400px] overflow-y-auto p-2">
            {/* Initial Empty State */}
            {!isLoading && query.length < 2 && (
              <div className="py-12 text-center">
                <Search className="mx-auto h-8 w-8 text-muted-foreground/30 mb-3" />
                <p className="text-sm text-muted-foreground">
                  Type at least 2 characters to search...
                </p>
              </div>
            )}

            {!isLoading && query.length >= 2 && results.length === 0 && (
              <CommandEmpty className="py-6 text-center text-sm text-muted-foreground">
                No news items found.
              </CommandEmpty>
            )}

            {results.length > 0 && (
              <CommandGroup heading="Recent Results" className="px-2">
                {results.map((article) => (
                  <CommandItem
                    key={article.id}
                    value={article.id}
                    onSelect={() => {
                      router.push(`/article/${article.slug}`);
                      setOpen(false);
                    }}
                    className="flex flex-col items-start gap-1 p-3 mb-1 rounded-md cursor-pointer transition-all aria-selected:bg-background hover:bg-background"
                  >
                    <span className="font-bold text-sm leading-tight line-clamp-2">
                      {article.title}
                    </span>
                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                      <span className="text-primary">
                        {article.categoryName}
                      </span>
                      <span>•</span>
                      <span>
                        {article.createdAt
                          ? new Date(article.createdAt).toLocaleDateString(
                              "hi-IN",
                              {
                                day: "numeric",
                                month: "short",
                              }
                            )
                          : "Recently"}
                      </span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>

          <div className="p-2 border-t bg-background text-[10px] text-center text-muted-foreground">
            Press <kbd className="font-sans">Enter</kbd> to read or{" "}
            <kbd className="font-sans">ESC</kbd> to close
          </div>
        </Command>
      </CommandDialog>
    </>
  );
}
