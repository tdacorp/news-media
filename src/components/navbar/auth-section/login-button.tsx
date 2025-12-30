// components/navbar/auth-section.tsx
"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import UserMenu from "./user-dropdown"
import { Session } from "next-auth"
 
interface AuthSectionProps {
    session : Session | null 
}

export default function AuthSection( {session }: AuthSectionProps) {
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
