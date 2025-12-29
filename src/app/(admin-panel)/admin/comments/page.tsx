import { AdminCommentsTable } from "@/components/admin-component/admin-comment-tabel";


export default function AdminCommentsPage() {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="flex flex-col flex-1 overflow-hidden">
        <main className="flex-1 overflow-y-auto bg-background">
          <div className="container mx-auto p-4 sm:p-6 space-y-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Comments Management</h1>
              <p className="text-muted-foreground text-sm sm:text-base mt-1">
                Review, approve, and manage user comments
              </p>
            </div>

            <AdminCommentsTable />
          </div>
        </main>
      </div>
    </div>
  )
}
