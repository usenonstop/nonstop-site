import { type Config } from "tailwindcss";
import scrollbar from "tailwind-scrollbar";
import container from "@tailwindcss/container-queries";
import headlessui from "@headlessui/tailwindcss";

const colors = {
  nonstop: {
    "ns-25": "#f4f9fd",
    "ns-50": "#dfebf8",
    "ns-100": "#b4d1ee",
    "ns-200": "#86b7e8",
    "ns-300": "#64a3e2",
    "ns-400": "#277acd",
    "ns-500": "#2063a6",
    "ns-600": "#003971",
    "ns-700": "#113559",
    "ns-gray-50": "#f9fafb",
    "ns-gray-100": "#f2f4f7",
    "ns-gray-200": "#e4e7ec",
    "ns-gray-300": "#d0d5dd",
    "ns-gray-400": "#98a2b3",
    "ns-gray-500": "#667085",
    "ns-gray-600": "#475467",
    "ns-gray-700": "#344054",
    "ns-gray-800": "#1d2939",
    "ns-gray-900": "#101828",
  },
};

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      boxShadow: {
        "inner-bottom": "inset 0 0 20px hsl(0,0%,0%,0.07)",
      },
      fontFamily: {
        baloo: ["Baloo2"],
        outfit: ["Outfit"],
        "open-sans": ["Open Sans"],
      },
      colors: colors.nonstop,
    },
  },
  plugins: [headlessui, container, scrollbar({ nocompatible: true })],
} satisfies Config;
