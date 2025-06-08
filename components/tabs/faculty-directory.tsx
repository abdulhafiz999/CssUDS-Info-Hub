"use client"

import { useState } from "react"
import { Search, Mail, Phone } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Sample faculty data
const facultyData = [
  {
    id: 1,
    name: "PROF ALHASSAN ABDUL-BARIK",
    position: "Department HOD",
    specialization: "Artificial Intelligence",
    email: "barikalhassan@gmail.com",
    phone: "0208830950",
    office: "ICT block office NO 13",
    bio: "Prof Barik Alhassan is a senior lecturer in the unversity of Development. He is the current head of the department of computer science. He has a PhD in Artificial Intelligence and has published numerous papers in the field.",
    courses: ["CS510", "CS520"],
    image: "/hod.jpg?height=200&width=200",
  },
  {
    id: 2,
    name: "DR ALHASSAN SALAMUDEEN",
    position: "Snr Lecturer",
    specialization: "Software Developing",
    email: "alhassaansalamudeen@gmail.com",
    phone: "+233246019897",
    office: "Science Building, Room 310",
    bio: "Dr Salamudeen is a  Snr lecturer in the Department of Computer Science with a focus on software development and programming languages. He has extensive experience in software engineering and has worked on various projects in the industry.",
    courses: ["CSC330", "CS530"],
    image: "/salamudeen.jpeg?height=200&width=200",
  },
  {
    id: 3,
    name: "Mr Francis Saaditoh",
    position: "Lecturer",
    specialization: "Human-Computer Interaction",
    email: "francissaaditoh@gmail.com",
    phone: "+233 244944304",
    office: "Science Building, Room 315",
    bio: "Mr. Saaditoh is a lecturer in the Department of Computer Science with a focus on human-computer interaction and user experience design. He has published several papers on usability testing and user-centered design.",
    courses: ["CS101", "CS401"],
    image: "/saaditoh.jpg?height=200&width=200&width=100%",
  },
  {
    id: 4,
    name: "DR TANDOH LAWRENCE",
    position: "Exams Officer",
    specialization: "Programming Fundamentals",
    email: "tandohlawrence@gmail.com",
    phone: "(123) 456-7894",
    office: "Science Building, Room 325",
    bio: "Dr. Tandoh specializes in programming languages and software engineering. He has worked on several open-source projects and is a contributor to the Python community.",
    courses: ["CS340", "CS540"],
    image: "/tando.jpg?height=200&width=200",
  },
  {
    id: 5,
    name: "Mr Baako Alhassan Mohammed",
    position: "Assistant Lecturer",
    specialization: "Fullstack Software Engineer",
    email: "baakoalhassan@gmail.com",
    phone: "+233246547510",
    office: "ICT blcok, top floor office No 12",
    bio: "Mr Baako is a fullstack software engineer with expertise in web development and cloud computing. He has worked on various projects involving React, Node.js, and AWS.",
    courses: ["CSC251", "CSC240"],
    image: "/baako.jpeg?height=200&width=200",
  },
    {
    id: 6,
    name: "Mr Abdul-Wakil Yakubu Iddrisu",
    position: "Assistant Lecturer",
    specialization: "Networking",
    email: "abdul-Wakilnyaba@gmail.com",
    phone: "+233 248137800",
    office: "ICT block office NO 13 ",
    bio: "Mr Wakiil is an Assistant Lecturer in the Department of Computer Science with a focus on computer networking and cybersecurity. He has experience in network design and implementation, as well as security protocols.",
    courses: ["CS310", "CSC306"],
    image: "/wakil.jpg?height=200&width=200",
  },
]

export default function FacultyDirectory() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFaculty, setSelectedFaculty] = useState<(typeof facultyData)[0] | null>(null)

  const filteredFaculty = facultyData.filter(
    (faculty) =>
      faculty.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faculty.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faculty.position.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="pb-16">
      <div className="p-4 sticky top-0 bg-background z-10 border-b">
        <h1 className="text-xl font-bold mb-3">Department Staff</h1>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search Lecturer..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="p-4 grid gap-4">
        {filteredFaculty.length > 0 ? (
          filteredFaculty.map((faculty) => (
            <Card key={faculty.id} className="overflow-hidden">
              <CardHeader className="p-4 pb-0">
                <div className="flex items-start gap-4">
                  <Avatar className="h-16 w-16 border">
                    <AvatarImage src={faculty.image || "/placeholder.svg"} alt={faculty.name} />
                    <AvatarFallback>
                      {faculty.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>{faculty.name}</CardTitle>
                    <CardDescription>{faculty.position}</CardDescription>
                    <Badge variant="outline" className="mt-1">
                      {faculty.specialization}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-2">
                <div className="text-sm space-y-1 text-muted-foreground">
                  <p className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    {faculty.email}
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    {faculty.phone}
                  </p>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button variant="outline" size="sm" className="w-full" onClick={() => setSelectedFaculty(faculty)}>
                  View Profile
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <p className="text-center py-8 text-muted-foreground">No faculty found matching your search.</p>
        )}
      </div>

      <Dialog open={!!selectedFaculty} onOpenChange={(open) => !open && setSelectedFaculty(null)}>
        {selectedFaculty && (
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{selectedFaculty.name}</DialogTitle>
              <DialogDescription>{selectedFaculty.position}</DialogDescription>
            </DialogHeader>
            <div className="flex flex-col items-center gap-4">
              <Avatar className="h-24 w-24 border">
                <AvatarImage src={selectedFaculty.image || "/placeholder.svg"} alt={selectedFaculty.name} />
                <AvatarFallback>
                  {selectedFaculty.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <div className="space-y-4 w-full">
                <div>
                  <h3 className="text-sm font-medium">Specialization</h3>
                  <p className="text-sm text-muted-foreground">{selectedFaculty.specialization}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium">Contact Information</h3>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      {selectedFaculty.email}
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      {selectedFaculty.phone}
                    </p>
                    <p>Office: {selectedFaculty.office}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium">Biography</h3>
                  <p className="text-sm text-muted-foreground">{selectedFaculty.bio}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium">Courses Taught</h3>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {selectedFaculty.courses.map((course) => (
                      <Badge key={course} variant="secondary">
                        {course}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}
