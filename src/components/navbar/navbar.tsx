import Image from "next/image";
import Link from "next/link";
import NavLinks from "./nav-links";
import { Wind, Tv, User } from "lucide-react";
import NavUserMenu from "./NavUserMenu";
import NavSocilsLinks from "./nav-socials";
import NavNotifications from "./NavNotifications";
import NavbarSearch from "./NavSearchbar";

export default function Navbar() {
  return (
    <>
      <header className="w-full border-b bg-background sticky top-0 z-50 shadow-sm">
        {/* Top Bar: Alignment aur contrast fix kiya hai */}
        <div className="hidden sm:flex bg-slate-950 text-primary-foreground h-9 items-center">
          <div className="max-w-7xl mx-auto w-full flex justify-between px-4 text-[10px] font-bold uppercase tracking-widest">
            <div className="flex items-center gap-4">
              <span className="text-xs opacity-90">TRISARI ANKAH</span>
              <span className="text-primary animate-pulse">● LIVE</span>
              <span className="hidden md:inline text-muted-foreground">
                {new Date().toLocaleDateString("hi-IN", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden lg:block">
                <NavSocilsLinks />
              </div>
              <Link
                href="/register"
                className="flex items-center gap-1 bg-primary px-3 py-1 rounded-sm text-[11px]"
              >
                Sign In
                <User className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Main Header: Spacing aur Icon sizing fix ki hai */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="xl:hidden flex-1 flex items-center">
              <NavLinks />
            </div>

            <div className="flex-[2] flex justify-center xl:justify-start xl:flex-none">
              <Link href="/" className="flex items-center gap-2 md:gap-3 group">
                {/* Image Logo: Always visible */}
                <div>
                  <Image
                    src="/logo.jpeg"
                    alt="Trisari Ankah Logo"
                    width={40}
                    height={40}
                    priority
                    className="object-contain brightness-110"
                  />
                </div>

                {/* Text Logo: Hidden on Mobile (flex), Shown only from MD (Medium) screens up */}
                <div className="hidden md:flex flex-col">
                  <span className="font-black text-xl md:text-2xl tracking-tighter uppercase italic leading-none text-foreground">
                    Trisari{" "}
                    <span className="text-primary font-serif">Ankah</span>
                  </span>
                  <span className="hidden text-[9px] font-bold text-muted-foreground uppercase tracking-[0.3em]">
                    News Media
                  </span>
                </div>
              </Link>
            </div>

            {/* 3. CENTER-RIGHT: Desktop Links (Hidden on mobile) */}
            <div className="hidden xl:block flex-1 px-8">
              <NavLinks />
            </div>

            {/* Actions Section: Dark background par visibility fix ki hai */}
            <div className="flex-1 flex items-center justify-end gap-2 md:gap-4">
              {/* E-Paper & AQI (Hidden on Mobile) */}
              <div className="hidden lg:flex items-center gap-4 border-r pr-4 text-[11px] font-bold uppercase">
                {/* <Link
                  href="/e-paper"
                  className="flex items-center gap-1 hover:text-primary"
                >
                  <Newspaper className="h-4 w-4 text-orange-500" /> E-paper
                </Link> */}
                <div className="flex items-center gap-1 border-l pl-4 border-border">
                  <Wind className="h-4 w-4 text-blue-500" /> AQI:
                  <span className="text-green-600">42</span>
                </div>
              </div>

              {/* Always Visible Action Icons */}
              <div className="flex items-center gap-2 md:gap-3">
                <NavNotifications />

                <Link
                  href="/live-tv"
                  className="flex items-center gap-2 bg-primary text-primary-foreground px-2 py-1 md:px-3 md:py-1.5 rounded-md hover:bg-primary/90 transition-all"
                >
                  <span className="hidden md:inline text-[11px] font-bold tracking-tighter">
                    LIVE
                  </span>
                  <Tv className="h-4 w-4 md:h-3.5 md:w-3.5 animate-pulse" />
                </Link>

                <NavbarSearch/>

                {/* <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-9 w-9">
                      <Search className="h-5 w-5" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="top-[10%] max-w-[95vw] sm:max-w-[600px]">
                    <div className="flex items-center gap-2 p-4 bg-background">
                      <Search className="h-5 w-5 text-muted-foreground" />
                      <Input
                        placeholder="Search breaking news..."
                        className="border-none bg-transparent focus-visible:ring-0 text-lg shadow-none h-12"
                        autoFocus
                      />
                    </div>
                  </DialogContent>
                </Dialog> */}

                <div className="h-6 w-[1px] bg-border mx-1" />
                <NavUserMenu />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
