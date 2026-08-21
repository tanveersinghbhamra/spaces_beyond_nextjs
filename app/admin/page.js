"use client";

import { useState, useEffect } from "react";
import { DEFAULTS } from "../../lib/defaults";
import "./admin.css";

function deepCopy(o) {
    return JSON.parse(JSON.stringify(o));
}

const NAV_SECTIONS = [
    {
        group: "Content",
        items: [
            ["hero", "Hero"],
            ["about", "About"],
            ["awards", "Awards"],
            ["services", "Services"],
            ["review", "Review Ask"],
            ["navbar", "Navbar"],
            ["contact", "Contact"],
        ],
    },
    {
        group: "Listings",
        items: [
            ["props", "Properties"],
            ["testis", "Testimonials"],
        ],
    },
    { group: "People", items: [["team", "Team"]] },
];

export default function AdminPage() {
    const [authed, setAuthed] = useState(false);
    const [pass, setPass] = useState("");
    const [u, setU] = useState("");
    const [p, setP] = useState("");
    const [loginErr, setLoginErr] = useState("");
    const [panel, setPanel] = useState("hero");
    const [data, setData] = useState(null);
    const [status, setStatus] = useState({ cls: "", text: "Ready" });
    const [toast, setToast] = useState(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const stored =
            typeof window !== "undefined"
                ? sessionStorage.getItem("sb-admin-key")
                : null;
        if (stored) {
            setPass(stored);
            setAuthed(true);
        }
    }, []);

    useEffect(() => {
        if (authed) loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authed]);

    function showToast(msg, err = false) {
        setToast({ msg, err });
        setTimeout(() => setToast(null), 5000);
    }

    async function doLogin() {
        if (u !== "admin") {
            setLoginErr("Wrong username.");
            return;
        }
        if (!p) {
            setLoginErr("Enter password.");
            return;
        }
        setLoginErr("Verifying…");
        try {
            const r = await fetch("/api/auth", {
                headers: { "x-admin-key": p },
            });
            if (!r.ok) throw new Error();
            setPass(p);
            sessionStorage.setItem("sb-admin-key", p);
            setAuthed(true);
            setLoginErr("");
        } catch {
            setLoginErr("Incorrect password.");
            setTimeout(() => setLoginErr(""), 3000);
        }
    }

    function doLogout() {
        sessionStorage.removeItem("sb-admin-key");
        setAuthed(false);
        setData(null);
    }

    async function loadData() {
        setStatus({ cls: "saving", text: "Loading…" });
        try {
            const r = await fetch("/api/content", {
                headers: { "x-admin-key": pass },
            });
            if (!r.ok) throw new Error();
            const { rows } = await r.json();
            if (rows.length && rows[0].value) {
                const saved = JSON.parse(rows[0].value);
                if (saved?.hero?.title) {
                    setData(saved);
                } else {
                    setData(deepCopy(DEFAULTS));
                    showToast(
                        "First run — defaults loaded. Click Save & Publish.",
                    );
                }
            } else {
                setData(deepCopy(DEFAULTS));
                showToast(
                    "No content yet — defaults loaded. Click Save & Publish.",
                );
            }
        } catch {
            setData(deepCopy(DEFAULTS));
            showToast("Could not connect to database.", true);
        }
        setStatus({ cls: "live", text: "Ready to edit" });
    }

    function resetToDefaults() {
        if (
            !confirm(
                'This replaces everything shown in the editor with the current site\'s real content. Nothing is saved until you click "Save & Publish" afterwards. Continue?',
            )
        )
            return;
        setData(deepCopy(DEFAULTS));
        showToast(
            "Reset to site defaults. Review, then click Save & Publish to make it live.",
        );
    }

    async function saveAll() {
        setSaving(true);
        setStatus({ cls: "saving", text: "Saving…" });
        try {
            const r = await fetch("/api/save", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-admin-key": pass,
                },
                body: JSON.stringify(data),
            });
            if (r.status === 401) {
                doLogout();
                return;
            }
            if (!r.ok) {
                const e = await r.json();
                throw new Error(e.error || "Error");
            }
            setStatus({ cls: "live", text: "Live ✓" });
            showToast("✓ Saved! Website updated.");
        } catch (err) {
            setStatus({ cls: "err", text: "Save failed" });
            showToast("Save failed: " + err.message, true);
        }
        setSaving(false);
    }

    async function uploadFile(file, onDone) {
        if (!file) return;
        if (file.size > 8 * 1024 * 1024) {
            showToast("File too large — 8MB max", true);
            return;
        }
        const reader = new FileReader();
        reader.onload = async () => {
            try {
                const r = await fetch("/api/upload", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "x-admin-key": pass,
                    },
                    body: JSON.stringify({
                        filename: file.name,
                        data: reader.result,
                        contentType: file.type,
                    }),
                });
                if (r.status === 401) {
                    doLogout();
                    return;
                }
                const j = await r.json();
                if (!r.ok) throw new Error(j.error || "Upload failed");
                onDone(j.url);
                showToast("✓ Photo uploaded");
            } catch (err) {
                showToast("Upload failed: " + err.message, true);
            }
        };
        reader.readAsDataURL(file);
    }

    function set(path, value) {
        setData((d) => {
            const copy = deepCopy(d);
            const keys = path.split(".");
            let obj = copy;
            for (let i = 0; i < keys.length - 1; i++) obj = obj[keys[i]];
            obj[keys[keys.length - 1]] = value;
            return copy;
        });
    }

    if (!authed) {
        return (
            <div id="login">
                <p className="ll">
                    Spaces & Beyond <small>Content Manager</small>
                </p>
                <div className="lbox">
                    <p className="lt">Admin Sign In</p>
                    <div className="lf">
                        <label>Username</label>
                        <input
                            value={u}
                            onChange={(e) => setU(e.target.value)}
                            placeholder="admin"
                        />
                    </div>
                    <div className="lf">
                        <label>Password</label>
                        <input
                            type="password"
                            value={p}
                            onChange={(e) => setP(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && doLogin()}
                            placeholder="••••••••"
                        />
                    </div>
                    <button className="lbtn" onClick={doLogin}>
                        Sign In →
                    </button>
                    <p className="lerr">{loginErr}</p>
                </div>
            </div>
        );
    }

    if (!data) {
        return (
            <div id="login">
                <p className="ll">Loading…</p>
            </div>
        );
    }

    return (
        <div id="app" style={{ display: "block" }}>
            <div className="tb">
                <div className="tb-logo">
                    Spaces & Beyond <small>Content Manager</small>
                </div>
                <div className="tb-right">
                    <div className={`st ${status.cls}`}>
                        <div className="dot"></div>
                        <span>{status.text}</span>
                    </div>
                    <button className="rbtn" onClick={resetToDefaults}>
                        Reset to Site Defaults
                    </button>
                    <button
                        className="sbtn"
                        disabled={saving}
                        onClick={saveAll}
                    >
                        Save &amp; Publish
                    </button>
                    <button className="lout" onClick={doLogout}>
                        Out
                    </button>
                </div>
            </div>

            <div className="mob-nav">
                <div className="mob-nav-inner">
                    {NAV_SECTIONS.flatMap((s) => s.items).map(([id, label]) => (
                        <button
                            key={id}
                            className={`mn-btn${panel === id ? " on" : ""}`}
                            onClick={() => setPanel(id)}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="layout">
                <nav className="sidebar">
                    {NAV_SECTIONS.map((s) => (
                        <div key={s.group}>
                            <div className="sg">{s.group}</div>
                            {s.items.map(([id, label]) => (
                                <button
                                    key={id}
                                    className={`sl${panel === id ? " on" : ""}`}
                                    onClick={() => setPanel(id)}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    ))}
                </nav>

                <main className="main">
                    {panel === "hero" && <HeroPanel data={data} set={set} />}
                    {panel === "about" && <AboutPanel data={data} set={set} />}
                    {panel === "awards" && (
                        <AwardsPanel
                            data={data}
                            set={set}
                            uploadFile={uploadFile}
                        />
                    )}
                    {panel === "services" && (
                        <ServicesPanel
                            data={data}
                            set={set}
                            uploadFile={uploadFile}
                        />
                    )}
                    {panel === "review" && (
                        <ReviewPanel data={data} set={set} />
                    )}
                    {panel === "navbar" && (
                        <NavbarPanel data={data} set={set} />
                    )}
                    {panel === "contact" && (
                        <ContactPanel data={data} set={set} />
                    )}
                    {panel === "props" && (
                        <PropertiesPanel
                            data={data}
                            setData={setData}
                            uploadFile={uploadFile}
                        />
                    )}
                    {panel === "testis" && (
                        <TestimonialsPanel data={data} setData={setData} />
                    )}
                    {panel === "team" && (
                        <TeamPanel
                            data={data}
                            setData={setData}
                            uploadFile={uploadFile}
                        />
                    )}
                </main>
            </div>

            {toast && (
                <div className={`toast on${toast.err ? " err" : ""}`}>
                    {toast.msg}
                </div>
            )}
        </div>
    );
}

/* ── Field helpers ── */
function F({ label, children }) {
    return (
        <div className="f">
            <label>{label}</label>
            {children}
        </div>
    );
}
function Block({ title, children }) {
    return (
        <div className="bk">
            <div className="bk-t">{title}</div>
            {children}
        </div>
    );
}
function ImgField({ label, value, onChange, onUpload }) {
    return (
        <F label={label}>
            <div className="img-row-inner">
                <input
                    value={value || ""}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="images/... or upload a photo →"
                />
                <label className="up-btn">
                    Upload
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => onUpload(e.target.files[0])}
                        style={{ display: "none" }}
                    />
                </label>
            </div>
            {value && (
                <img
                    src={value.startsWith("http") ? value : `/${value}`}
                    className="img-prev"
                    onError={(e) => {
                        e.currentTarget.style.display = "none";
                    }}
                    alt=""
                />
            )}
        </F>
    );
}

/* ── Panels ── */
function HeroPanel({ data, set }) {
    const h = data.hero;
    return (
        <div className="panel on">
            <h1 className="ph">
                Hero <em>Section</em>
            </h1>
            <Block title="Headline">
                <div className="g2">
                    <F label="Title — white text">
                        <input
                            value={h.title}
                            onChange={(e) => set("hero.title", e.target.value)}
                        />
                    </F>
                    <F label="Title — gold italic text">
                        <input
                            value={h.title_em}
                            onChange={(e) =>
                                set("hero.title_em", e.target.value)
                            }
                        />
                    </F>
                </div>
            </Block>
            <Block title="Buttons">
                <div className="g2">
                    <F label="Primary button">
                        <input
                            value={h.btn_primary}
                            onChange={(e) =>
                                set("hero.btn_primary", e.target.value)
                            }
                        />
                    </F>
                    <F label="Secondary button">
                        <input
                            value={h.btn_secondary}
                            onChange={(e) =>
                                set("hero.btn_secondary", e.target.value)
                            }
                        />
                    </F>
                </div>
            </Block>
        </div>
    );
}

function AboutPanel({ data, set }) {
    const a = data.about;
    return (
        <div className="panel on">
            <h1 className="ph">
                About <em>Section</em>
            </h1>
            <Block title="Title">
                <div className="g2">
                    <F label="Title — white text">
                        <input
                            value={a.title}
                            onChange={(e) => set("about.title", e.target.value)}
                        />
                    </F>
                    <F label="Title — gold italic">
                        <input
                            value={a.title_em}
                            onChange={(e) =>
                                set("about.title_em", e.target.value)
                            }
                        />
                    </F>
                </div>
                <F label="Title — line 2">
                    <input
                        value={a.title2}
                        onChange={(e) => set("about.title2", e.target.value)}
                    />
                </F>
            </Block>
            <Block title="Content">
                <F label="Paragraph 1">
                    <textarea
                        value={a.p1}
                        onChange={(e) => set("about.p1", e.target.value)}
                    />
                </F>
                <F label="Paragraph 2">
                    <textarea
                        value={a.p2}
                        onChange={(e) => set("about.p2", e.target.value)}
                    />
                </F>
            </Block>
        </div>
    );
}

function AwardsPanel({ data, set, uploadFile }) {
    const aw = data.awards;
    return (
        <div className="panel on">
            <h1 className="ph">
                Awards & <em>Recognition</em>
            </h1>
            <Block title="Intro">
                <F label="Lead paragraph">
                    <textarea
                        value={aw.lead}
                        onChange={(e) => set("awards.lead", e.target.value)}
                    />
                </F>
            </Block>
            <Block title="Award Photo 1">
                <ImgField
                    label="Image"
                    value={aw.award1_img}
                    onChange={(v) => set("awards.award1_img", v)}
                    onUpload={(f) =>
                        uploadFile(f, (url) => set("awards.award1_img", url))
                    }
                />
                <F label="Caption">
                    <input
                        value={aw.award1_caption}
                        onChange={(e) =>
                            set("awards.award1_caption", e.target.value)
                        }
                    />
                </F>
            </Block>
            <Block title="Award Photo 2">
                <ImgField
                    label="Image"
                    value={aw.award2_img}
                    onChange={(v) => set("awards.award2_img", v)}
                    onUpload={(f) =>
                        uploadFile(f, (url) => set("awards.award2_img", url))
                    }
                />
                <F label="Caption">
                    <input
                        value={aw.award2_caption}
                        onChange={(e) =>
                            set("awards.award2_caption", e.target.value)
                        }
                    />
                </F>
            </Block>
        </div>
    );
}

function ServicesPanel({ data, set, uploadFile }) {
    const sv = data.services;
    return (
        <div className="panel on">
            <h1 className="ph">
                Services <em>Section</em>
            </h1>
            <Block title="Intro Copy">
                <F label="Paragraph 1">
                    <textarea
                        value={sv.p1}
                        onChange={(e) => set("services.p1", e.target.value)}
                    />
                </F>
                <F label="Paragraph 2">
                    <textarea
                        value={sv.p2}
                        onChange={(e) => set("services.p2", e.target.value)}
                    />
                </F>
            </Block>
            <Block title="Photo">
                <ImgField
                    label="Image"
                    value={sv.img}
                    onChange={(v) => set("services.img", v)}
                    onUpload={(f) =>
                        uploadFile(f, (url) => set("services.img", url))
                    }
                />
                <F label="Caption">
                    <input
                        value={sv.img_caption}
                        onChange={(e) =>
                            set("services.img_caption", e.target.value)
                        }
                    />
                </F>
            </Block>
            {[1, 2, 3, 4, 5, 6].map((i) => (
                <Block title={`Service Box 0${i}`} key={i}>
                    <F label="Title">
                        <input
                            value={sv[`box${i}`].title}
                            onChange={(e) =>
                                set(`services.box${i}.title`, e.target.value)
                            }
                        />
                    </F>
                    <F label="Description">
                        <textarea
                            value={sv[`box${i}`].desc}
                            onChange={(e) =>
                                set(`services.box${i}.desc`, e.target.value)
                            }
                        />
                    </F>
                </Block>
            ))}
        </div>
    );
}

function ReviewPanel({ data, set }) {
    const r = data.review;
    return (
        <div className="panel on">
            <h1 className="ph">
                Leave a <em>Review</em>
            </h1>
            <Block title="Review Link">
                <F label="Button URL">
                    <input
                        value={r.link_href}
                        onChange={(e) =>
                            set("review.link_href", e.target.value)
                        }
                    />
                </F>
            </Block>
        </div>
    );
}

function CtaPanel({ data, set }) {
    const c = data.cta;
    return (
        <div className="panel on">
            <h1 className="ph">
                CTA <em>Banner</em>
            </h1>
            <Block title="Copy">
                <F label="Eyebrow">
                    <input
                        value={c.eyebrow}
                        onChange={(e) => set("cta.eyebrow", e.target.value)}
                    />
                </F>
                <F label="Sub paragraph">
                    <textarea
                        value={c.sub}
                        onChange={(e) => set("cta.sub", e.target.value)}
                    />
                </F>
            </Block>
        </div>
    );
}

function NavbarPanel({ data, set }) {
    return (
        <div className="panel on">
            <h1 className="ph">
                Navbar <em>Tagline</em>
            </h1>
            <Block title="">
                <F label="Tagline">
                    <input
                        value={data.navbar.tagline}
                        onChange={(e) => set("navbar.tagline", e.target.value)}
                    />
                </F>
            </Block>
        </div>
    );
}

function ContactPanel({ data, set }) {
    const c = data.contact;
    return (
        <div className="panel on">
            <h1 className="ph">
                Contact <em>Details</em>
            </h1>
            <Block title="Phone & WhatsApp">
                <F label="Display phone number">
                    <input
                        value={c.phone_display}
                        onChange={(e) =>
                            set("contact.phone_display", e.target.value)
                        }
                    />
                </F>
                <div className="g2">
                    <F label="Phone link">
                        <input
                            value={c.phone_href}
                            onChange={(e) =>
                                set("contact.phone_href", e.target.value)
                            }
                        />
                    </F>
                    <F label="WhatsApp link">
                        <input
                            value={c.whatsapp_href}
                            onChange={(e) =>
                                set("contact.whatsapp_href", e.target.value)
                            }
                        />
                    </F>
                </div>
            </Block>
            <Block title="Email & Address">
                <F label="Email">
                    <input
                        value={c.email}
                        onChange={(e) => set("contact.email", e.target.value)}
                    />
                </F>
                <F label="Address">
                    <input
                        value={c.address}
                        onChange={(e) => set("contact.address", e.target.value)}
                    />
                </F>
            </Block>
            <Block title="Instagram">
                <div className="g2">
                    <F label="Handle">
                        <input
                            value={c.instagram_handle}
                            onChange={(e) =>
                                set("contact.instagram_handle", e.target.value)
                            }
                        />
                    </F>
                    <F label="URL">
                        <input
                            value={c.instagram_url}
                            onChange={(e) =>
                                set("contact.instagram_url", e.target.value)
                            }
                        />
                    </F>
                </div>
            </Block>
        </div>
    );
}

function PropertiesPanel({ data, setData, uploadFile }) {
    const [open, setOpen] = useState(null);
    const props = data.properties;

    function updateProp(i, key, val) {
        setData((d) => {
            const c = deepCopy(d);
            c.properties[i][key] = val;
            return c;
        });
    }
    function updateImg(i, ii, val) {
        setData((d) => {
            const c = deepCopy(d);
            c.properties[i].images[ii] = val;
            c.properties[i].image = c.properties[i].images[0] || "";
            return c;
        });
    }
    function addImg(i) {
        setData((d) => {
            const c = deepCopy(d);
            if (c.properties[i].images.length >= 8) return c;
            c.properties[i].images.push("");
            return c;
        });
    }
    function removeImg(i, ii) {
        setData((d) => {
            const c = deepCopy(d);
            c.properties[i].images.splice(ii, 1);
            if (!c.properties[i].images.length) c.properties[i].images = [""];
            c.properties[i].image = c.properties[i].images[0] || "";
            return c;
        });
    }
    function addProp() {
        setData((d) => {
            const c = deepCopy(d);
            c.properties.push({
                id: "p" + Date.now(),
                name: "New Property",
                location: "Dubai",
                type: "apartment",
                badge: "For Sale",
                price: "AED 0",
                beds: "0",
                baths: "0",
                size: "0 sqft",
                image: "",
                images: [""],
            });
            return c;
        });
    }
    function delProp(i) {
        if (!confirm("Delete?")) return;
        setData((d) => {
            const c = deepCopy(d);
            c.properties.splice(i, 1);
            return c;
        });
    }

    return (
        <div className="panel on">
            <h1 className="ph">
                Property <em>Listings</em>
            </h1>
            <p className="ps">
                Add, edit or remove listings. Up to 8 photos per property.
            </p>
            <div className="il">
                {props.map((p, i) => (
                    <div className="ic" key={p.id || i}>
                        <div
                            className="ic-h"
                            onClick={() => setOpen(open === i ? null : i)}
                        >
                            <div>
                                <div className="ic-t">{p.name}</div>
                                <div className="ic-m">
                                    {p.location} · {p.price}
                                </div>
                            </div>
                            <div className="ic-a">
                                <button
                                    className="bi d"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        delProp(i);
                                    }}
                                >
                                    ✕
                                </button>
                                <button className="bi">↕</button>
                            </div>
                        </div>
                        {open === i && (
                            <div className="ic-b open">
                                <div className="g2">
                                    <F label="Name">
                                        <input
                                            value={p.name}
                                            onChange={(e) =>
                                                updateProp(
                                                    i,
                                                    "name",
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </F>
                                    <F label="Location">
                                        <input
                                            value={p.location}
                                            onChange={(e) =>
                                                updateProp(
                                                    i,
                                                    "location",
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </F>
                                </div>
                                <div className="g3">
                                    <F label="Type">
                                        <select
                                            value={p.type}
                                            onChange={(e) =>
                                                updateProp(
                                                    i,
                                                    "type",
                                                    e.target.value,
                                                )
                                            }
                                        >
                                            <option value="apartment">
                                                apartment
                                            </option>
                                            <option value="villa">villa</option>
                                            <option value="commercial">
                                                commercial
                                            </option>
                                        </select>
                                    </F>
                                    <F label="Badge">
                                        <input
                                            value={p.badge}
                                            onChange={(e) =>
                                                updateProp(
                                                    i,
                                                    "badge",
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </F>
                                    <F label="Price">
                                        <input
                                            value={p.price}
                                            onChange={(e) =>
                                                updateProp(
                                                    i,
                                                    "price",
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </F>
                                </div>
                                <div className="g3">
                                    <F label="Beds">
                                        <input
                                            value={p.beds}
                                            onChange={(e) =>
                                                updateProp(
                                                    i,
                                                    "beds",
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </F>
                                    <F label="Baths">
                                        <input
                                            value={p.baths}
                                            onChange={(e) =>
                                                updateProp(
                                                    i,
                                                    "baths",
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </F>
                                    <F label="Size">
                                        <input
                                            value={p.size}
                                            onChange={(e) =>
                                                updateProp(
                                                    i,
                                                    "size",
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </F>
                                </div>
                                <div className="bk-t" style={{ marginTop: 14 }}>
                                    Photos
                                </div>
                                {p.images.map((img, ii) => (
                                    <ImgField
                                        key={ii}
                                        label={`Photo ${ii + 1}${ii === 0 ? " — main" : ""}`}
                                        value={img}
                                        onChange={(v) => updateImg(i, ii, v)}
                                        onUpload={(f) =>
                                            uploadFile(f, (url) =>
                                                updateImg(i, ii, url),
                                            )
                                        }
                                    />
                                ))}
                                <button
                                    className="add-img"
                                    onClick={() => addImg(i)}
                                >
                                    + Add Another Photo
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <button className="add" onClick={addProp}>
                + Add New Property
            </button>
        </div>
    );
}

function TestimonialsPanel({ data, setData }) {
    const [open, setOpen] = useState(null);
    const testis = data.testimonials;

    function update(i, key, val) {
        setData((d) => {
            const c = deepCopy(d);
            c.testimonials[i][key] = val;
            return c;
        });
    }
    function add() {
        setData((d) => {
            const c = deepCopy(d);
            c.testimonials.push({
                id: "t" + Date.now(),
                name: "Client Name",
                from: "Investor · Dubai",
                text: "Write review here...",
            });
            return c;
        });
    }
    function del(i) {
        if (!confirm("Delete?")) return;
        setData((d) => {
            const c = deepCopy(d);
            c.testimonials.splice(i, 1);
            return c;
        });
    }

    return (
        <div className="panel on">
            <h1 className="ph">
                Client <em>Testimonials</em>
            </h1>
            <p className="ps">The middle card is automatically styled gold.</p>
            <div className="il">
                {testis.map((t, i) => (
                    <div className="ic" key={t.id || i}>
                        <div
                            className="ic-h"
                            onClick={() => setOpen(open === i ? null : i)}
                        >
                            <div>
                                <div className="ic-t">
                                    {t.name}
                                    {i === 1 && (
                                        <span
                                            style={{
                                                color: "#C9A84C",
                                                fontSize: ".7rem",
                                            }}
                                        >
                                            {" "}
                                            (gold card)
                                        </span>
                                    )}
                                </div>
                                <div className="ic-m">{t.from}</div>
                            </div>
                            <div className="ic-a">
                                <button
                                    className="bi d"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        del(i);
                                    }}
                                >
                                    ✕
                                </button>
                                <button className="bi">↕</button>
                            </div>
                        </div>
                        {open === i && (
                            <div className="ic-b open">
                                <div className="g2">
                                    <F label="Client Name">
                                        <input
                                            value={t.name}
                                            onChange={(e) =>
                                                update(
                                                    i,
                                                    "name",
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </F>
                                    <F label="From">
                                        <input
                                            value={t.from}
                                            onChange={(e) =>
                                                update(
                                                    i,
                                                    "from",
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </F>
                                </div>
                                <F label="Review Text">
                                    <textarea
                                        value={t.text}
                                        onChange={(e) =>
                                            update(i, "text", e.target.value)
                                        }
                                    />
                                </F>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <button className="add" onClick={add}>
                + Add Testimonial
            </button>
        </div>
    );
}

function TeamPanel({ data, setData, uploadFile }) {
    const [open, setOpen] = useState(null);
    const team = data.team;

    function update(i, key, val) {
        setData((d) => {
            const c = deepCopy(d);
            c.team[i][key] = val;
            return c;
        });
    }
    function add() {
        setData((d) => {
            const c = deepCopy(d);
            c.team.push({
                id: "m" + Date.now(),
                role: "Advisor",
                name_line1: "Name",
                name_line2: "",
                bio: "Bio...",
                photo: "",
                cred_value: "",
                cred_label: "",
                languages: ["Arabic", "English"],
            });
            return c;
        });
    }
    function del(i) {
        if (!confirm("Delete?")) return;
        setData((d) => {
            const c = deepCopy(d);
            c.team.splice(i, 1);
            return c;
        });
    }

    return (
        <div className="panel on">
            <h1 className="ph">
                Team <em>Members</em>
            </h1>
            <div className="il">
                {team.map((m, i) => (
                    <div className="ic" key={m.id || i}>
                        <div
                            className="ic-h"
                            onClick={() => setOpen(open === i ? null : i)}
                        >
                            <div>
                                <div className="ic-t">
                                    0{i + 1} — {m.role}
                                </div>
                                <div className="ic-m">
                                    {(m.languages || []).join(", ") ||
                                        "No languages set"}
                                </div>
                            </div>
                            <div className="ic-a">
                                <button
                                    className="bi d"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        del(i);
                                    }}
                                >
                                    ✕
                                </button>
                                <button className="bi">↕</button>
                            </div>
                        </div>
                        {open === i && (
                            <div className="ic-b open">
                                <div className="g2">
                                    <F label="Role">
                                        <input
                                            value={m.role}
                                            onChange={(e) =>
                                                update(
                                                    i,
                                                    "role",
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </F>
                                    <F label="Name Line 1">
                                        <input
                                            value={m.name_line1}
                                            onChange={(e) =>
                                                update(
                                                    i,
                                                    "name_line1",
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </F>
                                </div>
                                <F label="Name Line 2 (blank = single line)">
                                    <input
                                        value={m.name_line2}
                                        onChange={(e) =>
                                            update(
                                                i,
                                                "name_line2",
                                                e.target.value,
                                            )
                                        }
                                    />
                                </F>
                                <F label="Bio">
                                    <textarea
                                        style={{ minHeight: 140 }}
                                        value={m.bio}
                                        onChange={(e) =>
                                            update(i, "bio", e.target.value)
                                        }
                                    />
                                </F>
                                <div className="g2">
                                    <F label="Credential Value">
                                        <input
                                            value={m.cred_value}
                                            onChange={(e) =>
                                                update(
                                                    i,
                                                    "cred_value",
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </F>
                                    <F label="Credential Label">
                                        <input
                                            value={m.cred_label}
                                            onChange={(e) =>
                                                update(
                                                    i,
                                                    "cred_label",
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </F>
                                </div>
                                <F label="Languages (comma separated)">
                                    <input
                                        value={(m.languages || []).join(", ")}
                                        onChange={(e) =>
                                            update(
                                                i,
                                                "languages",
                                                e.target.value
                                                    .split(",")
                                                    .map((s) => s.trim())
                                                    .filter(Boolean),
                                            )
                                        }
                                    />
                                </F>
                                <ImgField
                                    label="Photo"
                                    value={m.photo}
                                    onChange={(v) => update(i, "photo", v)}
                                    onUpload={(f) =>
                                        uploadFile(f, (url) =>
                                            update(i, "photo", url),
                                        )
                                    }
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <button className="add" onClick={add}>
                + Add Team Member
            </button>
        </div>
    );
}
