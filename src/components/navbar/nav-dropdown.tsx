import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

export const Categories = [
    {name : "National",slug:"national"},
    {name : "International ", slug: "international"},
    {name : " Business", slug: "business"},
    {name : "sports", slug: "sports"},
    {name : "Entertainment", slug: "entertainment"},
    {name : "Technolgoy", slug: "technology"},
]

export default function CategoryDropdown() {
    return (
        <DropdownMenu>
             <DropdownMenuTrigger className="text-sm font-medium text-foreground/80 hover:text-primary focus:outline-none">
                Categories
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="start"
                className="w-48"
            >
                {Categories.map((cat)=> (
                    <DropdownMenuItem 
                        key={cat.slug} asChild
                    >
                        <Link
                         href={`/category/${cat.slug}`}
                        >
                            {cat.name}
                        </Link>

                </DropdownMenuItem>
                ))}
                
            </DropdownMenuContent>
        </DropdownMenu>
    )
}