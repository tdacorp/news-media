import { AdminHeader } from "@/components/admin-component/admin-header";
import { AdminSidebar } from "@/components/admin-component/admin-sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Trash, UserPlus } from "lucide-react";

const users = [
    {
        id: "1",
        name: "Admin user",
        email: "admin@gmail.com",
        role: "Admin",
        articles: 23,
        status: "Active",
        joined: "jan 2024"
    },
    {
        id: "2",
        name: "Tech  Editor",
        email: "tech@gmail.com",
        role: "Editor",
        articles: 23,
        status: "Active",
        joined: "jan 2025"
    },
    {
        id: "3",
        name: "mohit",
        email: "mohit@gmail.com",
        role: "Author",
        articles: 23,
        status: "inactive",
        joined: "jan 2026"
    },
]

export default function Users() {
    return (
        <div className=" flex h-screen overflow-hidden">
            <AdminSidebar />
            <div className="flex flex-col flex-1 overflow-hidden">
                <AdminHeader />
                <main className="flex-1 overflow-y-auto bg-background">
                    <div className=" p-4 md:p-6">

                        {/* user page title */}
                        <div className="flex items-center justify-between mb-6" >
                            <div>
                                <h1 className="text-3xl font-bold text-foreground">User Management</h1>
                                <p className="text-muted-foreground">Mange admin , editors and autors</p>
                            </div>
                            <Button>
                                <UserPlus className="w-4 h-4 mr-2" />
                                Add New User
                            </Button>
                        </div>

                        {/* user table */}
                        <Card>
                            <CardHeader>
                                <CardTitle>All Users</CardTitle>
                            </CardHeader>

                            <CardContent>
                                <div className="w-full overflow-x-auto">

                                    <div className="max-h-[400px] overflow-y-auto">

                                        <Table className="min-w-[900px]">
                                    
                                           <TableHeader className="sticky top-0 bg-background/95 backdrop-blur z-10">
                                                <TableRow>
                                                    <TableHead>Name</TableHead>
                                                    <TableHead>Email</TableHead>
                                                    <TableHead>Role</TableHead>
                                                    <TableHead>Articles</TableHead>
                                                    <TableHead>Status</TableHead>
                                                    <TableHead>Joined</TableHead>
                                                    <TableHead className="text-right">Actions</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {users.map((user) => (
                                                    <TableRow key={user.id}>
                                                        <TableCell className="font-medium">{user.name}</TableCell>
                                                        <TableCell>{user.email}</TableCell>

                                                        <TableCell>
                                                            <Badge
                                                                variant={
                                                                    user.role === "Admin"
                                                                        ? "default"
                                                                        : user.role === "Editor"
                                                                            ? "secondary"
                                                                            : "outline"
                                                                }
                                                            >
                                                                {user.role}
                                                            </Badge>
                                                        </TableCell>

                                                        <TableCell>{user.articles}</TableCell>

                                                        <TableCell>
                                                            <Badge
                                                                variant={user.status === "Active" ? "default" : "secondary"}
                                                            >
                                                                {user.status}
                                                            </Badge>
                                                        </TableCell>

                                                        <TableCell>{user.joined}</TableCell>

                                                        <TableCell className="text-right">
                                                            <div className="flex justify-end gap-2">
                                                                <Button variant="ghost" size="icon">
                                                                    <Edit className="h-4 w-4" />
                                                                </Button>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    className="text-destructive"
                                                                >
                                                                    <Trash className="h-4 w-4" />
                                                                </Button>
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>

                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                    </div>
                </main>
            </div>
        </div>
    )
}