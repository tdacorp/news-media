import Link from "next/link";
import CategoryDropdown from "./nav-dropdown";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { Menu, Search } from "lucide-react";
import { Input } from "../ui/input";

const navigation = [
  { name: "Home", href: "/" },
  { name: "National", href: "/national" },
  { name: "International", href: "/international" },
  { name: "Sports", href: "/sports" },
  { name: "Entertainment", href: "/entertainment" },
  { name: "Technology", href: "/technology" },
  { name: "Business", href: "/business" },
];

export default function NavLinks() {
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

        <SheetContent side="right" className="w-[300px]">
          <div className="flex flex-col space-y-4 mt-9">
            <div className="relative">
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
        </SheetContent>
      </Sheet>
    </>
  );
}
