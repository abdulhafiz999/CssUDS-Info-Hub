"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/components/auth-context"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import {
  Home,
  BookOpen,
  Users,
  Bell,
  Info,
  Shield,
  MenuIcon,
  Calendar,
  FileDown,
  HelpCircle,
  MessageSquare,
  Search,
  Settings,
  LogOut,
} from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import SideMenu from "@/components/side-menu"

interface DesktopLayoutProps {
  children: React.ReactNode
  activeTab: string
  onNavigate: (tab: string) => void
}

export default function DesktopLayout({ children, activeTab, onNavigate }: DesktopLayoutProps) {
  const { user, logout } = useAuth()
  const { toast } = useToast()
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  const menuItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "courses", label: "Pragrammes", icon: BookOpen },
    { id: "faculty", label: "Staff", icon: Users },
    { id: "news", label: "News & Announcements", icon: Bell },
    { id: "about", label: "About", icon: Info },
  ]

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

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
      <div
        className={cn(
          "hidden md:flex flex-col border-r transition-all duration-300",
          isSidebarCollapsed ? "w-[70px]" : "w-[240px]",
        )}
      >
        <div className="flex items-center p-4 border-b h-16">
          <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary text-primary-foreground font-bold">
            CS
          </div>
          {!isSidebarCollapsed && <h1 className="text-xl font-bold ml-2">CS Info Hub</h1>}
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto"
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          >
            <MenuIcon className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex-1 py-4 overflow-auto">
          <nav className="space-y-1 px-2">
            {menuItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                className={cn(
                  "w-full justify-start",
                  activeTab === item.id && "bg-muted text-primary",
                  isSidebarCollapsed && "justify-center px-2",
                )}
                onClick={() => onNavigate(item.id)}
              >
                <item.icon className={cn("h-5 w-5", isSidebarCollapsed ? "mr-0" : "mr-2")} />
                {!isSidebarCollapsed && <span>{item.label}</span>}
              </Button>
            ))}

            {/* Admin button - only visible to admins */}
            {user?.isAdmin && (
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start",
                  activeTab === "admin" && "bg-muted text-primary",
                  isSidebarCollapsed && "justify-center px-2",
                )}
                onClick={handleAdminClick}
              >
                <Shield className={cn("h-5 w-5", isSidebarCollapsed ? "mr-0" : "mr-2")} />
                {!isSidebarCollapsed && <span>Department Admin</span>}
              </Button>
            )}
          </nav>

          {/* {!isSidebarCollapsed && (
            <>
              <div className="mt-6 px-3">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Resources</div>
                <nav className="mt-2 space-y-1">
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="#" className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4" />
                      <span>Timetable</span>
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="#" className="flex items-center">
                      <FileDown className="mr-2 h-4 w-4" />
                      <span>Downloads</span>
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="#" className="flex items-center">
                      <HelpCircle className="mr-2 h-4 w-4" />
                      <span>FAQs</span>
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="#" className="flex items-center">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      <span>Feedback</span>
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="#" className="flex items-center">
                      <Search className="mr-2 h-4 w-4" />
                      <span>Search</span>
                    </Link>
                  </Button>
                </nav>
              </div>

              <div className="mt-6 px-3">
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link href="#" className="flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </Button>
              </div>
            </>
          )} */}
        </div>

        {user && !isSidebarCollapsed && (
          <div className="p-3 border-t">
            <div className="flex items-center">
              <Avatar className="h-8 w-8">
                <AvatarFallback>{user.email.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="ml-2 flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user.email}</p>
                <p className="text-xs text-muted-foreground">
                  {user.isSuperAdmin ? "Super Admin" : user.isAdmin ? "Admin" : "User"}
                </p>
              </div>
              <Button variant="ghost" size="icon" onClick={logout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 border-b flex items-center justify-between px-4">
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MenuIcon className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[80%] sm:w-[350px]">
                <SideMenu onNavigate={(tab) => onNavigate(tab)} activeTab={activeTab} />
              </SheetContent>
            </Sheet>
          </div>

          <div className="md:hidden flex items-center">
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary text-primary-foreground font-bold">
              CS
            </div>
            <h1 className="text-xl font-bold ml-2">CS Info Hub</h1>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <Button variant="ghost" size="icon" aria-label="Notifications">
              <Bell className="h-5 w-5" />
            </Button>

            {/* Admin Button */}
            <Button variant="ghost" size="icon" onClick={handleAdminClick} aria-label="Department Admin Panel">
              <Shield className="h-5 w-5" />
            </Button>

            {/* User Menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{user.email.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span>Account</span>
                      <span className="text-xs text-muted-foreground">{user.email}</span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {user.isAdmin && (
                    <DropdownMenuItem onClick={handleAdminClick}>
                      <Shield className="mr-2 h-4 w-4" />
                      <span>Department Admin</span>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="outline" size="sm" onClick={() => onNavigate("login")}>
                Log in
              </Button>
            )}
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
