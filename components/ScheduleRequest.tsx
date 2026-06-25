"use client";

import { useMemo, useState } from "react";
import { CheckCircle } from "lucide-react";

const G = "#0A7935";
const GOLD = "#F5A800";
const INK = "#0E1A0F";
const CREAM = "#FEFDF8";
const FORMSPREE = "https://formspree.io/f/xwvypjal";

const LEAD_HOURS_NEW = 24;          // new service: earliest window start ≥ 24h out (after-lunch request → next afternoon)
const CURRENT_DAY1_MIN_HOUR = 11;   // current customers: NO same-day; next day earliest, windows starting 11 AM or later on day 1

// New customers: broad 3-hour windows (route-planning room)
const WINDOWS_NEW = [
  { id: "morning", label: "Morning", hours: "8–11 AM", startHour: 8 },
  { id: "midday", label: "Midday", hours: "11 AM–2 PM", startHour: 11 },
  { id: "afternoon", label: "Afternoon", hours: "2–5 PM", startHour: 14 },
];

// Current customers: tighter 2-hour arrival ranges
const WINDOWS_CURRENT = [
  { id: "w810", label: "8–10 AM", hours: "8–10 AM", startHour: 8 },
  { id: "w1012", label: "10–12", hours: "10 AM–12 PM", startHour: 10 },
  { id: "w111", label: "11–1 PM", hours: "11 AM–1 PM", startHour: 11 },
  { id: "w122", label: "12–2 PM", hours: "12–2 PM", startHour: 12 },
  { id: "w24", label: "2–4 PM", hours: "2–4 PM", startHour: 14 },
  { id: "w35", label: "3–5 PM", hours: "3–5 PM", startHour: 15 },
];

const SERVICES = [
  "Pest Control (bi-monthly)",
  "Termite — Sentricon®",
  "Mosquito Yard Barrier",
  "Tick Treatment",
  "Re-service (current customer)",
  "Not sure — free inspection",
];

type Day = { iso: string; dow: string; day: number; mon: string; date: Date };

function upcomingWeekdays(count: number, includeToday: boolean): Day[] {
  const days: Day[] = [];
  const d = new Date();
  if (!includeToday) d.setDate(d.getDate() + 1);
  while (days.length < count) {
    const dow = d.getDay();
    if (dow !== 0 && dow !== 6) {
      days.push({
        iso: d.toISOString().slice(0, 10),
        dow: d.toLocaleDateString("en-US", { weekday: "short" }),
        day: d.getDate(),
        mon: d.toLocaleDateString("en-US", { month: "short" }),
        date: new Date(d),
      });
    }
    d.setDate(d.getDate() + 1);
  }
  return days;
}

function windowStart(day: Day, startHour: number) {
  const dt = new Date(day.date);
  dt.setHours(startHour, 0, 0, 0);
  return dt;
}

