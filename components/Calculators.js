"use client";

import { useState } from "react";

const fmt = (n) => "AED " + Math.round(n).toLocaleString("en-AE");
const pct = (n, d = 2) => n.toFixed(d) + "%";

function Donut({ a, b }) {
    const size = 106,
        r = 36,
        cx = size / 2,
        cy = size / 2;
    const circ = 2 * Math.PI * r;
    const slice = (a / (a + b)) * circ;
    const offset = circ * 0.25;
    return (
        <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            style={{ flexShrink: 0 }}
        >
            <circle
                cx={cx}
                cy={cy}
                r={r}
                fill="none"
                stroke="rgba(0,0,0,0.08)"
                strokeWidth="11"
            />
            <circle
                cx={cx}
                cy={cy}
                r={r}
                fill="none"
                stroke="#C9A84C"
                strokeWidth="11"
                strokeDasharray={`${slice} ${circ - slice}`}
                strokeDashoffset={offset}
                strokeLinecap="round"
            />
        </svg>
    );
}

function ResultRow({ label, value, variant, style }) {
    return (
        <div
            className={`calc-result-row${variant === "highlight" ? " calc-result-row--highlight" : ""}`}
        >
            <span className="calc-result-row__lbl" style={style}>
                {label}
            </span>
            <span
                className={`calc-result-row__val${variant ? ` calc-result-row__val--${variant}` : ""}`}
            >
                {value}
            </span>
        </div>
    );
}

function LeadCapture({ title, sub }) {
    const [value, setValue] = useState("");
    const [sent, setSent] = useState(false);
    const submit = () => {
        if (!value.trim()) return;
        setSent(true);
    };
    return (
        <div className="calc-lead">
            <p className="calc-lead__title">{title}</p>
            <p className="calc-lead__sub">{sub}</p>
            <div className="calc-lead__row">
                <input
                    className="calc-lead__input"
                    type="tel"
                    placeholder="Your WhatsApp number"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    disabled={sent}
                />
                <button
                    className={`calc-lead__btn${sent ? " sent" : ""}`}
                    onClick={submit}
                    disabled={sent}
                >
                    {sent ? "✓ Sent!" : "Send →"}
                </button>
            </div>
        </div>
    );
}

const TERMS = [5, 10, 15, 20, 25];

