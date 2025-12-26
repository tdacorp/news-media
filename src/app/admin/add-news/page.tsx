import { AdminHeader } from "@/components/admin-component/admin-header";
import { AdminSidebar } from "@/components/admin-component/admin-sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Clock, Eye, FileText, Save, Upload } from "lucide-react";



export default function AddNewsPage() {
    return (
        <div className="flex h-screen overflow-y-auto">
            <AdminSidebar />
            <div className="flex flex-col flex-1 overflow-hidden">
                <AdminHeader />
                <main className="flex flex-col flex-1 overflow-y-auto">
                    <div className="container mx-auto p-6 max-w-4xl">

                        <div className="mb-6">
                            <h1 className="text-3xl font-bold text-foreground">Add New Article</h1>
                            <p className="text-muted-foreground">Create and publish a new news Article</p>
                        </div>


                        <Card>
                            <CardHeader>
                                <CardTitle>Article Details</CardTitle>
                            </CardHeader>
                            <CardContent>

                                {/* title */}
                                <div className="space-y-2">
                                    <Label htmlFor="title">Article Title *</Label>
                                    <Input id="title" placeholder="Enter article Title..."
                                        className="text-base"
                                    />
                                </div>

                                {/* category & autohr  */}

                                <div className="grid gird-cols-1 md:grid-cols-2 gap-4 mt-3">
                                    <div className="space-y-2">
                                        <Label htmlFor="category">Category</Label>
                                        <Select>
                                            <SelectTrigger id="category">
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="national">National</SelectItem>
                                                <SelectItem value="international">International</SelectItem>
                                                <SelectItem value="sports">Sports</SelectItem>
                                                <SelectItem value="entertainment">Entertainment</SelectItem>
                                                <SelectItem value="technology">Technology</SelectItem>
                                                <SelectItem value="business">Business</SelectItem>

                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="author">Author *</Label>
                                        <Input id="author" placeholder="Author name" defaultValue="Admin User" />
                                    </div>
                                </div>

                                {/* excerpt */}
                                <div className="space-y-2">
                                    <Label htmlFor="excerpt">Excerpt *</Label>
                                    <Textarea id="excerpt" placeholder="Brief summary of the article (2-3 sentence)..." rows={3} />
                                </div>

                                {/* image */}
                                <div className="space-y-2 mt-3">
                                    <Label>Featured Image *</Label>
                                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:bg-secondary/50 transition-colors cursor-pointer">
                                        <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                                        <p className="text-sm text-muted-foreground mb-1">Click to upload or drag and drop</p>
                                        <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
                                    </div>
                                </div>


                                {/* Content Editor Placeholder */}
                                <div className="space-y-2 mt-3">
                                    <Label htmlFor="content">Article Content *</Label>
                                    <div className="border border-border rounded-lg p-4 bg-secondary/20 min-h-[300px]">
                                        <div className="flex items-center justify-center h-full">
                                            <div className="text-center">
                                                <FileText className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                                                <p className="text-sm font-medium text-foreground mb-1">Rich Text Editor</p>
                                                <p className="text-xs text-muted-foreground">Advanced editor for formatting article content</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* tages */}
                                <div className="space-y-2 mt-3">
                                    <Label htmlFor="tags">Tags</Label>
                                    <Input id="tags" placeholder="Enter tags separated by commas...." />
                                    <p className="text-xs text-muted-foreground">Example : politics, economy, reform , etc</p>
                                </div>

                                {/* youtube vido lnk */}
                                <div className="space-y-2 mt-2">
                                    <label htmlFor="vido">Video Url (optional)</label>
                                    <Input id="video" placeholder="youtube or vido URL...." />
                                </div>

                                {/* actions */}
                                <div className="pt-4 border-t border-border">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">

                                        <Button variant="outline" size="sm" className="w-full">
                                            <Eye className="h-4 w-4 mr-2" />
                                            Preview
                                        </Button>

                                        <Button variant="outline" className="w-full">
                                            <Save className="h-4 w-4 mr-2" />
                                            Save Draft
                                        </Button>

                                        <Button variant="outline" className="w-full">
                                            <Clock className="h-4 w-4 mr-2" />
                                            Schedule
                                        </Button>

                                        <Button className="bg-primary text-primary-foreground w-full">
                                            Publish Now
                                        </Button>

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