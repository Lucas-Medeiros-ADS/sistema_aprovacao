import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const hunterId = request.cookies.get("hunter_id")?.value;
  
  // Se não tem cookie e está tentando acessar qualquer página (exceto /login)
  if (!hunterId && !request.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  
  // Se tem cookie e está na página de login, redireciona para a home
  if (hunterId && request.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - imagens ou assets públicos se houver (ex: logo.png)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
