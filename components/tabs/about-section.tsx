"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Sample gallery images
const galleryImages = [
  {
    id: 1,
    src: "/department.jpg?height=400&width=600",
    alt: "Department Building",
    description: "Department of Computer Science Building",
  },
  {
    id: 2,
    src: "/computer lab.jpeg?height=400&width=600",
    alt: "Computer Lab",
    description: "Our state-of-the-art computer lab with the latest hardware and software",
  },
  {
    id: 3,
    src: "/pic4.jpeg?height=400&width=600",
    alt: "Student Hackathon",
    description: "Students participating in our annual hackathon event",
  },
  {
    id: 4,
    src: "/football.jpg?height=400&width=600",
    alt: "Inter Level Football Match",
    description: "An inter-level football match between students of the department",
  },
  {
    id: 5,
    src: "/graduation.jpg?height=400&width=600",
    alt: "GRADUATION 20225",
    description: "Computer Science graduates at the 2022 commencement ceremony",
  },
  {
    id: 6,
    src: "/111.jpg?height=400&width=600",
    alt: "OPEN Forum",
    description: "An open forum with students and faculty members discussing important issues",
  },
  {
    id: 7,
    src: "/css-HANDING-over.jpg?height=400&width=600",
    alt: "CSS HANDING OVER",
    description: "The Computer Science Society handing over leadership to the new executive team",
  },
   {
    id: 8,
    src: "/CSS-WIN.jpg?height=400&width=600",
    alt: "CSS won the inter-departmental football match",
    description: "The Computer Science Society won the inter-departmental football match",
   },
]

export default function AboutSection() {
  const [selectedImage, setSelectedImage] = useState<(typeof galleryImages)[0] | null>(null)
  const [activeTab, setActiveTab] = useState("history")

  return (
    <div className="pb-16 max-w-6xl mx-auto">
      <div className="relative h-48 md:h-64 w-full">
        <img
          src="/department.jpg?height=400&width=800"
          alt="Department Building"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h1 className="text-2xl md:text-3xl font-bold text-blue drop-shadow-md">About Our Department</h1>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="px-4 pt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="history" className="p-4 md:p-6 space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-2">Our History</h2>
            <p className="text-muted-foreground">
              The Department of Computer Science was established in 2023 as part of the university's initiative to
              expand its science and technology programs. What began as a small department with just four department
              Staff and 90 students has grown into one of the leading computer science departments in the country.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Key Milestones</h2>
            <ul className="space-y-4">
              <li className="border-l-2 border-primary pl-4 py-1">
                <h3 className="font-medium">2023</h3>
                <p className="text-sm text-muted-foreground">Department of Computer Science established</p>
              </li>
              <li className="border-l-2 border-primary pl-4 py-1">
                <h3 className="font-medium">2024</h3>
                <p className="text-sm text-muted-foreground">First postgraduate program launched</p>
              </li>
              <li className="border-l-2 border-primary pl-4 py-1">
                <h3 className="font-medium">2024</h3>
                <p className="text-sm text-muted-foreground">Diploma in Computer Science was introduced</p>
              </li>
              <li className="border-l-2 border-primary pl-4 py-1">
                <h3 className="font-medium">2025</h3>
                <p className="text-sm text-muted-foreground">First batch of graduates</p>
              </li>
               
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Our Vision</h2>
            <p className="text-muted-foreground">
              Our Vision be a globally recognized center of excellence in computer science education and research, producing
              graduates who lead technological innovation and contribute to solving society's most pressing challenges.
            </p>
          </section>
        </TabsContent>

        <TabsContent value="gallery" className="p-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((image) => (
              <div key={image.id} className="flip-card" onClick={() => setSelectedImage(image)}>
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <img src={image.src || "/placeholder.svg"} alt={image.alt} className="w-full h-full object-cover" />
                  </div>
                  <div className="flip-card-back">
                    <p className="text-sm font-medium">{image.alt}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
        {selectedImage && (
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>{selectedImage.alt}</DialogTitle>
              <DialogDescription>{selectedImage.description}</DialogDescription>
            </DialogHeader>
            <div className="w-full overflow-hidden rounded-md">
              <img
                src={selectedImage.src || "/placeholder.svg"}
                alt={selectedImage.alt}
                className="w-full h-auto object-contain"
              />
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}
