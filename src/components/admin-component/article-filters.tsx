"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Loader2 } from "lucide-react";
import { Card, CardContent } from "../ui/card";

interface CategoryItem {
  id: string;
  name: string;
  slug: string;
}

export function ArticleFilters({
  categoriesList,
}: {
  categoriesList: CategoryItem[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") || ""
  );

  const updateFilters = useCallback((key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  }, [router, searchParams]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchValue !== (searchParams.get("search") || "")) {
        updateFilters("search", searchValue);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchValue, searchParams, updateFilters]);

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          {/* Search Bar with Loader */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search articles..."
              className="pl-8 pr-10"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            {isPending && (
              <div className="absolute right-3 top-2.5">
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              </div>
            )}
          </div>

          <div className="flex gap-2 w-full md:w-auto">
            <Select
              defaultValue={searchParams.get("category") || "all"}
              onValueChange={(v) => updateFilters("category", v)}
            >
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categoriesList.map((cat) => (
                  <SelectItem key={cat.id} value={cat.slug}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              defaultValue={searchParams.get("status") || "all"}
              onValueChange={(v) => updateFilters("status", v)}
            >
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
