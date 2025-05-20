"use client"

import type React from "react"

import { Home, BookOpen, Users, Bell, Menu, Info, Shield } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import SideMenu from "@/components/side-menu"
import UserMenu from "@/components/user-menu"
import { useAuth } from "@/components/auth-context"

interface MobileLayoutProps {
  children: React.ReactNode
  activeTab: string
  onNavigate: (tab: string) => void
}

export default function MobileLayout({ children, activeTab, onNavigate }: MobileLayoutProps) {
  const { toast } = useToast()
  const { user } = useAuth()

  const handleAdminClick = () => {
    if (!user || !user.isAdmin) {
      toast({
        title: "Access Denied",
        description: "You are not an admin",
        variant: "destructive",
      })
      return
    }
    onNavigate("admin")
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
          <Button variant="ghost" size="icon" onClick={handleAdminClick} aria-label="Department Admin Panel">
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
              <SideMenu onNavigate={onNavigate} activeTab={activeTab} />
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* App Content */}
      <main className="flex-1 overflow-auto">
        <Tabs value={activeTab} onValueChange={onNavigate} className="h-full flex flex-col">
          <TabsContent value="home" className="flex-1 overflow-auto p-0 m-0">
            {activeTab === "home" && children}
          </TabsContent>
          <TabsContent value="courses" className="flex-1 overflow-auto p-0 m-0">
            {activeTab === "courses" && children}
          </TabsContent>
          <TabsContent value="faculty" className="flex-1 overflow-auto p-0 m-0">
            {activeTab === "faculty" && children}
          </TabsContent>
          <TabsContent value="news" className="flex-1 overflow-auto p-0 m-0">
            {activeTab === "news" && children}
          </TabsContent>
          <TabsContent value="about" className="flex-1 overflow-auto p-0 m-0">
            {activeTab === "about" && children}
          </TabsContent>
          <TabsContent value="admin" className="flex-1 overflow-auto p-0 m-0">
            {activeTab === "admin" && children}
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
                <span className="text-xs">Programmes</span>
              </TabsTrigger>
              <TabsTrigger
                value="faculty"
                className={cn(
                  "flex flex-col items-center justify-center gap-1 h-full data-[state=active]:bg-muted",
                  activeTab === "faculty" ? "text-primary" : "text-muted-foreground",
                )}
              >
                <Users className="h-5 w-5" />
                <span className="text-xs">Staff</span>
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
