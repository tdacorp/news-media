"use client"

import { Bell, Search } from "lucide-react";
import { Input } from "../ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

export function AdminHeader() {
  const pathname = usePathname();
    const searchParams = useSearchParams();
    const { replace } = useRouter();
  
    // Dynamic Placeholder
    const getPlaceholder = () => {
      if (pathname.includes("/admin/user")) return "Search users by name...";
      if (pathname.includes("/admin/article")) return "Search articles by title...";
      return "Search everywhere...";
    };
  
    const handleSearch = useDebouncedCallback((term: string) => {
      const params = new URLSearchParams(searchParams);
      if (term) {
        params.set("query", term);
      } else {
        params.delete("query");
      }
      replace(`${pathname}?${params.toString()}`);
    }, 300);
    
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6">
      <div className="flex flex-1 items-center justify-between">
        <div className="flex items-center flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder={getPlaceholder()}
              className="w-full pl-8 h-9"
              onChange={(e) => handleSearch(e.target.value)}
              defaultValue={searchParams.get("query")?.toString()}
            />
          </div>
        </div>

        {/* Notifications is now static later is static */}
        <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative h-9 w-9 cursor-pointer"
              >
                <Bell className="h-4 w-4 " />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px]">
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 cursor-pointer ">
              <div className="p-2">
                <p className="font-bold mb-2 hover:text-primary">
                  Notifications
                </p>
                <div className="space-y-2">
                  <div className="p-2 hover:bg-secondary rounded text-sm">
                    <p className="font-medium">New comment on article</p>
                    <p className="text-xs text-muted-foreground">
                      2 minutes ago
                    </p>
                  </div>
                  <div className="p-2 hover:bg-secondary rounded text-sm">
                    <p className="font-medium">Article pending approval</p>
                    <p className="text-xs text-muted-foreground">1 hour ago</p>
                  </div>
                  <div className="p-2 hover:bg-secondary rounded text-sm">
                    <p className="font-medium">New user registered</p>
                    <p className="text-xs text-muted-foreground">3 hours ago</p>
                  </div>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
