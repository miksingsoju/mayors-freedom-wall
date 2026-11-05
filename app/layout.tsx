import type { Metadata } from "next";
import { Kaushan_Script, Lora, Mrs_Saint_Delafield, Playfair_Display, Special_Elite, UnifrakturMaguntia } from "next/font/google";
import Link from "next/link";
import { Emblem } from "@/components/Decor";
import { SideRails } from "@/components/SideRails";
import "./globals.css";

const display = Playfair_Display({ subsets: ["latin"], weight: ["400", "700", "900"], variable: "--font-display" });
const body = Lora({ subsets: ["latin"], variable: "--font-body" });
const masthead = UnifrakturMaguntia({ subsets: ["latin"], weight: "400", variable: "--font-masthead" });
const script = Kaushan_Script({ subsets: ["latin"], weight: "400", variable: "--font-script" });
const signature = Mrs_Saint_Delafield({ subsets: ["latin"], weight: "400", variable: "--font-signature" });
const typewriter = Special_Elite({ subsets: ["latin"], weight: "400", variable: "--font-typewriter" });

export const metadata: Metadata = {
  title: "Mayor's Freedom Wall",
  description: "Interactive exhibit prototype — Manila Clock Tower, Mayor's Office",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const fonts = [display, body, masthead, script, signature, typewriter].map((f) => f.variable).join(" ");
  return (
    <html lang="en" className={fonts}>
      <body>
        <nav className="topnav">
          <Link href="/" className="brand">
            <Emblem size={34} />
            <span>
              Mayor&apos;s Freedom Wall <em className="brand-script">Tara na!</em>
            </span>
          </Link>
          <div className="navlinks">
            <Link href="/citizen">I · Citizen</Link>
            <Link href="/mayor">II · Mayor</Link>
            <Link href="/ballot">III · Ballot</Link>
            <Link href="/wall">Projector Wall</Link>
          </div>
        </nav>
        <SideRails />
        <main className="stage">{children}</main>
      </body>
    </html>
  );
}
