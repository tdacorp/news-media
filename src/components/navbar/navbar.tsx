import Image from "next/image";
import Link from "next/link";
import NavLinks from "./nav-links";
import NavSocilsLinks from "./nav-socials";
import { Input } from "../ui/input";

export default function Navbar(){
    return (
        <header className="w-full border-b bg-white-300">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-4 h-14">

                <Link href="/" className="flex items-center gap-2">
                <Image 
                  src="/logo.jpeg"
                  alt="logo"
                  width={60}
                  height={30}
                />
                <span className="font-bold text-lg text-red-600">
                    Trisari Ankah
                </span>
                </Link>

                <div>
                    <NavLinks />
                </div>
                <div className="hidden md:flex items-center gap-3">
                    <Input 
                     placeholder="Search News"
                     className="h-8 w-50 text-sm"
                    />
                    <NavSocilsLinks />
                </div>
            </div>
        </header>
    )
}