function Slider({
    id,
    label,
    value,
    onChange,
    min,
    max,
    step,
    suffix,
    bounds,
}) {
    const pctFill = ((value - min) / (max - min)) * 100;
    return (
        <div className="calc-field">
            <label className="calc-label">
                {label}{" "}
                <em>
                    {value}
                    {suffix}
                </em>
            </label>
            <div className="calc-slider-wrap">
                <input
                    className="calc-slider"
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={(e) => onChange(parseFloat(e.target.value))}
                    style={{
                        background: `linear-gradient(to right, #C9A84C 0%, #C9A84C ${pctFill}%, rgba(0,0,0,0.1) ${pctFill}%, rgba(0,0,0,0.1) 100%)`,
                    }}
                />
                <div className="calc-slider-meta">
                    <div className="calc-slider-bounds">
                        <span>{bounds[0]}</span>
                        <span>{bounds[1]}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ── PANEL 1: MORTGAGE ── */
function MortgagePanel() {
    const [price, setPrice] = useState(2000000);
    const [dpPct, setDpPct] = useState(20);
    const [rate, setRate] = useState(4.5);
    const [term, setTerm] = useState(20);
    const [fees, setFees] = useState(100000);
    const [result, setResult] = useState(null);

    const calculate = () => {
        const dp = (price * dpPct) / 100;
        const loan = price - dp;
        const r = rate / 100 / 12;
        const n = term * 12;
        const monthly =
            r === 0
                ? loan / n
                : (loan * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
        const totalPay = monthly * n;
        const totalInt = totalPay - loan;
        const totalCost = totalPay + dp + fees;
        setResult({ dp, loan, monthly, totalPay, totalInt, totalCost });
    };

    return (
        <div className="calc-panel is-active">
            <div className="calc-layout">
                <div className="calc-card">
                    <h3 className="calc-card__title">Mortgage Calculator</h3>
                    <p className="calc-card__sub">
                        Calculate your total mortgage cost based on UAE bank
                        rates and your down payment.
                    </p>

                    <div className="calc-field">
                        <label className="calc-label">Property Price</label>
                        <div className="calc-input-wrap">
                            <span className="calc-prefix">AED</span>
                            <input
                                className="calc-input calc-input--prefix"
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(+e.target.value)}
                            />
                        </div>
                    </div>

                    <Slider
                        label="Down Payment"
                        value={dpPct}
                        onChange={setDpPct}
                        min={5}
                        max={80}
                        step={1}
                        suffix="%"
                        bounds={["5%", "80%"]}
                    />
                    <p className="calc-info" style={{ marginTop: -8 }}>
                        AED{" "}
                        {Math.round((price * dpPct) / 100).toLocaleString(
                            "en-AE",
                        )}
                    </p>

                    <Slider
                        label="Annual Interest Rate"
                        value={rate}
                        onChange={setRate}
                        min={1}
                        max={12}
                        step={0.1}
                        suffix="%"
                        bounds={["1%", "12%"]}
                    />
                    <div className="calc-info">
                        <strong>UAE Typical Rates:</strong> Fixed 1-3yr:
                        3.5-4.5% · Variable: 4-5.5% · Ex-pat: +0.5-1%
                    </div>

                    <div className="calc-field">
                        <label className="calc-label">Loan Term</label>
                        <div className="calc-terms">
                            {TERMS.map((t) => (
                                <button
                                    key={t}
                                    className={`calc-term${term === t ? " is-active" : ""}`}
                                    onClick={() => setTerm(t)}
                                >
                                    {t} yr
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="calc-field">
                        <label className="calc-label">
                            Dubai Fees (DLD 4% + Reg ~1%)
                        </label>
                        <div className="calc-input-wrap">
                            <span className="calc-prefix">AED</span>
                            <input
                                className="calc-input calc-input--prefix"
                                type="number"
                                value={fees}
                                onChange={(e) => setFees(+e.target.value)}
                            />
                        </div>
                    </div>

                    <button className="calc-btn" onClick={calculate}>
                        <span>Calculate Mortgage →</span>
                    </button>
                </div>

                <div className="calc-results">
                    {!result ? (
                        <div className="calc-empty">
                            <p>
                                Enter your details and tap{" "}
                                <strong>Calculate</strong> to see your mortgage
                                breakdown
                            </p>
                        </div>
                    ) : (
                        <div className="calc-result-content">
                            <div className="calc-result-hero">
                                <p className="calc-result-hero__lbl">
                                    Monthly Payment
                                </p>
                                <div className="calc-result-hero__val">
                                    {fmt(result.monthly)}
                                </div>
                                <p className="calc-result-hero__sub">
                                    {term} yr loan · {rate.toFixed(1)}% p.a.
                                    interest
                                </p>
                            </div>
                            <div className="calc-donut">
                                <Donut a={result.loan} b={result.totalInt} />
                                <div className="calc-donut__legend">
                                    <div className="calc-donut__item">
                                        <div
                                            className="calc-donut__dot"
                                            style={{ background: "#C9A84C" }}
                                        />
                                        <span className="calc-donut__lbl">
                                            Principal
                                        </span>
                                        <span className="calc-donut__val">
                                            {fmt(result.loan)}
                                        </span>
                                    </div>
                                    <div className="calc-donut__item">
                                        <div
                                            className="calc-donut__dot"
                                            style={{
                                                background:
                                                    "rgba(201,168,76,0.22)",
                                            }}
                                        />
                                        <span className="calc-donut__lbl">
                                            Total Interest
                                        </span>
                                        <span className="calc-donut__val">
                                            {fmt(result.totalInt)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="calc-result-rows">
                                <ResultRow
                                    label="Loan Amount"
                                    value={fmt(result.loan)}
                                />
                                <ResultRow
                                    label={`Down Payment (${dpPct}%)`}
                                    value={fmt(result.dp)}
                                />
                                <ResultRow
                                    label="Total Repayment"
                                    value={fmt(result.totalPay)}
                                />
                                <ResultRow
                                    label="Total Interest"
                                    value={fmt(result.totalInt)}
                                    variant="warn"
                                />
                                <ResultRow
                                    label="Dubai Fees & Costs"
                                    value={fmt(fees)}
                                />
                                <ResultRow
                                    label="Total Cost of Purchase"
                                    value={fmt(result.totalCost)}
                                    variant="gold"
                                    variant2="highlight"
                                />
                            </div>
                            <LeadCapture
                                title="Get a Free Pre-Approval"
                                sub="Our preferred UAE bank partners offer exclusive rates. Leave your WhatsApp and we'll send a personalised quote within 24 hrs."
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

/* ── PANEL 2: MONTHLY PAYMENT ── */
function MonthlyPanel() {
    const [loan, setLoan] = useState(1500000);
    const [rate, setRate] = useState(4.5);
    const [term, setTerm] = useState(20);
    const [type, setType] = useState("repayment");
    const [insure, setInsure] = useState(0);
    const [result, setResult] = useState(null);

    const calculate = () => {
        const r = rate / 100 / 12;
        const n = term * 12;
        let monthly, monthlyInt, monthlyPrincipal;
        if (type === "interest") {
            monthlyInt = loan * r;
            monthlyPrincipal = 0;
            monthly = monthlyInt;
        } else {
            monthly =
                r === 0
                    ? loan / n
                    : (loan * (r * Math.pow(1 + r, n))) /
                      (Math.pow(1 + r, n) - 1);
            monthlyInt = loan * r;
            monthlyPrincipal = monthly - monthlyInt;
        }
        const totalRepay = monthly * n;
        const totalInt =
            type === "interest" ? monthlyInt * n : totalRepay - loan;
        const totalMo = monthly + insure;
        setResult({
            monthly,
            monthlyInt,
            monthlyPrincipal,
            totalRepay,
            totalInt,
            totalMo,
        });
    };

    return (
        <div className="calc-panel is-active">
            <div className="calc-layout">
                <div className="calc-card">
                    <h3 className="calc-card__title">
                        Monthly Payment Estimator
                    </h3>
                    <p className="calc-card__sub">
                        Quickly estimate your monthly repayment based on loan
                        amount, rate, and term.
                    </p>

                    <div className="calc-field">
                        <label className="calc-label">
                            Loan Amount Required
                        </label>
                        <div className="calc-input-wrap">
                            <span className="calc-prefix">AED</span>
                            <input
                                className="calc-input calc-input--prefix"
                                type="number"
                                value={loan}
                                onChange={(e) => setLoan(+e.target.value)}
                            />
                        </div>
                    </div>

                    <Slider
                        label="Annual Interest Rate"
                        value={rate}
                        onChange={setRate}
                        min={1}
                        max={12}
                        step={0.1}
                        suffix="%"
                        bounds={["1%", "12%"]}
                    />
                    <Slider
                        label="Repayment Period"
                        value={term}
                        onChange={setTerm}
                        min={1}
                        max={25}
                        step={1}
                        suffix=" Years"
                        bounds={["1 yr", "25 yr"]}
                    />

                    <div className="calc-field">
                        <label className="calc-label">Repayment Type</label>
                        <div className="calc-input-wrap">
                            <select
                                className="calc-input"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                            >
                                <option value="repayment">
                                    Capital & Interest (Repayment)
                                </option>
                                <option value="interest">Interest Only</option>
                            </select>
                        </div>
                    </div>

                    <div className="calc-field">
                        <label className="calc-label">
                            Monthly Insurance (optional)
                        </label>
                        <div className="calc-input-wrap">
                            <span className="calc-prefix">AED</span>
                            <input
                                className="calc-input calc-input--prefix"
                                type="number"
                                value={insure}
                                onChange={(e) => setInsure(+e.target.value)}
                            />
                        </div>
                    </div>

                    <button className="calc-btn" onClick={calculate}>
                        <span>Estimate Monthly Payment →</span>
                    </button>
                </div>

                <div className="calc-results">
                    {!result ? (
                        <div className="calc-empty">
                            <p>
                                Enter your loan details and tap{" "}
                                <strong>Estimate</strong> to see your monthly
                                payment
                            </p>
                        </div>
                    ) : (
                        <div className="calc-result-content">
                            <div className="calc-result-hero">
                                <p className="calc-result-hero__lbl">
                                    Estimated Monthly Payment
                                </p>
                                <div className="calc-result-hero__val">
                                    {fmt(result.monthly)}
                                </div>
                                <p className="calc-result-hero__sub">
                                    {type === "interest"
                                        ? "Interest Only"
                                        : "Capital & Interest"}{" "}
                                    · {term} yr term
                                </p>
                            </div>
                            <div className="calc-result-rows">
                                <ResultRow
                                    label="Monthly Principal"
                                    value={fmt(result.monthlyPrincipal)}
                                />
                                <ResultRow
                                    label="Monthly Interest"
                                    value={fmt(result.monthlyInt)}
                                    variant="warn"
                                />
                                {insure > 0 && (
                                    <>
                                        <ResultRow
                                            label="Monthly Insurance"
                                            value={fmt(insure)}
                                        />
                                        <ResultRow
                                            label="Total Monthly (inc. insurance)"
                                            value={fmt(result.totalMo)}
                                            variant="gold"
                                        />
                                    </>
                                )}
                                <ResultRow
                                    label={`Total Repayment (${term} yr)`}
                                    value={fmt(result.totalRepay)}
                                />
                                <ResultRow
                                    label="Total Interest Paid"
                                    value={fmt(result.totalInt)}
                                    variant="warn"
                                />
                                <ResultRow
                                    label="Interest as % of Loan"
                                    value={pct((result.totalInt / loan) * 100)}
                                    variant="gold"
                                />
                            </div>
                            <div className="calc-donut">
                                <Donut a={loan} b={result.totalInt} />
                                <div className="calc-donut__legend">
                                    <div className="calc-donut__item">
                                        <div
                                            className="calc-donut__dot"
                                            style={{ background: "#C9A84C" }}
                                        />
                                        <span className="calc-donut__lbl">
                                            Loan Amount
                                        </span>
                                        <span className="calc-donut__val">
                                            {fmt(loan)}
                                        </span>
                                    </div>
                                    <div className="calc-donut__item">
                                        <div
                                            className="calc-donut__dot"
                                            style={{
                                                background:
                                                    "rgba(201,168,76,0.22)",
                                            }}
                                        />
                                        <span className="calc-donut__lbl">
                                            Total Interest
                                        </span>
                                        <span className="calc-donut__val">
                                            {fmt(result.totalInt)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <LeadCapture
                                title="Find the Best UAE Rate"
                                sub="We connect clients with leading UAE banks for the most competitive mortgage rates. Drop your number — we'll respond today."
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

/* ── PANEL 3: RENTAL YIELD ── */
function YieldPanel() {
    const [price, setPrice] = useState(1500000);
    const [rent, setRent] = useState(90000);
    const [service, setService] = useState(15000);
    const [maint, setMaint] = useState(5000);
    const [mgmtPct, setMgmtPct] = useState(5);
    const [vacPct, setVacPct] = useState(8);
    const [dld, setDld] = useState(75000);
    const [result, setResult] = useState(null);

    const calculate = () => {
        const effectiveRent = rent * (1 - vacPct / 100);
        const mgmtFee = (effectiveRent * mgmtPct) / 100;
        const expenses = service + maint + mgmtFee;
        const netRent = effectiveRent - expenses;
        const totalInvest = price + dld;
        const grossYield = rent > 0 ? (rent / price) * 100 : 0;
        const netYield = netRent > 0 ? (netRent / totalInvest) * 100 : 0;
        const monthCash = netRent / 12;
        const payback = netRent > 0 ? totalInvest / netRent : 0;

        let rating, ratingColor;
        if (netYield >= 7) {
            rating = "Excellent";
            ratingColor = "#5CBF85";
        } else if (netYield >= 5) {
            rating = "Good";
            ratingColor = "#C9A84C";
        } else if (netYield >= 3) {
            rating = "Average";
            ratingColor = "#D4904A";
        } else {
            rating = "Low";
            ratingColor = "#E06060";
        }

        const meterWidth = Math.min((netYield / 12) * 100, 100);
        setResult({
            effectiveRent,
            expenses,
            netRent,
            grossYield,
            netYield,
            monthCash,
            payback,
            rating,
            ratingColor,
            meterWidth,
        });
    };

    return (
        <div className="calc-panel is-active">
            <div className="calc-layout">
                <div className="calc-card">
                    <h3 className="calc-card__title">
                        Rental Yield & ROI Calculator
                    </h3>
                    <p className="calc-card__sub">
                        Evaluate your Dubai investment property.
                    </p>

                    <div className="calc-field">
                        <label className="calc-label">Purchase Price</label>
                        <div className="calc-input-wrap">
                            <span className="calc-prefix">AED</span>
                            <input
                                className="calc-input calc-input--prefix"
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(+e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="calc-field">
                        <label className="calc-label">
                            Expected Annual Rent
                        </label>
                        <div className="calc-input-wrap">
                            <span className="calc-prefix">AED</span>
                            <input
                                className="calc-input calc-input--prefix"
                                type="number"
                                value={rent}
                                onChange={(e) => setRent(+e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="calc-field-row calc-field">
                        <div>
                            <label className="calc-label">
                                Annual Service Charge
                            </label>
                            <div className="calc-input-wrap">
                                <span className="calc-prefix">AED</span>
                                <input
                                    className="calc-input calc-input--prefix"
                                    type="number"
                                    value={service}
                                    onChange={(e) =>
                                        setService(+e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <div>
                            <label className="calc-label">
                                Annual Maintenance
                            </label>
                            <div className="calc-input-wrap">
                                <span className="calc-prefix">AED</span>
                                <input
                                    className="calc-input calc-input--prefix"
                                    type="number"
                                    value={maint}
                                    onChange={(e) => setMaint(+e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="calc-field-row calc-field">
                        <div>
                            <label className="calc-label">Management Fee</label>
                            <div className="calc-input-wrap">
                                <input
                                    className="calc-input calc-input--suffix"
                                    type="number"
                                    value={mgmtPct}
                                    onChange={(e) =>
                                        setMgmtPct(+e.target.value)
                                    }
                                />
                                <span className="calc-suffix">%</span>
                            </div>
                        </div>
                        <div>
                            <label className="calc-label">Vacancy Rate</label>
                            <div className="calc-input-wrap">
                                <input
                                    className="calc-input calc-input--suffix"
                                    type="number"
                                    value={vacPct}
                                    onChange={(e) => setVacPct(+e.target.value)}
                                />
                                <span className="calc-suffix">%</span>
                            </div>
                        </div>
                    </div>

                    <div className="calc-field">
                        <label className="calc-label">
                            Dubai Acquisition Costs
                        </label>
                        <div className="calc-input-wrap">
                            <span className="calc-prefix">AED</span>
                            <input
                                className="calc-input calc-input--prefix"
                                type="number"
                                value={dld}
                                onChange={(e) => setDld(+e.target.value)}
                            />
                        </div>
                        <div className="calc-info">
                            <strong>Typical Costs:</strong> DLD Fee 4% ·
                            Registration ~AED 5,000 · Agent Fee 2%
                        </div>
                    </div>

                    <button className="calc-btn" onClick={calculate}>
                        <span>Calculate Yield & ROI →</span>
                    </button>
                </div>

                <div className="calc-results">
                    {!result ? (
                        <div className="calc-empty">
                            <p>
                                Enter your property details and tap{" "}
                                <strong>Calculate</strong> to see your
                                investment return
                            </p>
                        </div>
                    ) : (
                        <div className="calc-result-content">
                            <div className="calc-result-hero">
                                <p className="calc-result-hero__lbl">
                                    Net Rental Yield
                                </p>
                                <div
                                    className="calc-result-hero__val"
                                    style={{ color: result.ratingColor }}
                                >
                                    {result.netYield.toFixed(2)}%
                                </div>
                                <p
                                    className="calc-result-hero__sub"
                                    style={{ color: result.ratingColor }}
                                >
                                    {result.rating} · Dubai average: 5–9%
                                </p>
                            </div>
                            <div className="calc-meter">
                                <div className="calc-meter__head">
                                    <span className="calc-meter__lbl">
                                        Yield Performance
                                    </span>
                                    <span
                                        className="calc-meter__rating"
                                        style={{ color: result.ratingColor }}
                                    >
                                        {result.rating} ·{" "}
                                        {result.netYield.toFixed(2)}%
                                    </span>
                                </div>
                                <div className="calc-meter__track">
                                    <div
                                        className="calc-meter__fill"
                                        style={{
                                            width: result.meterWidth + "%",
                                        }}
                                    />
                                </div>
                                <div className="calc-meter__scale">
                                    <span>0%</span>
                                    <span>3%</span>
                                    <span>6%</span>
                                    <span>9%</span>
                                    <span>12%+</span>
                                </div>
                            </div>
                            <div className="calc-result-rows">
                                <ResultRow
                                    label="Gross Annual Rent"
                                    value={fmt(rent)}
                                />
                                <ResultRow
                                    label={`Effective Rent (${vacPct}% vacancy)`}
                                    value={fmt(result.effectiveRent)}
                                />
                                <ResultRow
                                    label="Total Annual Expenses"
                                    value={fmt(result.expenses)}
                                    variant="warn"
                                />
                                <ResultRow
                                    label="Net Annual Income"
                                    value={fmt(result.netRent)}
                                    variant="green"
                                />
                                <ResultRow
                                    label="Monthly Cash Flow"
                                    value={fmt(result.monthCash)}
                                    variant="green"
                                />
                                <ResultRow
                                    label="Gross Yield"
                                    value={pct(result.grossYield)}
                                />
                                <ResultRow
                                    label="Net ROI on Total Investment"
                                    value={pct(result.netYield)}
                                    style={{ color: result.ratingColor }}
                                />
                                <ResultRow
                                    label="Payback Period"
                                    value={
                                        result.payback > 0
                                            ? result.payback.toFixed(1) + " yrs"
                                            : "N/A"
                                    }
                                />
                            </div>
                            <LeadCapture
                                title="Get a Full Investment Report"
                                sub="We'll send a detailed analysis of comparable properties, realistic rental estimates, and top ROI areas in Dubai — free."
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function Calculators() {
    const [tab, setTab] = useState("mortgage");

    return (
        <section
            className="section section--alt calc-section"
            id="calculators"
            aria-labelledby="calc-h"
        >
            <div className="calc-section__header">
                <p className="eyebrow">Investment Tools</p>
                <h2 className="section-title" id="calc-h">
                    Property <em>Calculators</em>
                </h2>
                <p
                    style={{
                        fontSize: "0.84rem",
                        fontWeight: 300,
                        color: "#666",
                        lineHeight: 1.9,
                        maxWidth: 540,
                        marginTop: 12,
                    }}
                >
                    Make informed investment decisions with our free Dubai
                    property tools. Calculate mortgage costs, estimate monthly
                    payments, and analyse rental yield.
                </p>
            </div>

            <div
                className="calc-tabs"
                role="tablist"
                aria-label="Calculator type"
            >
                <button
                    className={`calc-tab${tab === "mortgage" ? " is-active" : ""}`}
                    onClick={() => setTab("mortgage")}
                >
                    Mortgage Calculator
                </button>
                <button
                    className={`calc-tab${tab === "monthly" ? " is-active" : ""}`}
                    onClick={() => setTab("monthly")}
                >
                    Monthly Payment
                </button>
                <button
                    className={`calc-tab${tab === "yield" ? " is-active" : ""}`}
                    onClick={() => setTab("yield")}
                >
                    Rental Yield & ROI
                </button>
            </div>

            {tab === "mortgage" && <MortgagePanel />}
            {tab === "monthly" && <MonthlyPanel />}
            {tab === "yield" && <YieldPanel />}
        </section>
    );
}
