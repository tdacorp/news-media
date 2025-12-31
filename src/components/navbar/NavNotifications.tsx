"use client";

import { Bell } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useNotifications } from "@/hooks/use-notifications";

export default function NavNotifications() {
  const { news, hasNew, setHasNew } = useNotifications(120000);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative h-9 w-9 hover:text-primary-foreground"
          onClick={() => setHasNew(false)}
        >
          <Bell className="h-5 w-5" />
          {/* Notification Dot */}
          {hasNew && (
            <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-primary rounded-full border-2 border-background" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 mr-4" align="start">
        <div className="bg-background text-primary p-3 text-sm font-bold flex justify-between">
          <span>Notifications</span>
          <span className="text-[10px] opacity-70 uppercase tracking-tighter">
            Latest News
          </span>
        </div>
        <div className="max-h-[350px] overflow-y-auto">
          {news.length > 0 ? (
            news.map((item) => (
              <Link
                key={item.id}
                href={`/article/${item.slug}`}
                className="block p-4 border-b hover:bg-muted transition-colors"
              >
                <p className="text-sm font-medium leading-snug line-clamp-2">
                  {item.title}
                </p>
                <span className="text-[10px] text-muted-foreground mt-1 block">
                  {item.createdAt
                    ? new Date(item.createdAt).toLocaleTimeString("hi-IN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "Just now"}
                </span>
              </Link>
            ))
          ) : (
            <div className="p-8 text-center text-muted-foreground text-sm">
              No new notifications
            </div>
          )}
        </div>
        <Link
          href="/notifications"
          className="block p-3 text-center text-xs font-bold text-primary hover:underline border-t"
        >
          Read all notifications
        </Link>
      </PopoverContent>
    </Popover>
  );
}
