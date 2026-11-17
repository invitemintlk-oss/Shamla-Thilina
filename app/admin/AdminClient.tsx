"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, Link2, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { C, F, invitation as inv } from "../data";
import { displayName, guestPath, PREFIXES, type Prefix } from "../guest";

const border = "1px solid rgba(204, 111, 141, 0.45)";
const label = "mb-2 block text-[0.68rem] uppercase tracking-[0.18em]";

function buildMessage(display: string, link: string) {
  return `Dear ${display} ❤️

With joyful hearts, we warmly invite you to celebrate one of the most special days of our lives as we begin our journey together.

Please view our wedding invitation and all the event details through the link below 🌐:

${link}

Your presence would truly mean the world to us, and we would be honored to celebrate this beautiful moment together.

With love,
❤️ ${inv.groom} & ${inv.bride}`;
}

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // clipboard API is blocked on plain-http pages — fall back to a hidden textarea
    const ta = Object.assign(document.createElement("textarea"), { value: text });
    ta.style.cssText = "position:fixed;opacity:0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    ta.remove();
    return ok;
  }
}

export default function AdminClient() {
  const [prefix, setPrefix] = useState<Prefix>("Mr.");
  const [name, setName] = useState("");
  const [result, setResult] = useState<{ display: string; link: string; message: string } | null>(null);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");

  // editing the inputs invalidates the generated link, so copy can never send a stale one
  useEffect(() => setResult(null), [prefix, name]);

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(""), 2000);
    return () => clearTimeout(id);
  }, [toast]);

  const generate = (e: React.FormEvent) => {
    e.preventDefault();
    const display = displayName(prefix, name);
    if (!display) return setError("Please enter the guest's name.");
    setError("");
    const link = `${window.location.origin}/${guestPath(display)}`;
    setResult({ display, link, message: buildMessage(display, link) });
  };

  const copy = async (text: string, msg: string) => {
    setToast((await copyText(text)) ? msg : "Couldn't copy — please select and copy manually.");
  };

  return (
    <main className="min-h-screen px-4 py-12 sm:py-16" style={{ background: C.bg, color: C.ink, fontFamily: F.body }}>
      <div className="mx-auto max-w-xl">
        <header className="mb-8 text-center">
          <p className="mb-2 text-[0.7rem] uppercase tracking-[0.34em]" style={{ fontFamily: F.sans, color: C.gold }}>
            Admin
          </p>
          <h1 style={{ fontFamily: F.deco, color: C.green, fontSize: "clamp(1.5rem,5vw,2.1rem)", letterSpacing: "0.05em" }}>Invitation Links</h1>
          <p className="mt-1" style={{ color: C.muted }}>
            {inv.groom} &amp; {inv.bride} · {inv.dateLong}
          </p>
        </header>

        <form onSubmit={generate} className="rounded-2xl p-6 sm:p-8" style={{ background: C.card, border, boxShadow: "0 24px 50px -36px rgba(55,40,80,0.4)" }}>
          <div className="grid gap-5 sm:grid-cols-[160px_1fr]">
            <div>
              <label htmlFor="ad-prefix" className={label} style={{ fontFamily: F.sans, color: C.gold }}>
                Prefix
              </label>
              <select
                id="ad-prefix"
                value={prefix}
                onChange={(e) => setPrefix(e.target.value as Prefix)}
                className="w-full px-3 py-3 text-[1.05rem] focus:outline-none"
                style={{ background: C.bg, border, borderRadius: 10, color: C.ink }}
              >
                {PREFIXES.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="ad-name" className={label} style={{ fontFamily: F.sans, color: C.gold }}>
                Guest name
              </label>
              <input
                id="ad-name"
                type="text"
                placeholder="e.g. Sanjaya"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={60}
                className="w-full px-4 py-3 text-[1.05rem] focus:outline-none"
                style={{ background: C.bg, border, borderRadius: 10, color: C.ink }}
              />
            </div>
          </div>

          {error && (
            <p className="mt-4 text-sm" style={{ color: "#B5476A" }} role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-[0.78rem] font-semibold uppercase tracking-[0.2em] transition-transform hover:-translate-y-0.5 active:scale-95"
            style={{ fontFamily: F.sans, background: "linear-gradient(135deg,#868DB8,#5F679A)", color: C.cream }}
          >
            <Link2 className="h-4 w-4" aria-hidden />
            Generate Link
          </button>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <CopyBtn disabled={!result} onClick={() => result && copy(result.link, "Link copied!")} icon={<Copy className="h-4 w-4" aria-hidden />}>
              Copy Link Only
            </CopyBtn>
            <CopyBtn disabled={!result} onClick={() => result && copy(result.message, "Message copied!")} icon={<MessageCircle className="h-4 w-4" aria-hidden />}>
              Copy Full Message
            </CopyBtn>
          </div>
        </form>

        {result && (
          <section className="mt-6 space-y-5" aria-live="polite">
            <div>
              <p className={label} style={{ fontFamily: F.sans, color: C.gold }}>
                Generated link
              </p>
              <a
                href={result.link}
                target="_blank"
                rel="noreferrer"
                className="block break-all rounded-xl px-4 py-3 text-[0.95rem] underline-offset-2 hover:underline"
                style={{ background: C.card, border, color: C.green, fontFamily: F.sans }}
              >
                {result.link}
              </a>
            </div>
            <div>
              <p className={label} style={{ fontFamily: F.sans, color: C.gold }}>
                Message preview
              </p>
              <pre
                className="whitespace-pre-wrap break-words rounded-xl px-5 py-4 text-[1.02rem] leading-relaxed"
                style={{ background: C.card, border, color: C.ink, fontFamily: F.body }}
              >
                {result.message}
              </pre>
            </div>
          </section>
        )}
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            role="status"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            className="fixed bottom-6 left-1/2 z-50 inline-flex -translate-x-1/2 items-center gap-2 rounded-full px-5 py-2.5 text-sm shadow-lg"
            style={{ background: C.greenDark, color: C.cream, fontFamily: F.sans }}
          >
            <Check className="h-4 w-4" aria-hidden />
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

function CopyBtn({ disabled, onClick, icon, children }: { disabled: boolean; onClick: () => void; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="inline-flex items-center justify-center gap-2 rounded-full px-3 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.14em] transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40"
      style={{ fontFamily: F.sans, border: `1px solid ${C.green}`, color: C.green, background: "transparent" }}
    >
      {icon}
      {children}
    </button>
  );
}
