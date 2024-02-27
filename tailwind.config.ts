import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import scrollbar from "tailwind-scrollbar";
import container from "@tailwindcss/container-queries";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
    },
  },
  plugins: [container, scrollbar({ nocompatible: true })],
} satisfies Config;
