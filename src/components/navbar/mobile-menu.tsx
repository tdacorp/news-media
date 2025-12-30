"use client"

import Link from "next/link"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import NavLinks from "./nav-links"
import { Input } from "@/components/ui/input"
import UserMenu from "./auth-section/user-dropdown"
import AuthSection from "./auth-section/login-button"


export default function MobileMenu({ session }: { session: any }) {
  return (
    <div className="flex items-center gap-2 lg:hidden">

      {session && <UserMenu user={session.user} />}

      <Sheet>
        <SheetTrigger asChild>
          <button className="p-2">
            <Menu className="h-6 w-6" />
          </button>
        </SheetTrigger>

        <SheetContent side="right" className="w-72">
          <div className="space-y-6 mt-6">

            <Input placeholder="Search news..." />

            <NavLinks />

            <AuthSection session={session} />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
