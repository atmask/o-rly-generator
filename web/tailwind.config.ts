import type {Config} from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}", './public/index.html'],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;
