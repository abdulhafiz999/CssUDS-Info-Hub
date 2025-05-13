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
    title: "New AI Research Lab Opening",
    date: "2023-05-15",
    summary: "The department is proud to announce the opening of our new AI Research Laboratory.",
    content:
      "The Department of Computer Science is excited to announce the opening of our new Artificial Intelligence Research Laboratory. The lab will focus on cutting-edge research in machine learning, computer vision, and natural language processing. The lab is equipped with state-of-the-art computing resources, including a cluster of GPUs for deep learning research. Faculty and graduate students interested in using the lab facilities should contact Dr. Sarah Johnson for more information.",
    category: "Research",
    image: "/placeholder.svg?height=300&width=600",
  },
  {
    id: 2,
    title: "Guest Lecture: Ethical Implications of AI",
    date: "2023-05-20",
    summary: "Join us for a special guest lecture on the ethical implications of artificial intelligence.",
    content:
      "The Department of Computer Science is pleased to host Dr. Maria Rodriguez from Stanford University for a special guest lecture on 'The Ethical Implications of Artificial Intelligence in Society.' The lecture will cover topics such as algorithmic bias, privacy concerns, and the social impact of AI technologies. The event will take place on May 20, 2023, at 3:00 PM in the Science Building Auditorium. All students and faculty are encouraged to attend. A Q&A session will follow the lecture.",
    category: "Event",
    image: "/placeholder.svg?height=300&width=600",
  },
  {
    id: 3,
    title: "Fall 2023 Course Registration Now Open",
    date: "2023-04-10",
    summary: "Registration for Fall 2023 courses is now open for all computer science students.",
    content:
      "Registration for Fall 2023 courses is now open for all computer science students. Please log in to the student portal to view available courses and register. Priority registration is available for seniors and graduate students until April 20. All other students can register starting April 21. The department is offering several new courses this semester, including CS450: Cloud Computing and CS560: Deep Learning. Please consult with your academic advisor if you have any questions about course selection or degree requirements.",
    category: "Academic",
    image: null,
  },
  {
    id: 4,
    title: "Undergraduate Research Symposium",
    date: "2023-06-05",
    summary: "Showcase your research at the annual Undergraduate Research Symposium.",
    content:
      "The Department of Computer Science invites undergraduate students to participate in the annual Undergraduate Research Symposium. This is an excellent opportunity to showcase your research projects and receive feedback from faculty and peers. The symposium will take place on June 5, 2023, from 10:00 AM to 4:00 PM in the Science Building. Students interested in presenting should submit an abstract by May 15. Prizes will be awarded for the best presentations in various categories. For more information, please contact the undergraduate program coordinator.",
    category: "Event",
    image: "/placeholder.svg?height=300&width=600",
  },
  {
    id: 5,
    title: "New Faculty Member Joins Department",
    date: "2023-03-01",
    summary: "The department welcomes Dr. Alex Kim, an expert in cybersecurity.",
    content:
      "The Department of Computer Science is pleased to welcome Dr. Alex Kim to our faculty. Dr. Kim joins us from MIT, where he completed his postdoctoral research in cybersecurity and privacy-preserving computation. He will be teaching CS340: Introduction to Cybersecurity and CS540: Advanced Network Security starting in the Fall 2023 semester. Dr. Kim's research focuses on developing secure systems for critical infrastructure and exploring new methods for privacy-preserving data analysis. Students interested in these areas are encouraged to reach out to Dr. Kim to discuss research opportunities.",
    category: "Department",
    image: "/placeholder.svg?height=300&width=600",
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
