import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#0A0A0A",
        umber: "#151009",
        elevated: "#1E160D",
        gold: "#C98A10",
        ember: "#B83A18",
        "deep-ember": "#8B2810",
        champagne: "#D4A835",
        "warm-white": "#F5EFE6",
        stone: "#9E8E7E",
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-outfit)", "sans-serif"],
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        playfair: ["var(--font-playfair)", "Georgia", "serif"],
      },
      backgroundImage: {
        "gradient-brand":
          "linear-gradient(135deg, #8B2810 0%, #C98A10 60%, #D4A835 100%)",
        "gradient-brand-subtle":
          "linear-gradient(135deg, rgba(139,40,16,0.15) 0%, rgba(201,138,16,0.15) 100%)",
      },
      keyframes: {
        orbFloat1: {
          "0%, 100%": {
            transform: "translate(0%, 0%) scale(1)",
            opacity: "0.22",
          },
          "33%": {
            transform: "translate(8%, 6%) scale(1.07)",
            opacity: "0.30",
          },
          "66%": {
            transform: "translate(-5%, 9%) scale(0.94)",
            opacity: "0.18",
          },
        },
        orbFloat2: {
          "0%, 100%": {
            transform: "translate(0%, 0%) scale(1.04)",
            opacity: "0.18",
          },
          "40%": {
            transform: "translate(-9%, -6%) scale(0.93)",
            opacity: "0.26",
          },
          "70%": {
            transform: "translate(7%, -9%) scale(1.10)",
            opacity: "0.20",
          },
        },
        orbFloat3: {
          "0%, 100%": {
            transform: "translate(0%, 0%) scale(0.93)",
            opacity: "0.16",
          },
          "50%": {
            transform: "translate(6%, 11%) scale(1.09)",
            opacity: "0.24",
          },
        },
      },
      animation: {
        "orb-1": "orbFloat1 16s ease-in-out infinite",
        "orb-2": "orbFloat2 21s ease-in-out infinite",
        "orb-3": "orbFloat3 26s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
