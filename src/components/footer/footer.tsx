import Image from "next/image"
import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"
import { Button } from "../ui/button"
import { Separator } from "../ui/separator"



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
  categories: [
    { name: "National", href: "/national" },
    { name: "International", href: "/international" },
    { name: "Sports", href: "/sports" },
    { name: "Entertainment", href: "/entertainment" },
    { name: "Technology", href: "/technology" },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-12">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & socials */}
          <div>
            <div className="flex items-center space-x-2">
              <Image
                src="/logo.jpeg"
                alt="logo"
                width={80}
                height={75}
                className="rounded-lg transition-transform duration-300 hover:scale-105"
              />
              <span className="text-xl font-bold text-foreground">
                Tisari Aankh Rajgarh
              </span>
            </div>

            <p className="text-sm text-muted-foreground mt-3 mb-4 max-w-xs">
              Your trusted source for breaking news, analysis, and in-depth
              reporting from around the world.
            </p>

            <div className="flex space-x-2">
              <Button variant="outline" size="icon" className="h-9 w-9">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-9 w-9">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-9 w-9">
                <Youtube className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-9 w-9">
                <Twitter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-foreground mb-4 text-sm tracking-wide uppercase">
              Company
            </h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li
                  key={link.name}
                  className="text-sm text-muted-foreground hover:text-destructive transition-colors"
                >
                  <Link href={link.href}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-foreground mb-4 text-sm tracking-wide uppercase">
              Legal
            </h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li
                  key={link.name}
                  className="text-sm text-muted-foreground hover:text-destructive transition-colors"
                >
                  <Link href={link.href}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-foreground mb-4 text-sm tracking-wide uppercase">
              Categories
            </h3>
            <ul className="space-y-2">
              {footerLinks.categories.map((link) => (
                <li
                  key={link.name}
                  className="text-sm text-muted-foreground hover:text-destructive transition-colors"
                >
                  <Link href={link.href}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center text-left space-y-3 md:space-y-0">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Tisari Aankh Rajgarh News. All rights
            reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Rajgarh Alwar , Rajasthan
          </p>
        </div>
      </div>
    </footer>
  )
}
