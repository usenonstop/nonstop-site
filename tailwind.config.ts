import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import scrollbar from "tailwind-scrollbar";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
    },
  },
  plugins: [scrollbar({ nocompatible: true })],
} satisfies Config;
