"use client";

import { useReducedMotion, motion } from "framer-motion";
import Link from "next/link";

/* ── Animation variants ──────────────────────────────────── */
const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.15,
    },
  },
};

function makeItem(reduce: boolean | null) {
  return {
    hidden: { opacity: 0, y: reduce ? 0 : 44 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduce ? 0.01 : 1.15,
        ease: "easeOut" as const,
      },
    },
  };
}

/* ── Scroll indicator ────────────────────────────────────── */
function ScrollIndicator({ reduce }: { reduce: boolean | null }) {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.2, duration: 1 }}
      aria-hidden
    >
      <span className="font-sans text-[9px] uppercase tracking-[0.28em] text-stone/50">
        Scroll
      </span>
      <motion.div
        animate={reduce ? {} : { y: [0, 7, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg
          className="h-4 w-4 text-stone/40"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}

/* ── Main component ──────────────────────────────────────── */
export default function HeroSection() {
  const reduce = useReducedMotion();
  const item = makeItem(reduce);

  return (
    <section
      id="hero"
      aria-label="Présentation Lucidus Studio"
      className="hero-grain relative flex h-screen min-h-[660px] flex-col items-center justify-center overflow-hidden bg-[#0A0A0A]"
    >
      {/* ── Background orbs ─────────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* Gold — top left */}
        <div
          className="animate-orb-1 absolute -left-[18%] top-[8%] h-[65vh] w-[65vh] will-change-transform"
          style={{
            background:
              "radial-gradient(circle at center, rgba(201,138,16,0.24) 0%, transparent 70%)",
            filter: "blur(64px)",
          }}
        />
        {/* Deep violet — top right */}
        <div
          className="animate-orb-2 absolute -right-[12%] top-[15%] h-[55vh] w-[55vh] will-change-transform"
          style={{
            background:
              "radial-gradient(circle at center, rgba(91,33,182,0.20) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        {/* Ember — bottom center */}
        <div
          className="animate-orb-3 absolute bottom-[2%] left-[28%] h-[42vh] w-[55vh] will-change-transform"
          style={{
            background:
              "radial-gradient(circle at center, rgba(184,58,24,0.16) 0%, transparent 70%)",
            filter: "blur(96px)",
          }}
        />

        {/* Scan line sweep */}
        <div
          className="hero-scan-line absolute left-0 right-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(to right, transparent 0%, rgba(201,138,16,0.45) 30%, rgba(212,168,53,0.55) 50%, rgba(201,138,16,0.45) 70%, transparent 100%)",
          }}
        />
      </div>

      {/* ── Content ─────────────────────────────────────── */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 text-center"
      >
        {/* Service badge */}
        <motion.div variants={item} className="mb-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-gold/[0.07] px-4 py-1.5 font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-gold">
            Montage vidéo · Personal branding
          </span>
        </motion.div>

        {/* H1 */}
        <motion.h1
          variants={item}
          className="mb-8 max-w-4xl font-playfair text-5xl font-bold leading-[1.06] tracking-[-0.025em] text-warm-white sm:text-6xl lg:text-7xl xl:text-[5.25rem]"
        >
          L&apos;image que tu projettes
          <br />
          est ton premier{" "}
          <em className="text-gradient-brand">closing.</em>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={item}
          className="mb-12 max-w-[34rem] font-sans text-lg font-light leading-[1.85] text-stone sm:text-xl"
        >
          Lucidus Studio façonne ta présence vidéo sur-mesure.{" "}
          <br className="hidden md:block" />
          Pour les entrepreneurs qui savent que chaque détail compte.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={item}
          className="flex flex-col items-center gap-4 sm:flex-row"
        >
          {/* Primary CTA */}
          <Link
            href="#contact"
            className="group relative cursor-pointer overflow-hidden rounded-full bg-gradient-to-r from-[#C98A10] to-[#D4A835] px-8 py-[14px] font-sans text-sm font-semibold text-[#0A0A0A] shadow-[0_0_48px_rgba(201,138,16,0.28)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_72px_rgba(201,138,16,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]"
          >
            {/* Shimmer on hover */}
            <span
              aria-hidden
              className="absolute inset-0 -translate-x-full skew-x-[-20deg] bg-white/20 transition-transform duration-500 group-hover:translate-x-[200%]"
            />
            <span className="relative">Configurer mon offre</span>
          </Link>

          {/* Secondary CTA */}
          <Link
            href="#realisations"
            className="cursor-pointer rounded-full border border-warm-white/15 px-8 py-[14px] font-sans text-sm font-medium text-warm-white/70 transition-all duration-300 hover:border-gold/45 hover:text-warm-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]"
          >
            Voir les réalisations
          </Link>
        </motion.div>

        {/* Reassurance */}
        <motion.p
          variants={item}
          className="mt-7 font-sans text-xs tracking-wide text-stone/55"
        >
          Réponse sous 24h&nbsp;&nbsp;·&nbsp;&nbsp;Offres modulables&nbsp;&nbsp;·&nbsp;&nbsp;Sans engagement
        </motion.p>
      </motion.div>

      {/* ── Scroll indicator ────────────────────────────── */}
      <ScrollIndicator reduce={reduce} />
    </section>
  );
}
