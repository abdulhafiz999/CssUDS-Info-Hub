"use client"

import { useState } from "react"
import { Home, BookOpen, Users, Bell, Menu, Info, Shield, GraduationCap} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

import DepartmentProfile from "@/components/tabs/department-profile"
import ProgramsOffered from "@/components/tabs/courses-offered"
import FacultyDirectory from "@/components/tabs/faculty-directory"
import NewsAnnouncements from "@/components/tabs/news-announcements"
import AboutSection from "@/components/tabs/about-section"
import AdminPanel from "@/components/tabs/admin-panel"
import SideMenu from "@/components/side-menu"
import UserMenu from "@/components/user-menu"
import { useAuth } from "@/components/auth-context"

export default function MobileApp() {
  const [activeTab, setActiveTab] = useState("home")
  const { toast } = useToast()
  const { user } = useAuth()

  const handleTabChange = (value: string) => {
    // Check if trying to access admin tab without admin privileges
    if (value === "admin" && (!user || !user.isAdmin)) {
      toast({
        title: "Access Denied",
        description: "You are not an admin",
        variant: "destructive",
      })
      return
    }
    setActiveTab(value)
  }

  const showNotification = () => {
    toast({
      title: "New Event!",
      description: "Guest Lecture on AI Ethics this Friday at 3 PM in Hall 302.",
    })
  }

  return (
    <div className="flex flex-col h-[100dvh] max-w-md mx-auto border-x border-border bg-background">
      {/* App Header */}
      <header className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary text-primary-foreground font-bold">
            CS
          </div>
          <h1 className="text-xl font-bold">CS Info Hub</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={showNotification} aria-label="Notifications">
            <Bell className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              if (!user || !user.isAdmin) {
                toast({
                  title: "Access Denied",
                  description: "You are not an admin",
                  variant: "destructive",
                })
              } else {
                handleTabChange("admin")
              }
            }}
            aria-label="Department Admin Panel"
          >
            <Shield className="h-5 w-5" />
          </Button>
          <UserMenu />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80%] sm:w-[385px]">
              <SideMenu onNavigate={(tab) => handleTabChange(tab)} activeTab={activeTab} />
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* App Content */}
      <main className="flex-1 overflow-auto">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="h-full flex flex-col">
          <TabsContent value="home" className="flex-1 overflow-auto p-0 m-0">
            <DepartmentProfile />
          </TabsContent>
          <TabsContent value="courses" className="flex-1 overflow-auto p-0 m-0">
            <ProgramsOffered />
          </TabsContent>
          <TabsContent value="faculty" className="flex-1 overflow-auto p-0 m-0">
            <FacultyDirectory />
          </TabsContent>
          <TabsContent value="news" className="flex-1 overflow-auto p-0 m-0">
            <NewsAnnouncements />
          </TabsContent>
          <TabsContent value="about" className="flex-1 overflow-auto p-0 m-0">
            <AboutSection />
          </TabsContent>
          <TabsContent value="admin" className="flex-1 overflow-auto p-0 m-0">
            {user && user.isAdmin ? <AdminPanel /> : <div className="p-4">Access denied</div>}
          </TabsContent>

          {/* Bottom Navigation */}
          <div className="mt-auto border-t">
            <TabsList className="w-full h-16 grid grid-cols-5 bg-background">
              <TabsTrigger
                value="home"
                className={cn(
                  "flex flex-col items-center justify-center gap-1 h-full data-[state=active]:bg-muted",
                  activeTab === "home" ? "text-primary" : "text-muted-foreground",
                )}
              >
                <Home className="h-5 w-5" />
                <span className="text-xs">Home</span>
              </TabsTrigger>
              <TabsTrigger
                value="courses"
                className={cn(
                  "flex flex-col items-center justify-center gap-1 h-full data-[state=active]:bg-muted",
                  activeTab === "courses" ? "text-primary" : "text-muted-foreground",
                )}
              >
                <BookOpen className="h-5 w-5" />
                <span className="text-xs">Courses</span>
              </TabsTrigger>
              <TabsTrigger
                value="faculty"
                className={cn(
                  "flex flex-col items-center justify-center gap-1 h-full data-[state=active]:bg-muted",
                  activeTab === "faculty" ? "text-primary" : "text-muted-foreground",
                )}
              >
                <Users className="h-5 w-5" />
                <span className="text-xs">Faculty</span>
              </TabsTrigger>
              <TabsTrigger
                value="news"
                className={cn(
                  "flex flex-col items-center justify-center gap-1 h-full data-[state=active]:bg-muted",
                  activeTab === "news" ? "text-primary" : "text-muted-foreground",
                )}
              >
                <Bell className="h-5 w-5" />
                <span className="text-xs">News</span>
              </TabsTrigger>
              <TabsTrigger
                value="about"
                className={cn(
                  "flex flex-col items-center justify-center gap-1 h-full data-[state=active]:bg-muted",
                  activeTab === "about" ? "text-primary" : "text-muted-foreground",
                )}
              >
                <Info className="h-5 w-5" />
                <span className="text-xs">About</span>
              </TabsTrigger>
            </TabsList>
          </div>
        </Tabs>
      </main>
    </div>
  )
}
