import Image from "next/image";
import Link from "next/link";
import NavLinks from "./nav-links";

export default function Navbar(){
    return (
        <header className="w-full border-b bg-white">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-4 h-14">

                <Link href="/" className="flex items-center gap-2">
                <Image 
                  src="/logo.jpeg"
                  alt="logo"
                  width={30}
                  height={30}
                />
                <span className="font-bold text-lg text-red-600">
                    Trisari Ankah
                </span>
                </Link>

                <div>
                    <NavLinks />
                </div>
                <div>searh-bar and social links</div>
            </div>
        </header>
    )
}