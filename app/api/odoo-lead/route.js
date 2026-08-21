/**
 * app/api/odoo-lead/route.js — Spaces & Beyond Real Estate
 *
 * Takes a contact form submission and creates a lead directly in the
 * client's Odoo CRM (crm.lead model), via Odoo's JSON-RPC API.
 *
 * Needs 4 env vars, from the client's Odoo admin:
 *   ODOO_URL       e.g. https://clientcompany.odoo.com
 *   ODOO_DB        the database name (often same as the subdomain)
 *   ODOO_USERNAME  a login with permission to create CRM leads
 *   ODOO_PASSWORD  that account's password, or an API key
 *
 * NOT YET VERIFIED against a real Odoo instance — built directly from
 * Odoo's documented JSON-RPC pattern, but needs a real test submission
 * once real credentials are available. Test by submitting the live
 * contact form and confirming a new lead appears in Odoo's CRM > Leads.
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

    if (!ODOO_URL || !ODOO_DB || !ODOO_USERNAME || !ODOO_PASSWORD) {
        console.error(
            "[odoo-lead] Missing ODOO_URL/ODOO_DB/ODOO_USERNAME/ODOO_PASSWORD env vars",
        );
        return Response.json(
            {
                error: "Unable to submit right now — please try WhatsApp instead.",
            },
            { status: 500 },
        );
    }

    try {
        const body = await request.json();
        const { firstName, lastName, email, phone, interest, message } = body;

        // Basic validation — required fields present, sane email shape,
        // and a hard cap on every field's length so nobody can flood the
        // client's CRM with megabyte-sized junk submissions.
        const MAX = {
            firstName: 80,
            lastName: 80,
            email: 120,
            phone: 40,
            interest: 60,
            message: 2000,
        };
        const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!firstName || !email) {
            return Response.json(
                { error: "Please fill in your name and email." },
                { status: 400 },
            );
        }
        if (!EMAIL_RE.test(email)) {
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

        // Step 1 — authenticate, get a user id for subsequent calls
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

        // Step 2 — create the CRM lead
        const fullName = `${firstName} ${lastName || ""}`.trim();
        const leadId = await odooCall(ODOO_URL, "object", "execute_kw", [
            ODOO_DB,
            uid,
            ODOO_PASSWORD,
            "crm.lead",
            "create",
            [
                {
                    name: `Website enquiry — ${fullName}`,
                    contact_name: fullName,
                    email_from: email,
                    phone: phone || "",
                    description: `Interested in: ${interest || "Not specified"}\n\n${message || ""}`,
                    source_id: false, // optionally set to a "Website" source record id in Odoo
                },
            ],
        ]);

        return Response.json({ ok: true, leadId });
    } catch (err) {
        // Log the real error server-side for debugging, but never send
        // Odoo's internal error details (schema names, stack traces,
        // etc.) back to whoever is submitting the form.
        console.error("[odoo-lead]", err.message);
        return Response.json(
            {
                error: "Unable to submit right now — please try WhatsApp instead.",
            },
            { status: 500 },
        );
    }
}
