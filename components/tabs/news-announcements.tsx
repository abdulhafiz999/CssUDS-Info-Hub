"use client"

import { useState } from "react"
import { Calendar, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Sample news data
const newsData = [
  {
    id: 1,
    title: "End of Semester Exams Begin Monday",
    date: "2023-05-15",
    summary: "End of semester exams are scheduled to begin this coming Monday. Students are advised to prepare accordingly.",
    content:
      "The Department of Computer Science wishes to remind all students that end of semester examinations will commence on Monday, May 20, 2025. Students are expected to check the official exam timetable posted on the departmental notice board and online portal. All are advised to adhere strictly to exam rules and come with their valid student ID cards. Best of luck to everyone!",
    category: "Academic",
    image: "/exams.png?height=300&width=600",
  },
  {
    id: 2,
    title: "Web Development Training Program Announced",
    date: "2025-06-03",
    summary: "A hands-on web development training program has been scheduled for students eager to build real-world applications.",
    content:
      "The Department of Computer Science is excited to announce a Web Development Training Program starting on June 3, 2025. This 3-week hands-on training will cover HTML, CSS, JavaScript, Git, and building responsive web apps. No prior experience is needed—ideal for beginners and intermediate learners. Sessions will be held in the Computer Lab every Tuesday and Thursday from 4:00 PM to 6:30 PM. Certificates and internship opportunities will be offered to top-performing participants. Registration is open on the department's portal.",
    category: "Training",
    image: "/webdev.jpg?height=300&width=600", // Replace with actual image path
  },
  {
    id: 7,
  title: "GitHub Training Series for All CS Students",
  date: "2025-05-15",
  summary: "The department is organizing a hands-on GitHub training series for students at all levels.",
  content:
    "To enhance students' practical skills in version control and collaboration, the Department of Computer Science is launching a GitHub Training Series starting May 15, 2025. The sessions will cover git basics, collaboration workflows, and working on open-source projects. Interested students are required to register via the department portal. Certificates will be awarded after successful completion.",
  category: "Training",
  image: "/github.jpeg?height=300&width=600", // Replace with actual image path
  },
  {
    id: 4,
    title: "Undergraduate Research Symposium",
    date: "2023-06-05",
    summary: "Showcase your research at the annual Undergraduate Research Symposium.",
    content:
      "The Department of Computer Science invites undergraduate students to participate in the annual Undergraduate Research Symposium. This is an excellent opportunity to showcase your research projects and receive feedback from faculty and peers. The symposium will take place on June 5, 2023, from 10:00 AM to 4:00 PM in the Science Building. Students interested in presenting should submit an abstract by May 15. Prizes will be awarded for the best presentations in various categories. For more information, please contact the undergraduate program coordinator.",
    category: "Event",
    image: "/research.jpg?height=300&width=600",
  },
  {
    id: 5,
    title: "Open Forum with Department Executives",
    date: "2025-05-13",
    summary: "An open forum will be held to discuss lecture quality, portal issues, and final year project ideas.",
    content:
      "The Department of Computer Science invites all students to an Open Forum on May 28, 2025, at 1:00 PM in the ICT Conference Room. This interactive session will cover several key issues raised by students, including lecture delivery challenges, unresolved portal errors, and ideas for final year project work. Department executives and faculty members will be present to respond to concerns, gather feedback, and provide support. Your voice matters—don’t miss this opportunity to shape the future of the department.",
    category: "Department",
    image: "/open.jpg?height=300&width=600",
  },
]

export default function NewsAnnouncements() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedNews, setSelectedNews] = useState<(typeof newsData)[0] | null>(null)

  const filteredNews = newsData
    .filter(
      (news) =>
        news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        news.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        news.category.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <div className="pb-16">
      <div className="p-4 sticky top-0 bg-background z-10 border-b">
        <h1 className="text-xl font-bold mb-3">News & Announcements</h1>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search news..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="p-4 grid gap-4">
        {filteredNews.length > 0 ? (
          filteredNews.map((news) => (
            <Card key={news.id} className="overflow-hidden">
              {news.image && (
                <div className="relative h-40 w-full">
                  <img src={news.image || "/placeholder.svg"} alt={news.title} className="object-cover w-full h-full" />
                </div>
              )}
              <CardHeader className={news.image ? "pt-3" : ""}>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{news.title}</CardTitle>
                    <CardDescription className="flex items-center gap-1 mt-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(news.date)}
                    </CardDescription>
                  </div>
                  <Badge>{news.category}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{news.summary}</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full" onClick={() => setSelectedNews(news)}>
                  Read More
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <p className="text-center py-8 text-muted-foreground">No news found matching your search.</p>
        )}
      </div>

      <Dialog open={!!selectedNews} onOpenChange={(open) => !open && setSelectedNews(null)}>
        {selectedNews && (
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{selectedNews.title}</DialogTitle>
              <DialogDescription className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {formatDate(selectedNews.date)}
                <Badge className="ml-2">{selectedNews.category}</Badge>
              </DialogDescription>
            </DialogHeader>
            {selectedNews.image && (
              <div className="relative h-40 w-full rounded-md overflow-hidden">
                <img
                  src={selectedNews.image || "/placeholder.svg"}
                  alt={selectedNews.title}
                  className="object-cover w-full h-full"
                />
              </div>
            )}
            <div className="text-sm">
              <p>{selectedNews.content}</p>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}
