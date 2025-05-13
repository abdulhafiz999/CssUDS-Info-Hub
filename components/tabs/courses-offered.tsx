"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"

// Sample course data
const undergraduateCourses = [
  {
    id: "cs101",
    code: "CS101",
    title: "Introduction to Computer Science",
    credits: 3,
    description:
      "An introduction to the basic concepts of computer science, including algorithms, programming, and computer organization.",
    prerequisites: [],
    semester: "Fall",
  },
  {
    id: "cs201",
    code: "CS201",
    title: "Data Structures",
    credits: 4,
    description:
      "Study of data structures and algorithms fundamental to computer science; abstract data-type concepts; stacks, queues, linked lists, trees, and graphs.",
    prerequisites: ["CS101"],
    semester: "Spring",
  },
  {
    id: "cs301",
    code: "CS301",
    title: "Algorithms",
    credits: 3,
    description:
      "Design and analysis of algorithms. Algorithm design techniques, including divide-and-conquer, greedy algorithms, and dynamic programming.",
    prerequisites: ["CS201"],
    semester: "Fall",
  },
  {
    id: "cs310",
    code: "CS310",
    title: "Database Systems",
    credits: 3,
    description:
      "Introduction to database systems concepts. Database design and normalization. Database models: relational, hierarchical, and network.",
    prerequisites: ["CS201"],
    semester: "Spring",
  },
  {
    id: "cs330",
    code: "CS330",
    title: "Computer Networks",
    credits: 3,
    description:
      "Introduction to computer networks and network protocols. Topics include network architectures, protocols, and routing algorithms.",
    prerequisites: ["CS201"],
    semester: "Fall",
  },
]

const graduateCourses = [
  {
    id: "cs501",
    code: "CS501",
    title: "Advanced Algorithms",
    credits: 3,
    description:
      "Advanced techniques for designing and analyzing algorithms, including amortized analysis, randomized algorithms, and approximation algorithms.",
    prerequisites: ["CS301"],
    semester: "Fall",
  },
  {
    id: "cs510",
    code: "CS510",
    title: "Machine Learning",
    credits: 3,
    description:
      "Introduction to machine learning concepts and algorithms. Topics include supervised learning, unsupervised learning, and reinforcement learning.",
    prerequisites: ["CS301"],
    semester: "Spring",
  },
  {
    id: "cs520",
    code: "CS520",
    title: "Artificial Intelligence",
    credits: 3,
    description:
      "Introduction to artificial intelligence concepts and techniques. Topics include search, knowledge representation, and reasoning.",
    prerequisites: ["CS301"],
    semester: "Fall",
  },
  {
    id: "cs530",
    code: "CS530",
    title: "Computer Vision",
    credits: 3,
    description:
      "Introduction to computer vision concepts and techniques. Topics include image processing, feature extraction, and object recognition.",
    prerequisites: ["CS510"],
    semester: "Spring",
  },
]

export default function CoursesOffered() {
  const [searchQuery, setSearchQuery] = useState("")
  const [courseLevel, setCourseLevel] = useState("undergraduate")

  const filteredUndergrad = undergraduateCourses.filter(
    (course) =>
      course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.title.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredGrad = graduateCourses.filter(
    (course) =>
      course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.title.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="pb-16">
      <div className="p-4 sticky top-0 bg-background z-10 border-b">
        <h1 className="text-xl font-bold mb-3">Courses Offered</h1>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search courses..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs value={courseLevel} onValueChange={setCourseLevel} className="w-full">
        <div className="px-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="undergraduate">Undergraduate</TabsTrigger>
            <TabsTrigger value="graduate">Graduate</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="undergraduate" className="m-0">
          <div className="p-4">
            <Accordion type="single" collapsible className="w-full">
              {filteredUndergrad.length > 0 ? (
                filteredUndergrad.map((course) => (
                  <AccordionItem key={course.id} value={course.id}>
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex flex-col items-start text-left">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm">{course.code}</span>
                          <Badge variant="outline">{course.credits} Credits</Badge>
                        </div>
                        <span className="font-medium">{course.title}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 text-sm">
                        <p>{course.description}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <Badge variant="secondary">{course.semester}</Badge>
                          {course.prerequisites.length > 0 && (
                            <div className="flex items-center gap-1">
                              <span className="text-xs text-muted-foreground">Prerequisites:</span>
                              {course.prerequisites.map((prereq) => (
                                <Badge key={prereq} variant="outline" className="text-xs">
                                  {prereq}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))
              ) : (
                <p className="text-center py-8 text-muted-foreground">No courses found matching your search.</p>
              )}
            </Accordion>
          </div>
        </TabsContent>

        <TabsContent value="graduate" className="m-0">
          <div className="p-4">
            <Accordion type="single" collapsible className="w-full">
              {filteredGrad.length > 0 ? (
                filteredGrad.map((course) => (
                  <AccordionItem key={course.id} value={course.id}>
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex flex-col items-start text-left">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm">{course.code}</span>
                          <Badge variant="outline">{course.credits} Credits</Badge>
                        </div>
                        <span className="font-medium">{course.title}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 text-sm">
                        <p>{course.description}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <Badge variant="secondary">{course.semester}</Badge>
                          {course.prerequisites.length > 0 && (
                            <div className="flex items-center gap-1">
                              <span className="text-xs text-muted-foreground">Prerequisites:</span>
                              {course.prerequisites.map((prereq) => (
                                <Badge key={prereq} variant="outline" className="text-xs">
                                  {prereq}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))
              ) : (
                <p className="text-center py-8 text-muted-foreground">No courses found matching your search.</p>
              )}
            </Accordion>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
