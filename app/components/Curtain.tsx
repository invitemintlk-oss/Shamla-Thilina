"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import { useEffect } from "react";
import { C, F, invitation as inv } from "../data";

const shadow = "0 1px 10px rgba(255,252,253,0.9)";
const ease = [0.65, 0, 0.35, 1] as const;

export default function Curtain({ open, onOpen, guest }: { open: boolean; onOpen: () => void; guest?: string }) {
  // lock page scroll while the curtain is closed
  useEffect(() => {
    document.documentElement.style.overflow = open ? "" : "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {!open && (
        <motion.div
          key="curtain"
          className="fixed inset-0 z-[600] pointer-events-auto"
          role="dialog"
          aria-label="Tap to open the invitation"
          exit={{ opacity: 0, transition: { duration: 0.5, delay: 1.2 } }}
        >
          <motion.div
            className="absolute inset-0"
            style={{ background: "radial-gradient(ellipse at center, #FDF7F9, #EFDDE4)" }}
            exit={{ opacity: 0, transition: { duration: 0.9, delay: 0.5 } }}
          />
          <motion.div
            className="absolute left-0 right-0 top-0 z-10 h-3"
            style={{ background: `linear-gradient(to bottom, ${C.gold}, ${C.goldLight}, ${C.gold})`, boxShadow: "0 3px 10px rgba(0,0,0,0.25)" }}
            exit={{ y: -20, transition: { duration: 0.6, delay: 1 } }}
          />

          {/* left drape */}
          <motion.div
            className="absolute left-0 top-0 h-full w-1/2 origin-left overflow-hidden"
            style={{
              background: "repeating-linear-gradient(90deg, #F7E4EA 0px, #FEF8FA 18px, #F7E4EA 36px, #EAC9D3 56px, #F7E4EA 72px)",
              boxShadow: "inset -20px 0 40px rgba(110,80,120,0.16), 0 10px 30px rgba(110,80,120,0.2)",
            }}
            exit={{ x: "-100%", scaleX: 0.6, transition: { duration: 1.4, ease } }}
          >
            <div className="absolute inset-0 opacity-50" style={{ background: "repeating-linear-gradient(90deg, transparent 0px, transparent 50px, rgba(110,80,120,0.08) 54px, transparent 62px)" }} />
          </motion.div>

          {/* right drape */}
          <motion.div
            className="absolute right-0 top-0 h-full w-1/2 origin-right overflow-hidden"
            style={{
              background: "repeating-linear-gradient(90deg, #F7E4EA 0px, #EAC9D3 16px, #F7E4EA 36px, #FEF8FA 54px, #F7E4EA 72px)",
              boxShadow: "inset 20px 0 40px rgba(110,80,120,0.16), 0 10px 30px rgba(110,80,120,0.2)",
            }}
            exit={{ x: "100%", scaleX: 0.6, transition: { duration: 1.4, ease } }}
          >
            <div className="absolute inset-0 opacity-50" style={{ background: "repeating-linear-gradient(90deg, transparent 0px, transparent 50px, rgba(110,80,120,0.08) 54px, transparent 62px)" }} />
          </motion.div>

          {/* centre card */}
          <motion.div
            className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center p-6"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] } }}
            exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.4 } }}
          >
            <div className="pointer-events-auto max-w-sm text-center">
              <div className="mb-5 flex justify-center">
                <motion.span animate={{ scale: [1, 1.12, 1] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
                  <Heart className="h-10 w-10 fill-current" style={{ color: C.gold, filter: "drop-shadow(0 2px 6px rgba(170,90,120,0.3))" }} aria-hidden />
                </motion.span>
              </div>
              <p className="mb-4 text-[10px] uppercase tracking-[0.5em]" style={{ fontFamily: F.sans, color: C.gold, textShadow: shadow }}>
                You&apos;re Invited
              </p>
              <h2
                className="mb-3 uppercase leading-[1.05]"
                style={{
                  fontFamily: F.deco,
                  color: C.green,
                  fontSize: "clamp(2rem,7vw,2.9rem)",
                  letterSpacing: "0.06em",
                  textShadow: shadow,
                }}
              >
                <span className="block">{inv.groom}</span>
                <span className="my-0.5 block" style={{ fontFamily: F.script, color: C.gold, textTransform: "none", fontSize: "0.72em", lineHeight: 1 }}>
                  &amp;
                </span>
                <span className="block">{inv.bride}</span>
              </h2>
              {guest ? (
                <p className="mx-auto mb-8 max-w-[30ch] text-[0.95rem] italic leading-relaxed" style={{ fontFamily: F.body, color: C.ink, textShadow: shadow }}>
                  We cordially invite
                  <span className="my-1.5 block not-italic" style={{ fontFamily: F.script, color: C.green, fontSize: "clamp(1.9rem,6vw,2.4rem)", lineHeight: 1.1 }}>
                    {guest}
                  </span>
                  to celebrate our special day with us.
                </p>
              ) : (
                <p className="mb-8 text-sm italic" style={{ fontFamily: F.body, color: C.ink, textShadow: shadow }}>
                  Request the honour of your presence
                </p>
              )}
              <motion.button
                type="button"
                onClick={onOpen}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full px-9 py-4 text-xs font-semibold uppercase tracking-[0.3em] sm:text-[0.82rem]"
                aria-label="Open invitation"
                style={{
                  fontFamily: F.sans,
                  color: C.green,
                  background: "linear-gradient(135deg, #F9CFDA 0%, #F6B7C7 42%, #CC6F8D 100%)",
                  boxShadow:
                    "0 16px 38px rgba(170, 90, 120, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.7), 0 0 0 1px rgba(204, 111, 141, 0.9), 0 0 24px rgba(246, 183, 199, 0.38)",
                }}
              >
                <span
                  aria-hidden="true"
                  className="lv-shine pointer-events-none absolute inset-y-0 w-1/3 -skew-x-12"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent)" }}
                />
                <span aria-hidden="true" className="pointer-events-none absolute inset-[3px] rounded-full" style={{ border: "1px solid rgba(255, 252, 253, 0.55)" }} />
                <Sparkles className="relative h-4 w-4" aria-hidden />
                <span className="relative">Open Invitation</span>
              </motion.button>
              <p className="mt-6 text-[10px] uppercase tracking-[0.3em]" style={{ fontFamily: F.sans, color: C.muted, textShadow: shadow }}>
                Tap to begin
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
