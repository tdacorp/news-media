import { AdminCommentsTable } from "@/components/admin-component/admin-comment-tabel";
import { getAllCommentsAdmin } from "@/lib/actions/comments/comments";

export default async function AdminCommentsPage() {
  const data = await getAllCommentsAdmin(1, 100);

  return (
    <div className="min-h-screen bg-background/50 flex flex-col">
      <main className="flex-1 p-4 md:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-3xl md:text-4xl font-black text-foreground tracking-tighter">
                Comments Management
              </h1>
              <p className="text-muted-foreground text-sm font-medium">
                Manage user engagement and maintain community standards.
              </p>
            </div>
          </div>

          {/* Table Component */}
          <div className="bg-card rounded-3xl border border-border shadow-sm overflow-hidden transition-all hover:shadow-md">
            <AdminCommentsTable initialData={data} />
          </div>
        </div>
      </main>
    </div>
  );
}
