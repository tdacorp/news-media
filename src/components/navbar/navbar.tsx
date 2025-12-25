// components/navbar/navbar.tsx
import Image from "next/image";
import Link from "next/link";
import NavLinks from "./nav-links";
import NavSocilsLinks from "./nav-socials";
import { Input } from "../ui/input";

export default function Navbar() {
    return (
        <header className="w-full border-b bg-background">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-4 h-14">

                <Link href="/" className="flex items-center gap-2">
                    <Image src="/logo.jpeg" alt="logo" width={60} height={30} />
                    <span className="font-bold text-lg text-foreground hover:text-primary">
                        Trisari Ankah
                    </span>
                </Link>

                <div className="flex items-center gap-3">
            
                 <div className="mx-auto">
                    <NavLinks />
                 </div>
                    <div className="hidden md:flex lg:flex">
                        <Input
                            placeholder="Search News"
                            className="h-8 w-48 text-sm"
                        />
                    </div>

                   

                    <div className="hidden lg:flex">
                        <NavSocilsLinks />
                    </div>
                </div>
            </div>
        </header>
    );
}
