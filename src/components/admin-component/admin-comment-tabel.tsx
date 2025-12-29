"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Trash2, CheckCircle, XCircle, Search } from "lucide-react"
import { Checkbox } from "../ui/checkbox"

interface Comment {
  id: string
  author: string
  email: string
  content: string
  article: string
  date: string
  status: "pending" | "approved" | "rejected"
  likes: number
}

const mockComments: Comment[] = [
  {
    id: "1",
    author: "Rajesh Kumar",
    email: "rajesh@example.com",
    content: "This is a comprehensive analysis of the economic reforms...",
    article: "Breaking: Historic Economic Reform Package",
    date: "2 hours ago",
    status: "approved",
    likes: 45,
  },
  {
    id: "2",
    author: "Priya Sharma",
    email: "priya@example.com",
    content: "Great insights on the employment generation...",
    article: "Economic Reform Package Announced",
    date: "3 hours ago",
    status: "pending",
    likes: 28,
  },
  {
    id: "3",
    author: "Amit Patel",
    email: "amit@example.com",
    content: "I have some concerns about the implementation timeline...",
    article: "Breaking: Historic Economic Reform Package",
    date: "4 hours ago",
    status: "pending",
    likes: 15,
  },
  {
    id: "4",
    author: "Neha Singh",
    email: "neha@example.com",
    content: "Spam content here...",
    article: "Tech Giant Launches Revolutionary Product",
    date: "5 hours ago",
    status: "rejected",
    likes: 0,
  },
]

export function AdminCommentsTable() {
  const [comments, setComments] = useState<Comment[]>(mockComments)
  const [selectedComments, setSelectedComments] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "approved" | "rejected">("all")

  const filteredComments = comments.filter((comment) => {
    const matchesSearch =
      comment.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || comment.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const handleApprove = (id: string) => {
    setComments(comments.map((c) => (c.id === id ? { ...c, status: "approved" as const } : c)))
  }

  const handleReject = (id: string) => {
    setComments(comments.map((c) => (c.id === id ? { ...c, status: "rejected" as const } : c)))
  }

  const handleDelete = (id: string) => {
    setComments(comments.filter((c) => c.id !== id))
    setSelectedComments(selectedComments.filter((s) => s !== id))
  }

  const toggleSelectAll = () => {
    if (selectedComments.length === filteredComments.length) {
      setSelectedComments([])
    } else {
      setSelectedComments(filteredComments.map((c) => c.id))
    }
  }

  const toggleSelect = (id: string) => {
    setSelectedComments((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]))
  }

  return (
    <div className="space-y-6">
       {/* searchbar with the fileter  */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by author, email, or content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              {["all", "pending", "approved", "rejected"].map((status) => (
                <Button
                  key={status}
                  variant={filterStatus === status ? "default" : "outline"}
                  onClick={() => setFilterStatus(status as typeof filterStatus)}
                  className="w-full sm:w-auto"
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      

      {/* table show the comment */}
      <Card>
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <CardTitle>Comments Management</CardTitle>
          {selectedComments.length > 0 && (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                selectedComments.forEach((id) => handleDelete(id))
                setSelectedComments([])
              }}
            >
              Delete Selected ({selectedComments.length})
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border">
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedComments.length === filteredComments.length && filteredComments.length > 0}
                      onChange={toggleSelectAll}
                    />
                  </TableHead>
                  <TableHead className="min-w-[150px]">Author</TableHead>
                  <TableHead className="min-w-[200px] hidden sm:table-cell">Comment</TableHead>
                  <TableHead className="min-w-[150px] hidden md:table-cell">Article</TableHead>
                  <TableHead className="min-w-[100px]">Status</TableHead>
                  <TableHead className="text-right min-w-[120px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredComments.map((comment) => (
                  <TableRow key={comment.id} className="border-border hover:bg-secondary/50">
                    <TableCell>
                      <Checkbox
                        checked={selectedComments.includes(comment.id)}
                        onChange={() => toggleSelect(comment.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-foreground text-sm">{comment.author}</p>
                        <p className="text-xs text-muted-foreground">{comment.email}</p>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <p className="text-sm text-foreground line-clamp-2">{comment.content}</p>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <p className="text-sm text-foreground line-clamp-1">{comment.article}</p>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`text-xs ${
                          comment.status === "approved"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : comment.status === "pending"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                        }`}
                      >
                        {comment.status.charAt(0).toUpperCase() + comment.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex flex-col sm:flex-row justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleApprove(comment.id)}
                          className="text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-900/20"
                          title="Approve"
                        >
                          <CheckCircle className="h-4 w-4" />
                          <span className="hidden sm:inline ml-1">Approve</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleReject(comment.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                          title="Reject"
                        >
                          <XCircle className="h-4 w-4" />
                          <span className="hidden sm:inline ml-1">Reject</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(comment.id)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="hidden sm:inline ml-1">Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredComments.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No comments found</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
