import Link from "next/link";
import CategoryDropdown from "./nav-dropdown";


export default function NavLinks() {
    return (
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-black">
            <Link href="/" className="hover:text-red-600">
                Home
            </Link>

            <Link href="/" className="hover:text-red-600">
                Breaking News
            </Link>

            <CategoryDropdown />

            <Link href="/" className="hover:text-red-600">
                Trending News
            </Link>
        </nav>
    )
}