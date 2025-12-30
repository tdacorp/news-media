// components/navbar/auth-section.tsx
"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import UserMenu from "./user-dropdown"

export default function AuthSection({ session }: { session: any }) {
  if (!session) {
    return (
      <div className="hidden lg:flex gap-2">
        <Button variant="outline" size="sm" asChild>
          <Link href="/login">
            Login
          </Link>
        </Button>

        <Button size="sm" asChild>
          <Link href="/login?tab=signup">
            Sign up
          </Link>
        </Button>
      </div>
    )
  }

  return <UserMenu user={session.user} />
}
