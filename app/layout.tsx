import type { Metadata } from "next";
import { Lora, Mrs_Saint_Delafield, Playfair_Display } from "next/font/google";
import Link from "next/link";
import { Emblem } from "@/components/Decor";
import { SideRails } from "@/components/SideRails";
import "./globals.css";

const display = Playfair_Display({ subsets: ["latin"], weight: ["400", "700", "900"], variable: "--font-display" });
const body = Lora({ subsets: ["latin"], variable: "--font-body" });
const signature = Mrs_Saint_Delafield({ subsets: ["latin"], weight: "400", variable: "--font-signature" });

export const metadata: Metadata = {
  title: "Mayor's Freedom Wall",
  description: "Interactive exhibit prototype — Manila Clock Tower, Mayor's Office",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const fonts = [display, body, signature].map((f) => f.variable).join(" ");
  return (
    <html lang="en" className={fonts}>
      <body>
        <nav className="topnav">
          <Link href="/" className="brand">
            <Emblem size={34} />
            <span>
              Mayor&apos;s Freedom Wall
            </span>
          </Link>
          <div className="navlinks">
            <Link href="/citizen">Citizen</Link>
            <Link href="/mayor">Mayor</Link>
            <Link href="/ballot">Ballot</Link>
            <Link href="/wall/a">Projector A</Link>
            <Link href="/wall/b">Projector B</Link>
          </div>
        </nav>
        <SideRails />
        <main className="stage">{children}</main>
        <footer className="credits">Map data © OpenStreetMap contributors · Portrait sources listed in the project references</footer>
      </body>
    </html>
  );
}
