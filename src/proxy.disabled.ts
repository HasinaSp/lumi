import { auth } from "./lib/auth";

export default auth((req) => {
const isLoggedIn = !!req.auth;
const pathname = req.nextUrl.pathname;

if (!isLoggedIn && pathname.startsWith("/dashboard")) {
const loginUrl = new URL("/login", req.nextUrl.origin);
return Response.redirect(loginUrl);
}

if (!isLoggedIn && pathname.startsWith("/admin")) {
const loginUrl = new URL("/login", req.nextUrl.origin);
return Response.redirect(loginUrl);
}

if (
pathname.startsWith("/admin") &&
req.auth?.user?.email !== process.env.ADMIN_EMAIL
) {
const dashboardUrl = new URL("/dashboard", req.nextUrl.origin);
return Response.redirect(dashboardUrl);
}
});

export const config = {
matcher: ["/dashboard/:path*", "/admin/:path*"],
}; 
