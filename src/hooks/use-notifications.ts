"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { getLatestNotifications } from "@/app/(admin-panel)/admin/manage-news/_actions/actions";

interface NotificationItem {
  id: string;
  title: string;
  slug: string;
  createdAt: Date | string;
}

export function useNotifications(intervalMs: number = 120000) {
  const [news, setNews] = useState<NotificationItem[]>([]);
  const [hasNew, setHasNew] = useState(false);

  const fetchUpdates = useCallback(async (isFirstLoad: boolean) => {
    try {
      const latest = await getLatestNotifications();
      const formattedLatest = latest as NotificationItem[];

      if (formattedLatest.length === 0) return;

      if (!isFirstLoad) {
        setNews((prev) => {
          // Nayi news check karne ka logic
          if (prev.length > 0 && formattedLatest[0].id !== prev[0].id) {
            toast.success("Breaking News!", {
              description: formattedLatest[0].title,
            });
            setHasNew(true);
          }
          return formattedLatest;
        });
      } else {
        setNews(formattedLatest);
      }
    } catch (error) {
      console.error("Notification Hook Error:", error);
    }
  }, []);

  useEffect(() => {
    let isIgnore = false; // Race condition handle karne ke liye standard

    const initFetch = async () => {
      if (!isIgnore) await fetchUpdates(true);
    };

    initFetch();

    const interval = setInterval(() => {
      if (!isIgnore) fetchUpdates(false);
    }, intervalMs);

    return () => {
      isIgnore = true;
      clearInterval(interval);
    };
  }, [fetchUpdates, intervalMs]);

  return { news, hasNew, setHasNew };
}