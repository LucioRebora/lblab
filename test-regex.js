const cookie = "next-auth.session-token=123; Path=/; Expires=Sat, 04 Apr 2026 12:00:00 GMT; Max-Age=2592000; HttpOnly; SameSite=Lax";
console.log(
    cookie
        .replace(/Max-Age=[0-9]+;?\s*/gi, "")
        .replace(/Expires=[^;]+;?\s*/gi, "")
);
