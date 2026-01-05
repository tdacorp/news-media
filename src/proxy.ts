import { auth } from "../auth"

import { PUBLIC_ROUTES } from "@/lib/auth/public-routes"

function isPublic(pathname: string) {
  return PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  )
}

export async function proxy(req: Request) {
  const url = new URL(req.url)
  const pathname = url.pathname

  const ACCEPT_HEADER = req.headers.get("accept")

  if (ACCEPT_HEADER && !ACCEPT_HEADER.includes("text/html")) {
    return
  }

  if (isPublic(pathname)) {
    return
  }

  const session = await auth()

  if (!session) {
    const loginUrl = new URL("/login", url.origin)
    loginUrl.searchParams.set("callbackUrl", pathname)
    return Response.redirect(loginUrl)
  }

  if (pathname.startsWith("/admin")) {
    if (session.user.role !== "admin") {
      return Response.redirect(new URL("/", url.origin))
    }
  }

  return
}
