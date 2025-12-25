"use client"
import { FileText, FolderOpen, LayoutDashboard, LogOut, MessageSquare, PlusCircle, Scroll, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ScrollArea } from "../ui/scroll-area";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

const SidebarLinks = [
    {
        title: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
    },
    {
        title: "Add News",
        href: "/admin/add-news",
        icon: PlusCircle,
    },
    {
        title: "Mangae News",
        href: "/admin/manage-news",
        icon: FileText,
    },
    {
        title: "Categories",
        href: "/admin/categories",
        icon: FolderOpen,
    },
    {
        title: "Comments",
        href: "/admin/comments",
        icon: MessageSquare,
    },
    {
        title: "Users",
        href: "/admin/users",
        icon: Users,
    },
]

export function AdminSidebar() {

    const pahtname = usePathname()

    return (
        <div className="flex h-full w-64 flex-col border-r border-border bg-card">

            <div className="flex h-full w-64 items-center border-b border bg-card">
                <Link
                    href="/admin"
                    className=""
                >
                    <div className="flex items-center justify-center">
                        <Image
                            src="/logo.jpeg"
                            alt="logo"
                            width={40}
                            height={40}
                            className="rounded-lg transform transition-transform duration-400 hover:scale-105"
                        />
                    </div>
                    <div>
                        <span className="text-lg font-bold text-foreground">Trisari aankh </span>
                        <span className="text-md block font-bold text-foreground">Rajgarh </span>
                        <span className="text-xs text-muted-foreground block">Admin Panel</span>
                    </div>
                </Link>
            </div>

            {/* admin sidebar menu */}
            <ScrollArea className="flex-1 py-4">
                <nav>
                    {SidebarLinks.map((link) => {
                        const isActive = pahtname === link.href
                        return (
                            <Link key={link.href} href={link.href}>
                                <div
                                    className={cn(
                                        "flex items-center space-x-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                                        isActive
                                            ? "bg-primary text-primary-foreground"
                                            : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                                    )}
                                >
                                    <link.icon className="h-5 w-5" />
                                    <span>{link.title}</span>

                                </div>
                            </Link>

                        )
                    })}
                </nav>
            </ScrollArea>


            <div className="border-t border-border p-4">
                <div className="flex items-center space-x-3 mb-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-semibold">
                        Ms
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">Mohit Saini</p>
                        <p className="text-xs text-muted-foreground truncate">mohit@newshub.com</p>
                    </div>
                </div>
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                </Button>
            </div>
        </div>
    )
}