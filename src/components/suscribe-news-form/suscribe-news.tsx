import Link from "next/link";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";


export default function SubscribeNewsForm() {
    return (
        <div className="space-y-6 mt-6 mx-auto">
            <Card className="bg-primary text-primary-foreground">
                <CardHeader>
                    <CardTitle className="text-lg">Subscribe to Newsletter</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm mb-4 text-primary-foreground/90">
                        Get the latest news delivered directly to your inbox
                    </p>
                    <div className="space-y-2">
                        {/* <Input
                            type="email"
                            placeholder="Enter your email"
                            className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
                        /> */}
                        <Link href={"/contact"}>
                         <Button className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                            Subscribe
                        </Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}