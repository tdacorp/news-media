import type { Metadata } from "next";
import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  title: {
    default: "Aapki News Site | Latest Updates",
    template: "%s | Aapki News Site",
  },
  description: "Hindi/English News portal for latest updates...",
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Aapki News Site",
  },
};

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
