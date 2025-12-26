import Navbar from "@/components/navbar/navbar";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      {/* Aap yahan Footer bhi add kar sakte hain baad mein */}
    </div>
  );
}
