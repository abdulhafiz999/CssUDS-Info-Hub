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
    id: "CS101",
    code: "",
    title: "Bsc Computer Science",
    description:
      "An introduction to the basic concepts of computer science, including algorithms, programming, and computer organization.",
    prerequisites: [],
    semester: "",
  },
  {
    id: "CS201",
    code: "",
    title: "Diploma Computer Science",
    credits: 4,
    description:
      "Study of data structures and algorithms fundamental to computer science; abstract data-type concepts; stacks, queues, linked lists, trees, and graphs.",
    prerequisites: [""],
    semester: "",
  },
   
]

const graduateCourses = [
  {
    "id": "CS101",
    "code": "",
    "title": "Msc Computer Science",
    "credits": 3,
    "description": "Focuses on core areas of advanced computer science including algorithm design, system optimization, and research methods tailored for MSc-level students.",
    "prerequisites": [""],
    "semester": ""
  },
  {
    "id": "cs510",
    "code": "",
    "title": "PGD Computer Science",
    "credits": 3,
    "description": "Covers foundational computer science topics for postgraduate diploma students, such as programming, data structures, databases, and software engineering principles.",
    "prerequisites": [""],
    "semester": ""
  },
  {
    "id": "cs520",
    "code": "",
    "title": "MPhil Computer Science",
    "credits": 3,
    "description": "Emphasizes research-oriented learning in computer science with topics in computational theory, machine intelligence, and academic writing for scholarly publishing.",
    "prerequisites": [""],
    "semester": ""
  },
  {
    "id": "cs530",
    "code": "",
    "title": "PhD Computer Science",
    "credits": 3,
    "description": "Designed for doctoral candidates, this course explores cutting-edge areas in computer science, including deep research methodologies, innovation in AI, and dissertation development.",
    "prerequisites": [""],
    "semester": ""
  }
]


export default function ProgramsOffered() {
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
        <h1 className="text-xl font-bold mb-3">Programmes Offered</h1>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search programmes...."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs value={courseLevel} onValueChange={setCourseLevel} className="w-full">
        <div className="px-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="undergraduate">UNDERGRADUATE</TabsTrigger>
            <TabsTrigger value="graduate">POSTGRADUATE</TabsTrigger>
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
                          <span className="font-mono text-sm">.</span>
                          <Badge variant="outline"></Badge>
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
                              <span className="text-xs text-muted-foreground"></span>
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
                <p className="text-center py-8 text-muted-foreground">No programmes found matching your search</p>
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
                          <span className="font-mono text-sm"></span>
                          <Badge variant="outline"></Badge>
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
                              <span className="text-xs text-muted-foreground">.</span>
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
