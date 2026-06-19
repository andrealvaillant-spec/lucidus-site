"use client";

import { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Link from "next/link";

const navLinks = [
  { label: "À propos", href: "#presentation" },
  { label: "Services", href: "#services" },
  { label: "Réalisations", href: "#realisations" },
  { label: "Témoignages", href: "#temoignages" },
];

function AsteriskIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 44 44"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect x="19" y="1" width="6" height="42" rx="3" />
      <rect
        x="19"
        y="1"
        width="6"
        height="42"
        rx="3"
        transform="rotate(45 22 22)"
      />
      <rect
        x="19"
        y="1"
        width="6"
        height="42"
        rx="3"
        transform="rotate(90 22 22)"
      />
      <rect
        x="19"
        y="1"
        width="6"
        height="42"
        rx="3"
        transform="rotate(135 22 22)"
      />
    </svg>
  );
}

export default function Navbar() {
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { scrollYProgress, scrollY } = useScroll();

  useEffect(() => {
    return scrollY.on("change", (v) => setScrolled(v > 40));
  }, [scrollY]);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    const prev = scrollYProgress.getPrevious() ?? 0;
    if (scrollYProgress.get() < 0.04) {
      setVisible(true);
    } else {
      setVisible(current - prev < 0);
    }
  });

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <AnimatePresence>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: visible ? 0 : -100 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 z-[100]"
      >
        {/* Main bar */}
        <motion.div
          animate={{
            backgroundColor: scrolled
              ? "rgba(10, 10, 10, 0.92)"
              : "rgba(10, 10, 10, 0.35)",
            borderBottomColor: scrolled
              ? "rgba(201, 138, 16, 0.18)"
              : "rgba(255, 255, 255, 0.04)",
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="border-b backdrop-blur-md"
        >
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            {/* ── Logo ── */}
            <Link
              href="/"
              className="group flex items-center gap-2.5"
              aria-label="Lucidus Studio — Accueil"
            >
              <AsteriskIcon className="h-7 w-7 text-gold transition-transform duration-500 group-hover:rotate-[22.5deg]" />
              <span className="font-display text-lg font-bold tracking-tight text-warm-white">
                Lucidus{" "}
                <span className="font-serif font-normal italic text-stone">
                  studio
                </span>
              </span>
            </Link>

            {/* ── Desktop nav ── */}
            <nav
              className="hidden items-center gap-8 md:flex"
              aria-label="Navigation principale"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group relative cursor-pointer text-sm font-medium text-stone transition-colors duration-200 hover:text-gold"
                >
                  {link.label}
                  {/* underline reveal */}
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-0.5 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full"
                  />
                </Link>
              ))}
            </nav>

            {/* ── CTA + Hamburger ── */}
            <div className="flex items-center gap-4">
              <Link
                href="#contact"
                className="hidden cursor-pointer items-center rounded-full border border-gold px-5 py-2 text-sm font-medium text-gold transition-all duration-200 hover:bg-gold hover:text-void md:inline-flex"
              >
                Travaillons ensemble
              </Link>

              {/* Hamburger button */}
              <button
                onClick={() => setMobileOpen((prev) => !prev)}
                className="flex cursor-pointer flex-col gap-1.5 p-1 md:hidden"
                aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
              >
                <motion.span
                  animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="block h-0.5 w-6 origin-center bg-warm-white"
                />
                <motion.span
                  animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.15 }}
                  className="block h-0.5 w-6 bg-warm-white"
                />
                <motion.span
                  animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="block h-0.5 w-6 origin-center bg-warm-white"
                />
              </button>
            </div>
          </div>
        </motion.div>

        {/* ── Mobile menu ── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden border-b border-[rgba(201,138,16,0.15)] bg-void/95 backdrop-blur-md"
            >
              <nav
                className="flex flex-col gap-5 px-6 py-6"
                aria-label="Navigation mobile"
              >
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.2 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="cursor-pointer text-base font-medium text-stone transition-colors duration-200 hover:text-gold"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.06, duration: 0.2 }}
                  className="pt-2"
                >
                  <Link
                    href="#contact"
                    onClick={() => setMobileOpen(false)}
                    className="inline-flex cursor-pointer items-center rounded-full border border-gold px-5 py-2.5 text-sm font-medium text-gold transition-all duration-200 hover:bg-gold hover:text-void"
                  >
                    Travaillons ensemble
                  </Link>
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </AnimatePresence>
  );
}
