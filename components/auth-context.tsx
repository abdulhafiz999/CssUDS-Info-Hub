"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"

// Define the User type
export type User = {
  id: string
  email: string
  isAdmin: boolean
  isSuperAdmin: boolean
}

// Define the AuthContext type
type AuthContextType = {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string) => Promise<void>
  logout: () => void
  addAdmin: (email: string) => void
  removeAdmin: (email: string) => void
  admins: string[]
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Predefined admin emails
const PREDEFINED_ADMINS = ["admin@cs.edu", "dean@cs.edu", "chair@cs.edu"]
const SUPER_ADMIN = "superadmin@cs.edu"

// Auth Provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [admins, setAdmins] = useState<string[]>(PREDEFINED_ADMINS)
  const { toast } = useToast()

  // Simulate loading user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("csInfoHubUser")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  // Login function
  const login = async (email: string, password: string) => {
    try {
      // Simulate authentication delay
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Simple validation (in a real app, this would be server-side)
      if (!email || !password) {
        throw new Error("Email and password are required")
      }

      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters")
      }

      // Create user object
      const newUser: User = {
        id: Date.now().toString(),
        email,
        isAdmin: admins.includes(email) || email === SUPER_ADMIN,
        isSuperAdmin: email === SUPER_ADMIN,
      }

      // Save user to state and localStorage
      setUser(newUser)
      localStorage.setItem("csInfoHubUser", JSON.stringify(newUser))

      toast({
        title: "Login successful",
        description: `Welcome back, ${email}!`,
      })
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      })
      throw error
    } finally {
      setLoading(false)
    }
  }

  // Signup function
  const signup = async (email: string, password: string) => {
    try {
      // Simulate authentication delay
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Simple validation
      if (!email || !password) {
        throw new Error("Email and password are required")
      }

      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters")
      }

      // Create user object
      const newUser: User = {
        id: Date.now().toString(),
        email,
        isAdmin: admins.includes(email) || email === SUPER_ADMIN,
        isSuperAdmin: email === SUPER_ADMIN,
      }

      // Save user to state and localStorage
      setUser(newUser)
      localStorage.setItem("csInfoHubUser", JSON.stringify(newUser))

      toast({
        title: "Account created",
        description: `Welcome, ${email}!`,
      })
    } catch (error) {
      toast({
        title: "Signup failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      })
      throw error
    } finally {
      setLoading(false)
    }
  }

  // Logout function
  const logout = () => {
    setUser(null)
    localStorage.removeItem("csInfoHubUser")
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    })
  }

  // Add admin function
  const addAdmin = (email: string) => {
    if (!user?.isSuperAdmin) {
      toast({
        title: "Permission denied",
        description: "Only department super admins can add new admins.",
        variant: "destructive",
      })
      return
    }

    if (admins.includes(email)) {
      toast({
        title: "Admin already exists",
        description: `${email} is already a department admin.`,
        variant: "destructive",
      })
      return
    }

    setAdmins((prev) => [...prev, email])
    toast({
      title: "Department admin added",
      description: `${email} has been added as a department admin.`,
    })

    // If the current user's email was added as admin, update their status
    if (user && user.email === email) {
      const updatedUser = { ...user, isAdmin: true }
      setUser(updatedUser)
      localStorage.setItem("csInfoHubUser", JSON.stringify(updatedUser))
    }
  }

  // Remove admin function
  const removeAdmin = (email: string) => {
    if (!user?.isSuperAdmin) {
      toast({
        title: "Permission denied",
        description: "Only department super admins can remove admins.",
        variant: "destructive",
      })
      return
    }

    if (email === SUPER_ADMIN) {
      toast({
        title: "Cannot remove super admin",
        description: "The department super admin cannot be removed.",
        variant: "destructive",
      })
      return
    }

    if (!admins.includes(email)) {
      toast({
        title: "Admin not found",
        description: `${email} is not a department admin.`,
        variant: "destructive",
      })
      return
    }

    setAdmins((prev) => prev.filter((admin) => admin !== email))
    toast({
      title: "Department admin removed",
      description: `${email} has been removed as a department admin.`,
    })

    // If the current user's email was removed as admin, update their status
    if (user && user.email === email) {
      const updatedUser = { ...user, isAdmin: false }
      setUser(updatedUser)
      localStorage.setItem("csInfoHubUser", JSON.stringify(updatedUser))
    }
  }

  // Create the context value
  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    addAdmin,
    removeAdmin,
    admins,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
