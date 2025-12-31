"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
import { Button } from "../ui/button";
import { getAllCategories } from "@/app/(admin-panel)/admin/categories/_actions/actions";

interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
}

export default function NavLinks() {
  const [categories, setCategories] = useState<CategoryItem[]>([]);

  useEffect(() => {
    async function loadCategories() {
      const response = await getAllCategories();

      // Error object handle karne ke liye check
      if (Array.isArray(response)) {
        setCategories(response as CategoryItem[]);
      } else if (response && "error" in response) {
        console.error(response.error);
      }
    }
    loadCategories();
  }, []);

  // --- LOGIC FOR SPLITTING CATEGORIES ---
  const mainCategories = categories.slice(0, 3);
  const moreCategories = categories.slice(3);

  return (
    <>
      {/* DESKTOP NAVIGATION (Hidden on Mobile/Tablet) */}
      <div className="hidden xl:block">
        <NavigationMenu>
          <NavigationMenuList className="gap-1">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/"
                  className="px-3 py-2 text-sm font-bold hover:text-primary-forground transition-colors"
                >
                  Home
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {mainCategories.map((cat) => (
              <NavigationMenuItem key={cat.id}>
                {/* <NavigationMenuTrigger className="bg-transparent hover:bg-transparent text-foreground hover:text-primary font-bold text-sm">
                  {cat.title}
                </NavigationMenuTrigger> */}
                <NavigationMenuLink asChild>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="px-4 py-2 text-sm font-bold hover:text-primary-foreground transition-colors uppercase tracking-tight"
                  >
                    {cat.name}
                  </Link>
                </NavigationMenuLink>
                {/* <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 bg-background">
                    {cat.sub.map((sub) => (
                      <li key={sub}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={`${cat.href}/${sub}`}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-muted hover:text-primary"
                          >
                            <div className="text-sm font-bold">{sub}</div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent> */}
              </NavigationMenuItem>
            ))}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent hover:text-primary-foreground font-bold">
                More
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 bg-background">
                  {moreCategories.map((cat) => (
                    <li key={cat.id}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={`/category/${cat.slug}`}
                          className="block select-none space-y-1 rounded-md p-3 text-sm font-bold leading-none no-underline outline-none transition-colors hover:bg-muted hover:text-primary"
                        >
                          {cat.name}
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* MOBILE NAVIGATION (Hidden on Desktop) */}
      <div className="xl:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="h-10 w-10">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-[300px] sm:w-[350px] overflow-y-auto"
          >
            <SheetHeader className="text-left border-b pb-4 mb-4">
              <SheetTitle className="text-primary font-black italic text-2xl uppercase">
                Trisari <span className="text-foreground">Ankah</span>
              </SheetTitle>
            </SheetHeader>

            <nav className="flex flex-col gap-2">
              <Link
                href="/"
                className="text-lg font-bold p-2 hover:bg-muted rounded-md border-b"
              >
                Home
              </Link>

              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/category/${cat.slug}`}
                  className="text-base font-bold p-3 hover:bg-slate-100 rounded-md transition-all border-b border-slate-50 uppercase"
                >
                  {cat.name}
                </Link>
              ))}

              {/* <Accordion type="single" collapsible className="w-full">
                {categories.map((cat, index) => (
                  <AccordionItem
                    value={`item-${index}`}
                    key={cat.title}
                    className="border-b"
                  >
                    <AccordionTrigger className="text-lg font-bold hover:no-underline py-3 px-2">
                      {cat.title}
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-1 pl-4 pb-4">
                      {cat.sub.map((sub) => (
                        <Link
                          key={sub}
                          href={`${cat.href}/${sub}`}
                          className="py-2 px-3 text-muted-foreground hover:text-primary hover:bg-muted rounded-md"
                        >
                          {sub}
                        </Link>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion> */}

              <Link
                href="/e-paper"
                className="text-lg font-bold p-2 hover:bg-muted rounded-md border-b mt-2"
              >
                E-paper
              </Link>
              <Link
                href="/live-tv"
                className="text-lg font-bold p-2 text-primary hover:bg-muted rounded-md border-b"
              >
                LIVE
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
