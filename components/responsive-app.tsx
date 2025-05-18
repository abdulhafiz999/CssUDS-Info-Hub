"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/components/auth-context"
import { useToast } from "@/hooks/use-toast"
import MobileLayout from "@/components/layout/mobile-layout"
import DesktopLayout from "@/components/layout/desktop-layout"
import DepartmentProfile from "@/components/tabs/department-profile"
import ProgramsOffered from "@/components/tabs/courses-offered"
import FacultyDirectory from "@/components/tabs/faculty-directory"
import NewsAnnouncements from "@/components/tabs/news-announcements"
import AboutSection from "@/components/tabs/about-section"
import AdminPanel from "@/components/tabs/admin-panel"
import LoginForm from "@/components/login-form"

export default function ResponsiveApp() {
  const [activeTab, setActiveTab] = useState("home")
  const [isMobile, setIsMobile] = useState(false)
  const { user } = useAuth()
  const { toast } = useToast()

  // Check if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkIfMobile()

    // Add event listener
    window.addEventListener("resize", checkIfMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

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

  // Render the active content
  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <DepartmentProfile />
      case "courses":
        return <ProgramsOffered />
      case "faculty":
        return <FacultyDirectory />
      case "news":
        return <NewsAnnouncements />
      case "about":
        return <AboutSection />
      case "admin":
        return user && user.isAdmin ? <AdminPanel /> : <div className="p-4">Access denied</div>
      case "login":
        return <LoginForm onSuccess={() => setActiveTab("home")} />
      default:
        return <DepartmentProfile />
    }
  }

  return isMobile ? (
    <MobileLayout activeTab={activeTab} onNavigate={handleTabChange}>
      {renderContent()}
    </MobileLayout>
  ) : (
    <DesktopLayout activeTab={activeTab} onNavigate={handleTabChange}>
      {renderContent()}
    </DesktopLayout>
  )
}
