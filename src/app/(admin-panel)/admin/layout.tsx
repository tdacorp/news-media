import { Suspense } from "react";
import { AdminHeader } from "@/components/admin-component/admin-header";
import { AdminSidebar } from "@/components/admin-component/admin-sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header mein useSearchParams hai, isliye ise Suspense mein wrap kiya */}
        <Suspense fallback={<div className="h-16 border-b bg-background animate-pulse" />}>
          <AdminHeader />
        </Suspense>

        <main className="flex-1 overflow-y-auto bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}