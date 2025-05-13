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
    name: "Prof Barik Alhassan",
    position: "Department HOD",
    specialization: "Artificial Intelligence",
    email: "abdulbasit16gmail.com",
    phone: "0208830950",
    office: "Silver Jublee, Office N0 14",
    bio: "Dr. Johnson has been with the department since 2005. Her research focuses on machine learning algorithms and their applications in healthcare. She has published over 50 papers in top-tier conferences and journals.",
    courses: ["CS510", "CS520"],
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 2,
    name: "Dr Tandoh Lawrence",
    position: "Associate Professor",
    specialization: "Computer Networks",
    email: "mchen@university.edu",
    phone: "(123) 456-7891",
    office: "Science Building, Room 310",
    bio: "Prof. Chen specializes in network security and distributed systems. He leads the Network Security Lab and has received multiple grants from NSF and DARPA.",
    courses: ["CS330", "CS530"],
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 3,
    name: "Mr Francis Saaditoh",
    position: "Lecturer",
    specialization: "Human-Computer Interaction",
    email: "francissaaditoh@gmail.com",
    phone: "(123) 456-7892",
    office: "Science Building, Room 315",
    bio: "Dr. Rodriguez joined the department in 2018. Her research focuses on designing accessible interfaces and studying user behavior in virtual environments.",
    courses: ["CS101", "CS401"],
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 4,
    name: "Dr. Abdul Hafiz",
    position: "Professor",
    specialization: "Web Development",
    email: "abdulhafiz99888@gmail.com",
    phone: "(123) 456-7893",
    office: "Science Building, Room 320",
    bio: "Dr. Wilson is an expert in database management systems and data mining. He has authored three textbooks on database design and has extensive industry experience.",
    courses: ["CS310", "CS410"],
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 5,
    name: "Dr. Lisa Park",
    position: "Assistant Professor",
    specialization: "Cybersecurity",
    email: "lpark@university.edu",
    phone: "(123) 456-7894",
    office: "Science Building, Room 325",
    bio: "Dr. Park's research focuses on system security, malware analysis, and privacy-preserving computation. She leads the Cybersecurity Lab and collaborates with industry partners on security solutions.",
    courses: ["CS340", "CS540"],
    image: "/placeholder.svg?height=200&width=200",
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
        <h1 className="text-xl font-bold mb-3">Department Stuff</h1>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search faculty..."
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
