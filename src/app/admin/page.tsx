import { AdminHeader } from "@/components/admin-component/admin-header";
import { AdminSidebar } from "@/components/admin-component/admin-sidebar";
import Tiptap from "@/components/ui/text-ediotr";



export default function AdminDashboard() {
    return (
        <div className="flex h-screen overflow-hidden">
            <AdminSidebar />
            <div className="flex flex-1 flex-col overflow-hidden">
                <AdminHeader />
                <main className="flex-1 overflow-y-auto bg-background">
                    <div className="p-6 space-y-6">

                        <div>
                            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
                            <p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
                        </div>

                            <div>
                                <Tiptap />
                            </div>
                    </div>
                </main>
            </div>
        </div>
    )
}