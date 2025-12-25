import Link from "next/link";


export default function NavLinks() {
    return (
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-black">
            <Link href="/" className="hover:text-red-600">
                Home
            </Link>

            <Link href="/" className="hover:text-red-600">
                Breaking News
            </Link>

            <Link href="/" className="hover:text-red-600">
                Dropdwon
            </Link>

            <Link href="/" className="hover:text-red-600">
                Trending News
            </Link>
        </nav>
    )
}