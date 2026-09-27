import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Corn & Cheese brand palette — taken from the logo.
        white: "#FFFFFF",
        ink: "#0A0A0A",
        brand: {
          DEFAULT: "#1677FF",
          soft: "#EAF2FF",
        },
        offwhite: "#F7F8FA",
        grey: "#5F6368",
        line: "#E5E7EB",
        // The Corn/Cheese concept split, reserved for the two words when they
        // are specifically called out as the brand's two halves (Who We Are's
        // Corn/Cheese explainer). Distinct from `brand`, which stays the
        // site's one general accent/interactive colour everywhere else.
        corn: "#4FADFF",
        cheese: "#0B3D91",
      },
      fontFamily: {
        display: ["var(--font-montserrat)", "system-ui", "sans-serif"],
        body: ["var(--font-raleway)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.045em",
      },
      transitionTimingFunction: {
        // The single easing curve the whole site animates on.
        brand: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      maxWidth: {
        editorial: "1600px",
      },
    },
  },
  plugins: [],
};

export default config;
