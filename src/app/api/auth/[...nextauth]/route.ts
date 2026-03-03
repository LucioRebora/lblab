import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextRequest } from "next/server";

const handler = NextAuth(authOptions);

export async function POST(req: NextRequest, ctx: any) {
    const isRememberMe = req.cookies.get("rememberMe")?.value === "true";

    // Convert to Response
    const response = await handler(req, ctx) as Response;

    // Modify cookies if rememberMe is false
    if (!isRememberMe) {
        // Use getSetCookie() to get an array of set-cookie strings
        const setCookies = response.headers.getSetCookie();
        if (setCookies && setCookies.length > 0) {
            response.headers.delete("set-cookie");
            for (const cookie of setCookies) {
                if (cookie.includes("next-auth.session-token")) {
                    // Remove Max-Age=...; and Expires=...; using regex to make it a session cookie (closes with browser)
                    const modifiedCookie = cookie
                        .replace(/Max-Age=[0-9]+;?\s*/gi, "")
                        .replace(/Expires=[^;]+;?\s*/gi, "");
                    response.headers.append("set-cookie", modifiedCookie);
                } else {
                    response.headers.append("set-cookie", cookie);
                }
            }
        }
    }

    return response;
}

export { handler as GET };
