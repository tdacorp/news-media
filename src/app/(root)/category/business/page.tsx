import AdvertiesmentComponent from "@/components/advertisesment/advertisement";
import SubscribeNewsForm from "@/components/suscribe-news-form/suscribe-news";
import { LatestNewsSidebar } from "@/components/trending/latest-news-sidebar";
import TrednginNews from "@/components/trending/trending-news-sidebar";
import { Separator } from "@/components/ui/separator";


export default function BusinessPage(){
    return (
        <div className="min-h-screen flex flex-col">
              
            <main className="flex-1">
                <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        <div className="lg:col-span-2">

                            <div className="mb-8">
                                <h1 className="text-4xl font-bold text-foreground mb-2">Business News</h1>
                                 <p className="text-muted-foreground">Market updates, economy, startups, and corporate news</p>
                            </div>

                            <Separator className="mb-8" />

                            {/* feature article */}
                            <div className="mb-12">
                                {/* add News card category  News */}
                                {/* <NewsCard  {...businessNews[o] variant="large"}/> */}
                                <h1>businessNews News are comming soon....</h1>
                            </div>

                            <AdvertiesmentComponent />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* map here */}
                            </div>
                        </div>

                        <div className="lg:col-span-1 mt-12">
                            <TrednginNews />
                            <AdvertiesmentComponent />
                            <LatestNewsSidebar />
                            <SubscribeNewsForm />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}