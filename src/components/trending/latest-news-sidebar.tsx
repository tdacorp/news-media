import { Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import Link from "next/link"
import { Separator } from "@radix-ui/react-select"


const latestNews = [
    {
        id: "1",
        title: "Breaking: Major policy announcement expected today",
        time: "15 mins ago",
    },
    {
        id: "2",
        title: "Stock market shows strong recovery in morning trade",
        time: "25 mins ago",
    },
    {
        id: "3",
        title: "International relations reach critical juncture",
        time: "45 mins ago",
    },
    {
        id: "4",
        title: "Sports league announces new tournament format",
        time: "1 hour ago",
    },
]


export function LatestNewsSidebar() {
    return (
        <div className="space-y-6 mt-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                        <Clock className="h-5 w-5 mr-2 text-primary" />
                        Latest News
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {latestNews.map((news, index) => (
                        <div key={news.id}>
                            <Link href={`/article/${news.id}`}>
                                <div className="group cursor-pointer">
                                    <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                                        {news.title}
                                    </h4>
                                    <div className="flex items-center text-xs text-muted-foreground mt-1">
                                        <Clock className="h-3 w-3 mr-1" />
                                        {news.time}
                                    </div>
                                </div>
                            </Link>
                            {index < latestNews.length - 1 && <Separator className="mt-4" />}
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    )
}