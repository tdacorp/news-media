import { Card, CardContent } from "../ui/card";


export default function AdvertiesmentComponent(){
    return (
        <div className="space-y-6 mt-6">
            <Card>
                <CardContent className="p-4">
                    <div className="flex items-center justify-center h-[300px] bg-secondary/50 rounded">
                        <p className="text-xs text-muted-foreground">Advertisement comming</p>
                    </div>
                </CardContent>
            </Card>

        </div>
    )
}