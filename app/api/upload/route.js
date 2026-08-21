/**
 * app/api/upload/route.js — Spaces & Beyond Real Estate
 * Handles real photo uploads from the admin panel to Supabase
 * Storage. Same logic as the vanilla-site version, ported to
 * Next.js App Router's Request/Response format.
 */
export async function POST(request) {
    const adminKey = request.headers.get("x-admin-key");
    if (adminKey !== process.env.ADMIN_PASSWORD) {
        return Response.json({ error: "Unauthorised" }, { status: 401 });
    }

    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
    const BUCKET = "site-images";

    if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
        return Response.json(
            {
                error: "Missing SUPABASE_URL or SUPABASE_SERVICE_KEY in Vercel env vars",
            },
            { status: 500 },
        );
    }

    try {
        const { filename, data, contentType } = await request.json();
        if (!filename || !data) {
            return Response.json(
                { error: "Missing filename or file data" },
                { status: 400 },
            );
        }

        const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
        if (contentType && !allowed.includes(contentType)) {
            return Response.json(
                { error: `Unsupported file type: ${contentType}` },
                { status: 400 },
            );
        }
        if (data.length > 11 * 1024 * 1024) {
            return Response.json(
                { error: "File too large (8MB max)" },
                { status: 400 },
            );
        }

        const base64 = data.replace(/^data:[^;]+;base64,/, "");
        const buffer = Buffer.from(base64, "base64");

        const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, "-");
        const path = `${Date.now()}-${safeName}`;

        const uploadRes = await fetch(
            `${SUPABASE_URL}/storage/v1/object/${BUCKET}/${path}`,
            {
                method: "POST",
                headers: {
                    apikey: SUPABASE_SERVICE_KEY,
                    Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
                    "Content-Type": contentType || "application/octet-stream",
                    "x-upsert": "true",
                },
                body: buffer,
            },
        );

        if (!uploadRes.ok) {
            const errText = await uploadRes.text();
            throw new Error(`Supabase Storage upload failed: ${errText}`);
        }

        const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${path}`;
        return Response.json({ ok: true, url: publicUrl });
    } catch (err) {
        console.error("[upload]", err.message);
        return Response.json({ error: err.message }, { status: 500 });
    }
}