export default function ScheduleRequest({ city }: { city?: string }) {
  const [customerType, setCustomerType] = useState<"new" | "current">("new");
  const isCurrent = customerType === "current";
  const windows = isCurrent ? WINDOWS_CURRENT : WINDOWS_NEW;

  // Never same-day for anyone — day strip starts tomorrow
  const days = useMemo(() => upcomingWeekdays(8, false), [isCurrent]);
  const now = useMemo(() => new Date(), [customerType]); // eslint-disable-line react-hooks/exhaustive-deps

  // Window rule:
  //  - New customers: window start must be ≥ LEAD_HOURS_NEW from now
  //  - Current customers: next day OK, but on the FIRST offered day only windows starting 11 AM+
  const windowOK = (d: Day, startHour: number, isFirstDay: boolean) => {
    if (isCurrent) {
      return !isFirstDay || startHour >= CURRENT_DAY1_MIN_HOUR;
    }
    return windowStart(d, startHour).getTime() - now.getTime() >= LEAD_HOURS_NEW * 3600_000;
  };

  const availableDays = days.filter((d, i) =>
    windows.some((w) => windowOK(d, w.startHour, i === 0))
  );

  const [date, setDate] = useState("");
  const activeDate = availableDays.find((d) => d.iso === date) ?? availableDays[0];
  const firstDayIso = days[0]?.iso;
  const availableWindows = windows.filter(
    (w) => activeDate && windowOK(activeDate, w.startHour, activeDate.iso === firstDayIso)
  );

  const [win, setWin] = useState("");
  const activeWin = availableWindows.find((w) => w.id === win) ?? availableWindows[0];

  const [service, setService] = useState(SERVICES[0]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [zip, setZip] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  const valid =
    name.trim().length > 1 && /\d{3}.*\d{3}.*\d{4}/.test(phone) && /^\d{5}$/.test(zip.trim()) && !!activeDate && !!activeWin;

  async function submit() {
    if (!valid || state === "sending") return;
    setState("sending");
    try {
      const res = await fetch(FORMSPREE, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `📅 ${isCurrent ? "CURRENT CUSTOMER" : "NEW"} Schedule Request — ${activeDate.dow} ${activeDate.mon} ${activeDate.day}, ${activeWin.hours}`,
          requestType: "Schedule Request",
          customerType: isCurrent ? "Current customer" : "New customer",
          preferredDate: activeDate.iso,
          preferredWindow: activeWin.hours,
          service,
          name: name.trim(),
          phone: phone.trim(),
          zip: zip.trim(),
          page: typeof window !== "undefined" ? window.location.pathname : "",
          city: city ?? "",
          submittedAt: new Date().toISOString(),
        }),
      });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div style={wrap}>
        <div style={{ textAlign: "center", padding: "12px 0" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}><CheckCircle size={44} color={G} strokeWidth={1.8} aria-hidden="true" /></div>
          <h3 style={{ ...display, fontSize: 26, margin: "0 0 10px" }}>
            Got it, {name.split(" ")[0]} — request received.
          </h3>
          <p style={{ ...body, maxWidth: 470, margin: "0 auto 6px" }}>
            Requested: <strong>{activeDate.dow}, {activeDate.mon} {activeDate.day} — {activeWin.hours}</strong>.
            A member of our team will call or text <strong>{phone}</strong> to confirm this window or offer the closest fit.
          </p>
          <p style={{ ...body, fontSize: 13.5, color: "#5b6f60", maxWidth: 470, margin: "0 auto" }}>
            Most visits are exterior-only, so you don&rsquo;t need to be home. Need us sooner? Call{" "}
            <a href="tel:2059406360" style={{ color: G, fontWeight: 700 }}>(205) 940-6360</a>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={wrap}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>
        <h3 style={{ ...display, fontSize: 24, margin: 0 }}>Request a preferred service window</h3>
        <span style={{ ...body, fontSize: 13, color: "#5b6f60" }}>Confirmed by a real person — call or text</span>
      </div>

      {/* Customer type */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {([["new", "I\u2019m a new customer"], ["current", "I\u2019m a current customer"]] as const).map(([id, label]) => {
          const on = customerType === id;
          return (
            <button key={id} onClick={() => { setCustomerType(id); setDate(""); setWin(""); }} aria-pressed={on} style={{
              ...chip, flex: 1, padding: "11px 12px", fontWeight: 600, fontSize: 14,
              background: on ? INK : "#fff", color: on ? "#fff" : INK, borderColor: on ? INK : "#E4E0D4",
            }}>
              {label}
            </button>
          );
        })}
      </div>

      {isCurrent && (
        <p style={{ ...body, fontSize: 13, color: G, fontWeight: 600, margin: "0 0 12px" }}>
          Welcome back — current customers get tighter 2-hour windows, starting as soon as tomorrow.
          Need us sooner? Call <a href="tel:2059406360" style={{ color: G, fontWeight: 700 }}>(205) 940-6360</a>.
        </p>
      )}

      {/* Day strip */}
      <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 6, marginBottom: 14 }}>
        {availableDays.map((d) => {
          const on = d.iso === activeDate?.iso;
          return (
            <button key={d.iso} onClick={() => { setDate(d.iso); setWin(""); }} aria-pressed={on} style={{
              ...chip, minWidth: 64, flexDirection: "column", gap: 2,
              background: on ? INK : "#fff", color: on ? "#fff" : INK, borderColor: on ? INK : "#E4E0D4",
            }}>
              <span style={{ fontSize: 11, fontWeight: 600, opacity: 0.75 }}>{d.dow}</span>
              <span style={{ fontSize: 18, fontWeight: 700 }}>{d.day}</span>
              <span style={{ fontSize: 10.5, opacity: 0.7 }}>{d.mon}</span>
            </button>
          );
        })}
      </div>

      {/* Time windows — only those clearing the lead-time rule */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
        {availableWindows.map((w) => {
          const on = w.id === activeWin?.id;
          return (
            <button key={w.id} onClick={() => setWin(w.id)} aria-pressed={on} style={{
              ...chip, flex: isCurrent ? "1 1 100px" : "1 1 140px", flexDirection: "column", gap: 2, padding: "12px 10px",
              background: on ? GOLD : "#fff", borderColor: on ? GOLD : "#E4E0D4", color: INK,
              boxShadow: on ? "0 2px 10px rgba(245,168,0,0.35)" : "none",
            }}>
              <span style={{ fontWeight: 700, fontSize: 14 }}>{w.label}</span>
              {!isCurrent && <span style={{ fontSize: 12.5, opacity: 0.75 }}>{w.hours}</span>}
            </button>
          );
        })}
      </div>

      {/* Details */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 10, marginBottom: 14 }}>
        <select value={service} onChange={(e) => setService(e.target.value)} aria-label="Service needed" style={{ ...field, gridColumn: "1 / -1" }}>
          {SERVICES.map((s) => <option key={s}>{s}</option>)}
        </select>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" aria-label="Name" style={field} />
        <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" inputMode="tel" aria-label="Phone" style={field} />
        <input value={zip} onChange={(e) => setZip(e.target.value)} placeholder="ZIP" inputMode="numeric" maxLength={5} aria-label="ZIP code" style={field} />
      </div>

      <button onClick={submit} disabled={!valid || state === "sending"} style={{
        width: "100%", padding: "15px 24px", borderRadius: 999, border: "none",
        background: valid ? G : "#C9D4CC", color: "#fff", fontWeight: 700, fontSize: 16,
        cursor: valid ? "pointer" : "not-allowed", fontFamily: bodyFont, transition: "background 0.15s",
      }}>
        {state === "sending" ? "Sending…" : "Request this window"}
      </button>

      {state === "error" && (
        <p style={{ ...body, color: "#B4231F", fontSize: 13.5, marginTop: 10, textAlign: "center" }}>
          That didn&rsquo;t go through. Call <a href="tel:2059406360" style={{ color: G, fontWeight: 700 }}>(205) 940-6360</a> and we&rsquo;ll set it up directly.
        </p>
      )}
      <p style={{ ...body, fontSize: 12, color: "#8a948c", marginTop: 10, textAlign: "center" }}>
        Requested windows are held pending confirmation by our office · Mon–Fri 8–5
      </p>
    </div>
  );
}

const displayFont = "var(--font-serif)";
const bodyFont = "var(--font-sans)";
const display: React.CSSProperties = { fontFamily: displayFont, fontWeight: 500, color: INK };
const body: React.CSSProperties = { fontFamily: bodyFont, color: "#374151", lineHeight: 1.6, fontSize: 15 };
const wrap: React.CSSProperties = {
  background: CREAM, border: "1px solid #E8E2D8", borderRadius: 18,
  padding: "26px 24px", maxWidth: 680, margin: "0 auto",
  boxShadow: "0 8px 30px rgba(14,26,15,0.06)",
};
const chip: React.CSSProperties = {
  display: "flex", alignItems: "center", justifyContent: "center",
  border: "1.5px solid", borderRadius: 12, padding: "10px 12px",
  cursor: "pointer", fontFamily: bodyFont, transition: "all 0.15s",
};
const field: React.CSSProperties = {
  padding: "13px 14px", borderRadius: 10, border: "1px solid #E4E0D4",
  fontFamily: bodyFont, fontSize: 15, color: INK, background: "#fff", outline: "none",
};
