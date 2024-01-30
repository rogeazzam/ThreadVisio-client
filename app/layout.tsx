import "./globals.css";
import ThemeProviders from "../darkmode/ThemeProviders";
import ThemeSwitcher from "../darkmode/ThemeSwitcher";
import { Footer } from "@/components";

export const metadata = {
  title: "ThreadVisio Clothes shop",
  description: "Create your own cloth.",
};

export default function RootLayout({ children, }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className='relative'>
        <ThemeProviders>
          <ThemeSwitcher />
          {children}
        </ThemeProviders>
        <Footer />
      </body>
    </html>
  );
}
