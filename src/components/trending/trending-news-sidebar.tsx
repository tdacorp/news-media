import { Clock, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import Link from "next/link"
import { Separator } from "@radix-ui/react-select"



const trendingNews = [
    {
        id: "1",
        title: "Tech stocks surge to new heights amid AI boom",
        time: "2 hours ago",
    },
    {
        id: "2",
        title: "Climate summit reaches breakthrough agreement",
        time: "3 hours ago",
    },
    {
        id: "3",
        title: "National team advances to World Cup finals",
        time: "4 hours ago",
    },
    {
        id: "4",
        title: "New vaccine shows promising results in trials",
        time: "5 hours ago",
    },
    {
        id: "5",
        title: "Major tech company announces layoffs",
        time: "6 hours ago",
    },
]

export default function TrednginNews() {
    return (
        <div className="space-y-6">

            {/* trending new section */}

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                        <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                        Trendign Now
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {trendingNews.map((news, index) => (
                        <div key={news.id}>
                            <Link href={news.id}>
                                <div className="flex space-x-3 group cursor-pointer">
                                    <span className="text-2xl font-bold text-muted-foreground">{String
                                        (index + 1).padStart(2, "0")}</span>
                                    <div className="flex-1">
                                        <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                                            {news.title}
                                        </h4>
                                        <div className="flex items-center text-xs text-muted-foreground mt-1">
                                            <Clock className="h-3 w-3 mr-1" />
                                            {news.time}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            {index < trendingNews.length - 1 && <Separator className="mt-4" />}
                        </div>
                    ))}
                </CardContent>
            </Card>

        </div>
    )
}