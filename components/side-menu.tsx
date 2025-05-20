"use client"

import {
  Settings,
  Home,
  BookOpen,
  Users,
  Bell,
  Info,
  Shield,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/components/auth-context"
import { cn } from "@/lib/utils"

interface SideMenuProps {
  onNavigate: (tab: string) => void
  activeTab: string
}

export default function SideMenu({ onNavigate, activeTab }: SideMenuProps) {
  const { user } = useAuth()

  const menuItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "courses", label: "Programmes", icon: BookOpen },
    { id: "faculty", label: "Staff", icon: Users },
    { id: "news", label: "News & Announcements", icon: Bell },
    { id: "about", label: "About", icon: Info },
  ]

  // const additionalItems = [
  //   { id: "timetable", label: "Timetable", icon: Calendar },
  //   { id: "downloads", label: "Downloads", icon: FileDown },
  //   { id: "faqs", label: "FAQs", icon: HelpCircle },
  //   { id: "feedback", label: "Feedback", icon: MessageSquare },
  //   { id: "search", label: "Search", icon: Search },
  //   { id: "quiz", label: "CS Quiz", icon: GraduationCap },
  // ]

  return (
    <div className="h-full flex flex-col py-4">
      <h2 className="text-lg font-semibold mb-4">CS Infor Hub</h2>
      <Separator className="mb-4" />

      <div className="space-y-1">
        {menuItems.map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            className={cn("w-full justify-start", activeTab === item.id && "bg-muted text-primary")}
            onClick={() => onNavigate(item.id)}
          >
            <item.icon className="mr-2 h-4 w-4" />
            <span>{item.label}</span>
          </Button>
        ))}

        {/* Admin section - only visible to admins */}
        {user?.isAdmin && (
          <Button
            variant="ghost"
            className={cn("w-full justify-start", activeTab === "admin" && "bg-muted text-primary")}
            onClick={() => onNavigate("admin")}
          >
            <Shield className="mr-2 h-4 w-4" />
            <span>Department Admin</span>
          </Button>
        )}
      </div>

      <Separator className="my-4" />

      {/* <div className="space-y-1">
        {additionalItems.map((item) => (
          <Button key={item.id} variant="ghost" className="w-full justify-start" onClick={() => {}}>
            <item.icon className="mr-2 h-4 w-4" />
            <span>{item.label}</span>
          </Button>
        ))}
      </div> */}

      <Separator className="my-4" />

      <Button variant="ghost" className="w-full justify-start">
        <Settings className="mr-2 h-4 w-4" />
        <span>Settings</span>
      </Button>

      <div className="mt-auto pt-4">
        <p className="text-xs text-muted-foreground text-center">CS Infor Hub v1.0.0</p>
      </div>
    </div>
  )
}
