import Link from "next/link";
import { TrendingUp, Clock, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatDistanceToNowStrict } from "date-fns";
import { type PublicArticle } from "@/app/(admin-panel)/admin/manage-news/_actions/actions";
import SubscribeNewsForm from "../suscribe-news-form/suscribe-news";

export function HomeSidebar({ articles }: { articles: PublicArticle[] }) {
 const trending = articles.slice(0, 5);
  const latest = [...articles].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ).slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Trending News */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <TrendingUp className="h-5 w-5 mr-2 text-primary" />
            Trending Now
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {trending.map((news, index) => (
            <div key={news.id}>
              <Link href={`/article/${news.slug}`} className="flex space-x-3 group">
                <span className="text-2xl font-bold text-muted-foreground/40 italic">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold group-hover:text-primary transition-colors line-clamp-2">
                    {news.title}
                  </h4>
                  <p className="flex items-center text-[10px] text-muted-foreground mt-1 uppercase">
                    <Clock className="h-3 w-3 mr-1" />
                    {formatDistanceToNowStrict(new Date(news.createdAt), { addSuffix: true })}
                  </p>
                </div>
              </Link>
              {index < trending.length - 1 && <Separator className="mt-4" />}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Sidebar Ad */}
      <Card className="bg-muted/30 border-dashed">
        <CardContent className="p-4 flex items-center justify-center h-[250px] text-muted-foreground text-xs italic">
          Advertisement Space
        </CardContent>
      </Card>

      <Card className="border-none shadow-none bg-transparent">
        <CardHeader className="px-0">
          <CardTitle className="flex items-center text-xl font-black italic uppercase tracking-tighter">
            <Zap className="h-5 w-5 mr-2 text-yellow-500 fill-yellow-500" />
            Latest Updates
          </CardTitle>
        </CardHeader>
        <CardContent className="px-0 space-y-6">
          {latest.map((news) => (
            <Link href={`/article/${news.slug}`} key={news.id} className="block group">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                  <p className="text-[10px] font-bold text-muted-foreground flex items-center gap-1 uppercase tracking-wider">
                    <Clock className="h-3 w-3" />
                    {formatDistanceToNowStrict(new Date(news.createdAt), { addSuffix: true })}
                  </p>
                </div>
                <h4 className="text-sm font-semibold group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                  {news.title}
                </h4>
              </div>
            </Link>
          ))}
        </CardContent>
      </Card>

      {/* Newsletter */}
          <div className="space-y-2">
            <SubscribeNewsForm />
          </div>
    </div>
  );
}