import { createMiddleware } from "@arcjet/next";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import aj from "@/lib/arcjet";

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico|healthz).*)"],
};

const arcjetMiddleware = createMiddleware(aj);

export async function middleware(request: NextRequest, event: NextFetchEvent) {
    const arcjetResponse = await arcjetMiddleware(request, event);

    let response = NextResponse.next();

    //protected routes list
    const protectedRoutes = ["/"];

    const isProtectedRoute = protectedRoutes.some(
        (route) =>
            request.nextUrl.pathname === route ||
            request.nextUrl.pathname.startsWith(route + "/")
    );

    if (isProtectedRoute) {
        const user = (await getSession()) ? await getSession() : null;

        if (!user) {
            if (request.nextUrl.pathname !== "/login") {
                const loginUrl = new URL("/login", request.url);
                loginUrl.searchParams.set("from", request.nextUrl.pathname);
                response = NextResponse.redirect(loginUrl);
            }
        }
    }

    if (arcjetResponse && arcjetResponse.headers) {
        arcjetResponse.headers.forEach((value, key) => {
            response.headers.set(key, value);
        });
    }

    if (arcjetResponse && arcjetResponse.status !== 200) {
        return arcjetResponse;
    }

    return response;
}
