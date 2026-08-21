/**
 * app/api/odoo-lead/route.js — Spaces & Beyond Real Estate
 *
 * Tries to create a lead in the client's Odoo CRM via JSON-RPC. If Odoo
 * isn't configured (env vars missing) or the call fails for any reason,
 * responds with `fallback: 'whatsapp'` so the browser can redirect the
 * visitor straight to WhatsApp with their details pre-filled instead —
 * see Contact.js / Calculators.js for that redirect logic.
 *
 * NOT YET VERIFIED against a real Odoo instance — built directly from
 * Odoo's documented JSON-RPC pattern. Test by submitting the live form
 * once real ODOO_URL/ODOO_DB/ODOO_USERNAME/ODOO_PASSWORD are set, and
 * confirm a lead actually appears in Odoo's CRM > Leads.
 */

async function odooCall(url, service, method, args) {
    const res = await fetch(`${url}/jsonrpc`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            jsonrpc: "2.0",
            method: "call",
            params: { service, method, args },
            id: Date.now(),
        }),
    });
    const json = await res.json();
    if (json.error)
        throw new Error(json.error.data?.message || "Odoo API error");
    return json.result;
}

export async function POST(request) {
    const ODOO_URL = process.env.ODOO_URL;
    const ODOO_DB = process.env.ODOO_DB;
    const ODOO_USERNAME = process.env.ODOO_USERNAME;
    const ODOO_PASSWORD = process.env.ODOO_PASSWORD;
    const odooConfigured =
        ODOO_URL && ODOO_DB && ODOO_USERNAME && ODOO_PASSWORD;

    // No Odoo set up at all — tell the browser to fall back to WhatsApp
    // immediately, no point even validating first.
    if (!odooConfigured) {
        return Response.json({ fallback: "whatsapp" }, { status: 200 });
    }

    try {
        const body = await request.json();
        const { firstName, lastName, email, phone, interest, message, source } =
            body;

        const MAX = {
            firstName: 80,
            lastName: 80,
            email: 120,
            phone: 40,
            interest: 60,
            message: 2000,
        };
        const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const hasFullDetails = firstName && email;
        const hasPhoneOnly = phone && phone.trim().length >= 6;
        if (!hasFullDetails && !hasPhoneOnly) {
            return Response.json(
                { error: "Please provide your contact details." },
                { status: 400 },
            );
        }
        if (email && !EMAIL_RE.test(email)) {
            return Response.json(
                { error: "Please enter a valid email address." },
                { status: 400 },
            );
        }
        for (const [key, max] of Object.entries(MAX)) {
            if (body[key] && String(body[key]).length > max) {
                return Response.json(
                    { error: `${key} is too long.` },
                    { status: 400 },
                );
            }
        }

        const uid = await odooCall(ODOO_URL, "common", "authenticate", [
            ODOO_DB,
            ODOO_USERNAME,
            ODOO_PASSWORD,
            {},
        ]);
        if (!uid)
            throw new Error(
                "Odoo authentication failed — check ODOO_USERNAME/ODOO_PASSWORD",
            );

        const fullName = firstName
            ? `${firstName} ${lastName || ""}`.trim()
            : "Website Lead (phone only)";
        const leadLabel = source
            ? `Website enquiry — ${source}`
            : "Website enquiry";
        await odooCall(ODOO_URL, "object", "execute_kw", [
            ODOO_DB,
            uid,
            ODOO_PASSWORD,
            "crm.lead",
            "create",
            [
                {
                    name: `${leadLabel} — ${fullName}`,
                    contact_name: fullName,
                    email_from: email || "",
                    phone: phone || "",
                    description: `Source: ${source || "Contact form"}\nInterested in: ${interest || "Not specified"}\n\n${message || ""}`,
                    source_id: false,
                },
            ],
        ]);

        return Response.json({ ok: true });
    } catch (err) {
        // Odoo is configured but the call itself failed (wrong creds,
        // plan doesn't support External API, temporary outage, etc.) —
        // same fallback signal, so the visitor still gets through.
        console.error(
            "[odoo-lead] Odoo call failed, falling back to WhatsApp:",
            err.message,
        );
        return Response.json({ fallback: "whatsapp" }, { status: 200 });
    }
}
