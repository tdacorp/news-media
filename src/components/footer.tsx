import Image from "next/image"
import { Button } from "./ui/button"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"



const footerLinks = {
    company: [
        { name: "About us", href: "/about" },
        { name: "Contact", href: "/contact" },
        { name: "Careers", href: "/careers" },
        { name: "Adverties", href: "/adverties" },


    ],
    legal: [
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Services", href: "/terms" },
        { name: "Cookies Policy", href: "/cookies" },
        { name: "Disclaimer", href: "/disclaimer" },
    ],
    categoryies: [
        { name: "National", href: "/national" },
        { name: "International", href: "/international" },
        { name: "Sports", href: "/sports" },
        { name: "Entertainment", href: "/entertainment" },
        { name: "Technology", href: "/technology" },
        { name: "Trending", href: "trending" }

    ],
}

export default function Footer() {

    return (
        <footer className="bg-card border-t border-border mt-12">
            <div className="container mx-auto px-x py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ">
                    {/* logo & socials links */}
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="flex items-center justify-center">
                                <Image
                                    src="/logo.jpeg"
                                    alt="logo"
                                    width={80}
                                    height={75}
                                    className="rounded-lg transform transition-transform duration-400 hover:scale-105"
                                /> 
                            </div>
                            <span className="text-xl font-bold text-foreground">Tisari aankh Rajgarh</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">
                            Your trusted source for breaking news, analysis, and in-depth reporting from around the world.
                        </p>
                        <div className="flex space-x-2">
                            <Button variant="outline" size="icon" className="h-9 w-9 hover:bg-destructive hover:text-card hover:border-primary">
                                <Facebook className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon" className="h-9 w-9 hover:bg-destructive hover:text-card hover:border-primary">
                                <Instagram className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon" className="h-9 w-9 hover:bg-destructive hover:text-card hover:border-primary">
                                <Youtube className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon" className="h-9 w-9 hover:bg-destructive hover:text-card hover:border-primary">
                                <Twitter className="h-4 w-4" />
                            </Button>
                        </div>


                    </div>

                    {/* company  */}
                    <div>
                        <h1>home</h1>
                    </div>

                    {/* Legel  */}
                    <div>
                        <h1>legel</h1>
                    </div>

                    {/* categories */}
                    <div>
                        <h1>international</h1>
                    </div>
                </div>
            </div>
        </footer>
    )
}