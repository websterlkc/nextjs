import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware() {
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    },
    pages: {
      signIn: '/not-authorized',
    }
  }
)

export const config = {
  matcher: [
    '/dashboards/:path*',
    '/protected/:path*',
    '/validate-key/:path*'
  ]
} 