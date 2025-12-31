import { auth, signOut } from "../../../auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import Link from "next/link";
import { LayoutDashboard, LogOut, User } from "lucide-react";

export default async function NavUserMenu() {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return (
      <Button
        asChild
        variant="destructive"
        size="sm"
        className="h-8 font-bold skew-x-[-10deg]"
      >
        <Link href="/login">Log In</Link>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none focus:ring-0">
        <Avatar className="h-8 w-8 border-2 border-primary/20 hover:border-red-600 transition-all cursor-pointer">
          <AvatarImage src={user.image || ""} alt={user.name || "User"} />
          <AvatarFallback className="bg-red-600 text-white text-xs font-bold">
            {user.name?.charAt(0) || "U"}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-64 mt-2 shadow-2xl border-2 p-1"
      >
        <DropdownMenuLabel className="font-normal p-3">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-bold leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground truncate">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="bg-muted" />

        {/* ROLE BASED: only admin can access dashbord */}
        {user.role === "admin" && (
          <DropdownMenuItem
            asChild
            className="cursor-pointer p-2.5 font-medium"
          >
            <Link href="/admin" className="flex items-center">
              <LayoutDashboard className="mr32 h-4 w-4 focus:text-primary-foreground" />
              <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>
        )}

        <DropdownMenuItem asChild className="cursor-pointer p-2.5 font-medium">
          <Link href="/profile" className="flex items-center">
            <User className="mr-2 h-4 w-4 focus:text-primary-foreground" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Sign Out Logic */}
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
        >
          <DropdownMenuItem className="cursor-pointer p-2.5 font-medium">
            <button
              type="submit"
              className="flex items-center w-full px-2.5 py-2 font-bold"
            >
              <LogOut className="mr-3 h-4 w-4 focus:text-primary-foreground" />
              <span>Sign Out</span>
            </button>
          </DropdownMenuItem>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
