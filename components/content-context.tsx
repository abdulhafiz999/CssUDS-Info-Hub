"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"
import { useToast } from "@/hooks/use-toast"

// Define content types
export type LectureNote = {
  id: string
  title: string
  description: string
  fileUrl: string
  fileType: string
  uploadedBy: string
  uploadedAt: Date
  course: string
}

export type LectureVideo = {
  id: string
  title: string
  description: string
  videoUrl: string
  thumbnailUrl: string
  uploadedBy: string
  uploadedAt: Date
  course: string
}

export type NewsItem = {
  id: number
  title: string
  date: string
  summary: string
  content: string
  category: string
  image: string | null
}

// Define the ContentContext type
type ContentContextType = {
  lectureNotes: LectureNote[]
  lectureVideos: LectureVideo[]
  newsItems: NewsItem[]
  addLectureNote: (note: Omit<LectureNote, "id" | "uploadedAt">) => void
  addLectureVideo: (video: Omit<LectureVideo, "id" | "uploadedAt">) => void
  addNewsItem: (news: Omit<NewsItem, "id">) => void
  removeLectureNote: (id: string) => void
  removeLectureVideo: (id: string) => void
  removeNewsItem: (id: number) => void
}

// Sample news data
const initialNewsItems: NewsItem[] = [
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
]

// Sample lecture notes
const initialLectureNotes: LectureNote[] = [
  {
    id: "1",
    title: "Introduction to Algorithms",
    description: "Fundamental concepts of algorithm design and analysis",
    fileUrl: "/placeholder.svg",
    fileType: "pdf",
    uploadedBy: "admin@cs.edu",
    uploadedAt: new Date("2023-01-15"),
    course: "CS301",
  },
  {
    id: "2",
    title: "Data Structures Overview",
    description: "Comprehensive guide to common data structures",
    fileUrl: "/placeholder.svg",
    fileType: "pdf",
    uploadedBy: "admin@cs.edu",
    uploadedAt: new Date("2023-02-10"),
    course: "CS201",
  },
]

// Sample lecture videos
const initialLectureVideos: LectureVideo[] = [
  {
    id: "1",
    title: "Machine Learning Fundamentals",
    description: "Introduction to basic machine learning concepts",
    videoUrl: "https://www.youtube.com/watch?v=example1",
    thumbnailUrl: "/placeholder.svg?height=200&width=300",
    uploadedBy: "admin@cs.edu",
    uploadedAt: new Date("2023-03-05"),
    course: "CS510",
  },
  {
    id: "2",
    title: "Web Development with React",
    description: "Building modern web applications with React",
    videoUrl: "https://www.youtube.com/watch?v=example2",
    thumbnailUrl: "/placeholder.svg?height=200&width=300",
    uploadedBy: "admin@cs.edu",
    uploadedAt: new Date("2023-04-12"),
    course: "CS410",
  },
]

// Create the context
const ContentContext = createContext<ContentContextType | undefined>(undefined)

// Content Provider component
export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [lectureNotes, setLectureNotes] = useState<LectureNote[]>(initialLectureNotes)
  const [lectureVideos, setLectureVideos] = useState<LectureVideo[]>(initialLectureVideos)
  const [newsItems, setNewsItems] = useState<NewsItem[]>(initialNewsItems)
  const { toast } = useToast()

  // Add lecture note
  const addLectureNote = (note: Omit<LectureNote, "id" | "uploadedAt">) => {
    const newNote: LectureNote = {
      ...note,
      id: Date.now().toString(),
      uploadedAt: new Date(),
    }
    setLectureNotes((prev) => [newNote, ...prev])

    // Show notification
    toast({
      title: "New Lecture Note Added",
      description: `${newNote.title} has been added to ${newNote.course}`,
    })
  }

  // Add lecture video
  const addLectureVideo = (video: Omit<LectureVideo, "id" | "uploadedAt">) => {
    const newVideo: LectureVideo = {
      ...video,
      id: Date.now().toString(),
      uploadedAt: new Date(),
    }
    setLectureVideos((prev) => [newVideo, ...prev])

    // Show notification
    toast({
      title: "New Lecture Video Added",
      description: `${newVideo.title} has been added to ${newVideo.course}`,
    })
  }

  // Add news item
  const addNewsItem = (news: Omit<NewsItem, "id">) => {
    const newNews: NewsItem = {
      ...news,
      id: Date.now(),
    }
    setNewsItems((prev) => [newNews, ...prev])

    // Show notification
    toast({
      title: "New Announcement",
      description: `${newNews.title} has been posted`,
    })
  }

  // Remove lecture note
  const removeLectureNote = (id: string) => {
    setLectureNotes((prev) => prev.filter((note) => note.id !== id))
    toast({
      title: "Lecture Note Removed",
      description: "The lecture note has been removed",
    })
  }

  // Remove lecture video
  const removeLectureVideo = (id: string) => {
    setLectureVideos((prev) => prev.filter((video) => video.id !== id))
    toast({
      title: "Lecture Video Removed",
      description: "The lecture video has been removed",
    })
  }

  // Remove news item
  const removeNewsItem = (id: number) => {
    setNewsItems((prev) => prev.filter((news) => news.id !== id))
    toast({
      title: "News Item Removed",
      description: "The news item has been removed",
    })
  }

  // Create the context value
  const value = {
    lectureNotes,
    lectureVideos,
    newsItems,
    addLectureNote,
    addLectureVideo,
    addNewsItem,
    removeLectureNote,
    removeLectureVideo,
    removeNewsItem,
  }

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
}

// Custom hook to use the content context
export function useContent() {
  const context = useContext(ContentContext)
  if (context === undefined) {
    throw new Error("useContent must be used within a ContentProvider")
  }
  return context
}
