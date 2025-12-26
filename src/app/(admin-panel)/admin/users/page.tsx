import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserPlus } from "lucide-react";

import { getAllUsers } from "./_actions/actions";
import { UserActions } from "@/components/admin-component/user-actions";

export default async function Users({
  searchParams,
}: {
  searchParams?: Promise<{ query?: string }>;
}) {
  const params = await searchParams;
  const query = params?.query || "";

  const dbUsers = await getAllUsers(query);

  if ("error" in dbUsers) {
    return (
      <div className="p-6 text-center text-destructive">
        Error loading users: {dbUsers.error}
      </div>
    );
  }

  return (
    <main className="flex-1 overflow-y-auto bg-background">
      <div className=" p-4 md:p-6">
        {/* user page title */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              User Management
            </h1>
            <p className="text-muted-foreground">
              Mange admin , editors and autors
            </p>
          </div>
          <Button>
            <UserPlus className="w-4 h-4 mr-2" />
            Add New User
          </Button>
        </div>

        {/* user table */}
        <Card>
          <CardHeader>
            <CardTitle>All Users ({dbUsers.length})</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="w-full overflow-x-auto">
              <div className="max-h-[400px] overflow-y-auto">
                <Table className="min-w-[900px]">
                  <TableHeader className="sticky top-0 bg-background/95 backdrop-blur z-10">
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>User Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Articles</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dbUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium whitespace-nowrap">
                          {user.name || "N/A"}
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          @{user.username}
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge
                            className="capitalize"
                            variant={
                              user.role === "admin" ? "default" : "secondary"
                            }
                          >
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="text-green-600 border-green-200 bg-green-50"
                          >
                            -
                          </Badge>
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <UserActions user={user} />
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
  );
}
