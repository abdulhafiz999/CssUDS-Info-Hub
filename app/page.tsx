import ResponsiveApp from "@/components/responsive-app"
import { AuthProvider } from "@/components/auth-context"
import { ContentProvider } from "@/components/content-context"

export default function Home() {
  return (
    <AuthProvider>
      <ContentProvider>
        <ResponsiveApp />
      </ContentProvider>
    </AuthProvider>
  )
}
