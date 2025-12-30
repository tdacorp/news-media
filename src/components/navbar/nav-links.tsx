import Link from "next/link";
import CategoryDropdown from "./nav-dropdown";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { Menu, Search } from "lucide-react";
import { Input } from "../ui/input";
import { Session } from "next-auth";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"


const navigation = [
  { name: "Home", href: "/" },
  { name: "National", href: "/category/national" },
  { name: "International", href: "/category/international" },
  { name: "Sports", href: "/category/sports" },
  { name: "Entertainment", href: "/category/entertainment" },
  { name: "Technology", href: "/category/technology" },
  { name: "Business", href: "/categories/business" },
];

interface NavLinksProps {
  session: Session | null
}

export default function NavLinks({ session }: NavLinksProps) {
  return (
    <>
      <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
        <Link href="/" className="hover:text-red-600">Home</Link>
        <Link href="/breaking" className="hover:text-red-600">Breaking News</Link>
        <CategoryDropdown />
        <Link href="/trending" className="hover:text-red-600">Trending News</Link>
      </nav>

      {/* mobile hamburger sidebar mobile responsive*/}
      <Sheet>
        <SheetTrigger asChild className="lg:hidden">
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>

        <SheetContent side="right" className="w-[270px]">
          <VisuallyHidden>
            <SheetTitle>Mobile Navigation</SheetTitle>
          </VisuallyHidden>
          <div className="flex flex-col space-y-4 mt-9">
            <div className="relative mt-9">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search news..." className="pl-8" />
            </div>

            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-base font-medium text-foreground/80 hover:text-primary hove: focus:outline-none ml-2"
              >
                {item.name}
              </Link>
            ))}
          </div>
          {/* ===== Auth Buttons (ONLY when logged out) ===== */}
          {!session && (
            <div className="pt-4 border-t flex flex-col gap-2">
              <Link href="/login">
                <Button variant="outline" className="w-full">
                  Login
                </Button>
              </Link>

              <Link href="/login">
                <Button className="w-full">
                  Sign up
                </Button>
              </Link>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
