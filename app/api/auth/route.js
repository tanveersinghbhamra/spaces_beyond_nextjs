/**
 * app/api/auth/route.js — Spaces & Beyond Real Estate
 * Verifies admin password. Runs on the server only — password never
 * reaches the browser or client-side code.
 */
export async function GET(request) {
    const provided = request.headers.get("x-admin-key");
    const expected = process.env.ADMIN_PASSWORD;

    if (!expected) {
        return Response.json(
            { error: "ADMIN_PASSWORD not set in Vercel env vars" },
            { status: 500 },
        );
    }
    if (!provided || provided !== expected) {
        return Response.json({ error: "Unauthorised" }, { status: 401 });
    }
    return Response.json({ ok: true });
}
