import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

export default function DepartmentProfile() {
  return (
    <div className="pb-16 max-w-6xl mx-auto">
      <div className="relative h-48 md:h-64 w-full">
        <Image src="/css.jpg?height=400&width=800" alt="Department Building" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h1 className="text-2xl md:text-3xl font-bold text-blue drop-shadow-md">Department of Computer Science</h1>
        </div>
      </div>

      <div className="p-4 md:p-6 space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-2">About Us</h2>
          <p className="text-muted-foreground">
            The Department of Computer Science is dedicated to excellence in teaching, research, and service.
            Established in 2023, we have grown to become one of the biggest department on campus.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Our Mission</h2>
          <p className="text-muted-foreground">
            To educate and inspire the next generation of computer scientists and to conduct research that advances the
            field of computing.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Department Highlights</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Card>
              <CardContent className="p-3 text-center">
                <h3 className="text-3xl font-bold text-primary">20+</h3>
                <p className="text-xs text-muted-foreground">Department Members</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3 text-center">
                <h3 className="text-3xl font-bold text-primary">500+</h3>
                <p className="text-xs text-muted-foreground">Students</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3 text-center">
                <h3 className="text-3xl font-bold text-primary">100+</h3>
                <p className="text-xs text-muted-foreground">Research Papers</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3 text-center">
                <h3 className="text-3xl font-bold text-primary">15+</h3>
                <p className="text-xs text-muted-foreground">Industry Partners</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Research Areas</h2>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" className="rounded-full" size="sm">
              Artificial Intelligence
            </Button>
            <Button variant="outline" className="rounded-full" size="sm">
              Machine Learning
            </Button>
            <Button variant="outline" className="rounded-full" size="sm">
              Cybersecurity
            </Button>
            <Button variant="outline" className="rounded-full" size="sm">
              Data Science
            </Button>
            <Button variant="outline" className="rounded-full" size="sm">
              Computer Vision
            </Button>
            <Button variant="outline" className="rounded-full" size="sm">
              Human-Computer Interaction
            </Button>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
          <address className="not-italic text-muted-foreground">
            <p>Department of Computer Science</p>
            <p id="map"><a href="https://www.google.com/maps/place/Lecturers'+Office/@9.4138777,-0.9853194,269m/data=!3m1!1e3!4m6!3m5!1s0xfd411a2f1ce3269:0x29ff5e052408ca51!8m2!3d9.4135956!4d-0.9861927!16s%2Fg%2F11q9s5_t74?entry=ttu&g_ep=EgoyMDI1MDUwNy4wIKXMDSoASAFQAw%3D%3D" target="_blank" >ICT block top floor</a></p>
            <p id="email"><a href="mailto:cssudsnyc@gmail.com">cssudsnyc@gmail.com</a></p>
            <p>Phone: +233(0)37209948</p>
          </address>
        </section>
      </div>
    </div>
  )
}
