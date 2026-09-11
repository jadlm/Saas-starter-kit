import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0F1420",
        "ink-raised": "#161D2E",
        line: "#26314A",
        paper: "#EDEDF0",
        muted: "#8C96AD",
        signal: "#FF6B35",
        "signal-dim": "#D65A2B",
        cyan: "#7DD3D8",
      },
      fontFamily: {
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        blueprint:
          "linear-gradient(rgba(125,211,216,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(125,211,216,0.06) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "40px 40px",
      },
    },
  },
  plugins: [],
};
export default config;
