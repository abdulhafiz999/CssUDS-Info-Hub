"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/components/auth-context"
import { useContent } from "@/components/content-context"
import { Trash2, FileText, Video, Newspaper, UserPlus, UserMinus, Shield } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import FileUpload from "@/components/file-upload"

// Sample course list for dropdowns
const courses = [
  { id: "CS101", name: "Introduction to Computer Science" },
  { id: "CS201", name: "Data Structures" },
  { id: "CS301", name: "Algorithms" },
  { id: "CS310", name: "Database Systems" },
  { id: "CS330", name: "Computer Networks" },
  { id: "CS410", name: "Web Development" },
  { id: "CS510", name: "Machine Learning" },
  { id: "CS520", name: "Artificial Intelligence" },
]

export default function AdminPanel() {
  const { user, admins, addAdmin, removeAdmin } = useAuth()
  const {
    lectureNotes,
    lectureVideos,
    newsItems,
    addLectureNote,
    addLectureVideo,
    addNewsItem,
    removeLectureNote,
    removeLectureVideo,
    removeNewsItem,
  } = useContent()
  const [activeTab, setActiveTab] = useState("content")

  // Form states
  const [newAdminEmail, setNewAdminEmail] = useState("")
  const [removeAdminEmail, setRemoveAdminEmail] = useState("")

  // Lecture note form
  const [noteTitle, setNoteTitle] = useState("")
  const [noteDescription, setNoteDescription] = useState("")
  const [noteFileUrl, setNoteFileUrl] = useState<string | null>(null)
  const [noteFile, setNoteFile] = useState<File | null>(null)
  const [noteCourse, setNoteCourse] = useState("")

  // Lecture video form
  const [videoTitle, setVideoTitle] = useState("")
  const [videoDescription, setVideoDescription] = useState("")
  const [videoUrl, setVideoUrl] = useState("")
  const [videoThumbnail, setVideoThumbnail] = useState<string | null>(null)
  const [videoCourse, setVideoCourse] = useState("")

  // News form
  const [newsTitle, setNewsTitle] = useState("")
  const [newsSummary, setNewsSummary] = useState("")
  const [newsContent, setNewsContent] = useState("")
  const [newsCategory, setNewsCategory] = useState("")
  const [newsImage, setNewsImage] = useState<string | null>(null)

  // Handle adding a new admin
  const handleAddAdmin = () => {
    if (newAdminEmail) {
      addAdmin(newAdminEmail)
      setNewAdminEmail("")
    }
  }

  // Handle removing an admin
  const handleRemoveAdmin = () => {
    if (removeAdminEmail) {
      removeAdmin(removeAdminEmail)
      setRemoveAdminEmail("")
    }
  }

  // Handle adding a new lecture note
  const handleAddLectureNote = () => {
    if (noteTitle && noteDescription && noteCourse && noteFileUrl) {
      addLectureNote({
        title: noteTitle,
        description: noteDescription,
        fileUrl: noteFileUrl,
        fileType: noteFile?.type || "application/pdf",
        uploadedBy: user?.email || "unknown",
        course: noteCourse,
      })

      // Reset form
      setNoteTitle("")
      setNoteDescription("")
      setNoteFileUrl(null)
      setNoteFile(null)
      setNoteCourse("")
    }
  }

  // Handle adding a new lecture video
  const handleAddLectureVideo = () => {
    if (videoTitle && videoDescription && videoUrl && videoCourse) {
      addLectureVideo({
        title: videoTitle,
        description: videoDescription,
        videoUrl: videoUrl,
        thumbnailUrl: videoThumbnail || "/placeholder.svg?height=200&width=300",
        uploadedBy: user?.email || "unknown",
        course: videoCourse,
      })

      // Reset form
      setVideoTitle("")
      setVideoDescription("")
      setVideoUrl("")
      setVideoThumbnail(null)
      setVideoCourse("")
    }
  }

  // Handle adding a new news item
  const handleAddNewsItem = () => {
    if (newsTitle && newsSummary && newsContent && newsCategory) {
      addNewsItem({
        title: newsTitle,
        date: new Date().toISOString().split("T")[0],
        summary: newsSummary,
        content: newsContent,
        category: newsCategory,
        image: newsImage,
      })

      // Reset form
      setNewsTitle("")
      setNewsSummary("")
      setNewsContent("")
      setNewsCategory("")
      setNewsImage(null)
    }
  }

  // Format date for display
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="pb-16 max-w-6xl mx-auto">
      <div className="p-4 sticky top-0 bg-background z-10 border-b">
        <h1 className="text-xl font-bold mb-1">Department Admin Panel</h1>
        <p className="text-sm text-muted-foreground">
          Logged in as {user?.email} ({user?.isSuperAdmin ? "Super Admin" : "Admin"})
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="px-4 pt-2">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="content">Content Management</TabsTrigger>
            <TabsTrigger value="admins" disabled={!user?.isSuperAdmin}>
              Admin Management
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="content" className="p-4 space-y-6">
          <Tabs defaultValue="notes" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="notes">
                <FileText className="h-4 w-4 mr-2" />
                Notes
              </TabsTrigger>
              <TabsTrigger value="videos">
                <Video className="h-4 w-4 mr-2" />
                Videos
              </TabsTrigger>
              <TabsTrigger value="news">
                <Newspaper className="h-4 w-4 mr-2" />
                News
              </TabsTrigger>
            </TabsList>

            {/* Lecture Notes Tab */}
            <TabsContent value="notes" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Add Lecture Note</CardTitle>
                  <CardDescription>Upload a new lecture note for students</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="note-title">Title</Label>
                    <Input
                      id="note-title"
                      placeholder="Introduction to Algorithms"
                      value={noteTitle}
                      onChange={(e) => setNoteTitle(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="note-description">Description</Label>
                    <Textarea
                      id="note-description"
                      placeholder="Brief description of the lecture note"
                      value={noteDescription}
                      onChange={(e) => setNoteDescription(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <FileUpload
                      accept=".pdf,.doc,.docx,.ppt,.pptx,.txt"
                      maxSize={10}
                      value={noteFileUrl}
                      onChange={setNoteFileUrl}
                      onFile={setNoteFile}
                      label="Upload Document"
                      description="Drag and drop a PDF, DOC, or PPT file, or click to browse"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="note-course">Course</Label>
                    <Select value={noteCourse} onValueChange={setNoteCourse}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a course" />
                      </SelectTrigger>
                      <SelectContent>
                        {courses.map((course) => (
                          <SelectItem key={course.id} value={course.id}>
                            {course.id}: {course.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={handleAddLectureNote}
                    disabled={!noteTitle || !noteDescription || !noteCourse || !noteFileUrl}
                  >
                    Add Lecture Note
                  </Button>
                </CardFooter>
              </Card>

              <h3 className="font-medium mt-6">Existing Lecture Notes</h3>
              <ScrollArea className="h-[300px] rounded-md border p-4">
                {lectureNotes.length > 0 ? (
                  <div className="space-y-4">
                    {lectureNotes.map((note) => (
                      <div key={note.id} className="flex items-start justify-between border-b pb-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{note.title}</h4>
                            <Badge variant="outline">{note.course}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{note.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Uploaded by {note.uploadedBy} on {formatDate(note.uploadedAt)}
                          </p>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => removeLectureNote(note.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground">No lecture notes available</p>
                )}
              </ScrollArea>
            </TabsContent>

            {/* Lecture Videos Tab */}
            <TabsContent value="videos" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Add Lecture Video</CardTitle>
                  <CardDescription>Upload a new lecture video for students</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="video-title">Title</Label>
                    <Input
                      id="video-title"
                      placeholder="Introduction to Machine Learning"
                      value={videoTitle}
                      onChange={(e) => setVideoTitle(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="video-description">Description</Label>
                    <Textarea
                      id="video-description"
                      placeholder="Brief description of the lecture video"
                      value={videoDescription}
                      onChange={(e) => setVideoDescription(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="video-url">Video URL</Label>
                    <Input
                      id="video-url"
                      placeholder="YouTube or other video URL"
                      value={videoUrl}
                      onChange={(e) => setVideoUrl(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <FileUpload
                      accept="image/*"
                      maxSize={5}
                      value={videoThumbnail}
                      onChange={setVideoThumbnail}
                      label="Upload Thumbnail"
                      description="Drag and drop an image, or click to browse"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="video-course">Course</Label>
                    <Select value={videoCourse} onValueChange={setVideoCourse}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a course" />
                      </SelectTrigger>
                      <SelectContent>
                        {courses.map((course) => (
                          <SelectItem key={course.id} value={course.id}>
                            {course.id}: {course.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={handleAddLectureVideo}
                    disabled={!videoTitle || !videoDescription || !videoUrl || !videoCourse}
                  >
                    Add Lecture Video
                  </Button>
                </CardFooter>
              </Card>

              <h3 className="font-medium mt-6">Existing Lecture Videos</h3>
              <ScrollArea className="h-[300px] rounded-md border p-4">
                {lectureVideos.length > 0 ? (
                  <div className="space-y-4">
                    {lectureVideos.map((video) => (
                      <div key={video.id} className="flex items-start justify-between border-b pb-4">
                        <div className="flex gap-3">
                          <img
                            src={video.thumbnailUrl || "/placeholder.svg"}
                            alt={video.title}
                            className="w-20 h-12 object-cover rounded"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium">{video.title}</h4>
                              <Badge variant="outline">{video.course}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{video.description}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Uploaded by {video.uploadedBy} on {formatDate(video.uploadedAt)}
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => removeLectureVideo(video.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground">No lecture videos available</p>
                )}
              </ScrollArea>
            </TabsContent>

            {/* News Tab */}
            <TabsContent value="news" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Add Department News or Announcement</CardTitle>
                  <CardDescription>Create a new news item or announcement</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="news-title">Title</Label>
                    <Input
                      id="news-title"
                      placeholder="New Research Grant Awarded"
                      value={newsTitle}
                      onChange={(e) => setNewsTitle(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="news-summary">Summary</Label>
                    <Input
                      id="news-summary"
                      placeholder="Brief summary of the news item"
                      value={newsSummary}
                      onChange={(e) => setNewsSummary(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="news-content">Content</Label>
                    <Textarea
                      id="news-content"
                      placeholder="Full content of the news item"
                      value={newsContent}
                      onChange={(e) => setNewsContent(e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="news-category">Category</Label>
                    <Select value={newsCategory} onValueChange={setNewsCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Research">Research</SelectItem>
                        <SelectItem value="Academic">Academic</SelectItem>
                        <SelectItem value="Event">Event</SelectItem>
                        <SelectItem value="Department">Department</SelectItem>
                        <SelectItem value="Student">Student</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <FileUpload
                      accept="image/*"
                      maxSize={5}
                      value={newsImage}
                      onChange={setNewsImage}
                      label="Upload Image (optional)"
                      description="Drag and drop an image, or click to browse"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={handleAddNewsItem}
                    disabled={!newsTitle || !newsSummary || !newsContent || !newsCategory}
                  >
                    Add News Item
                  </Button>
                </CardFooter>
              </Card>

              <h3 className="font-medium mt-6">Existing News Items</h3>
              <ScrollArea className="h-[300px] rounded-md border p-4">
                {newsItems.length > 0 ? (
                  <div className="space-y-4">
                    {newsItems.map((news) => (
                      <div key={news.id} className="flex items-start justify-between border-b pb-4">
                        <div className="flex gap-3">
                          {news.image && (
                            <img
                              src={news.image || "/placeholder.svg"}
                              alt={news.title}
                              className="w-20 h-12 object-cover rounded"
                            />
                          )}
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium">{news.title}</h4>
                              <Badge>{news.category}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{news.summary}</p>
                            <p className="text-xs text-muted-foreground mt-1">Posted on {news.date}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => removeNewsItem(news.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground">No news items available</p>
                )}
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </TabsContent>

        <TabsContent value="admins" className="p-4 space-y-6">
          {user?.isSuperAdmin ? (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Department Admin Management</CardTitle>
                  <CardDescription>Add or remove admin privileges</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Add New Department Admin</h3>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Email address"
                        value={newAdminEmail}
                        onChange={(e) => setNewAdminEmail(e.target.value)}
                      />
                      <Button onClick={handleAddAdmin} disabled={!newAdminEmail}>
                        <UserPlus className="h-4 w-4 mr-2" />
                        Add
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-medium">Remove Department Admin</h3>
                    <div className="flex gap-2">
                      <Select value={removeAdminEmail} onValueChange={setRemoveAdminEmail}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select admin to remove" />
                        </SelectTrigger>
                        <SelectContent>
                          {admins.map((admin) => (
                            <SelectItem key={admin} value={admin}>
                              {admin}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button variant="destructive" onClick={handleRemoveAdmin} disabled={!removeAdminEmail}>
                        <UserMinus className="h-4 w-4 mr-2" />
                        Remove
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <h3 className="font-medium mt-6">Current Department Admins</h3>
              <Card>
                <CardContent className="p-6">
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Badge variant="secondary">Super Admin</Badge>
                      <span>superadmin@cs.edu</span>
                    </li>
                    {admins.map((admin) => (
                      <li key={admin} className="flex items-center gap-2">
                        <Badge>Admin</Badge>
                        <span>{admin}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-[400px]">
              <Shield className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium">Access Restricted</h3>
              <p className="text-muted-foreground">Only super admins can manage admin privileges</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
