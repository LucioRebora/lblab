import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextRequest } from "next/server";

async function handleAuth(req: NextRequest, ctx: any) {
    const isRememberMe = req.cookies.get("rememberMe")?.value === "true";

    const dynamicOptions = {
        ...authOptions,
        session: {
            ...authOptions.session,
            maxAge: isRememberMe ? 30 * 24 * 60 * 60 : 4 * 60 * 60, // 30 Days or 4 Hours (if cookie is restored by browser)
        }
    };

    const handler = NextAuth(dynamicOptions);
    const response = await handler(req, ctx) as Response;

    if (!isRememberMe) {
        const setCookies = response.headers.getSetCookie();
        if (setCookies && setCookies.length > 0) {
            response.headers.delete("set-cookie");
            for (const cookie of setCookies) {
                if (cookie.includes("next-auth.session-token")) {
                    const modifiedCookie = cookie
                        .replace(/Max-Age=\d+;?\s*/gi, "")
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

export async function GET(req: NextRequest, ctx: any) {
    return handleAuth(req, ctx);
}

export async function POST(req: NextRequest, ctx: any) {
    return handleAuth(req, ctx);
}
