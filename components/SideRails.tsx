"use client";
// The left and right margins on wide screens: framed mayors on the wall above
// a desk edge covered in newspapers, papers and books. Purely decorative.
import { usePathname } from "next/navigation";
import { clippings, wallOfMayors } from "@/lib/content";
import { Book, Newspaper, Portrait, Sheet } from "./Decor";

export function SideRails() {
  // The projector wall uses the full width.
  if (usePathname() === "/wall") return null;

  const left = wallOfMayors.slice(0, 4);
  const right = wallOfMayors.slice(4, 8);

  return (
    <>
      <aside className="rail rail-left" aria-hidden>
        <div className="map-strip">
          <span className="script-quote">Ang lungsod ay para sa lahat.</span>
        </div>
        <div className="rail-wall">
          <div className="rail-portraits">
            {left.map((m) => (
              <Portrait key={m.id} mayor={m} size="sm" />
            ))}
          </div>
        </div>
        <div className="rail-desk">
          <Sheet rotate={-12} lined style={{ left: "8%", top: "6%" }} />
          <Book color="#3c5c8a" rotate={8} style={{ right: "6%", top: "4%" }} />
          <Newspaper {...clippings[0]} rotate={-7} className="np-sm" style={{ left: "4%", top: "22%" }} />
          <Newspaper {...clippings[1]} rotate={9} className="np-sm" style={{ right: "2%", top: "40%" }} />
          <Sheet rotate={4} style={{ left: "20%", bottom: "8%" }} />
          <Book color="#8a3a28" rotate={-14} style={{ left: "10%", bottom: "4%" }} />
        </div>
      </aside>

      <aside className="rail rail-right" aria-hidden>
        <div className="map-strip">
          <span className="script-quote">Ikaw ang tinig ng Maynila.</span>
        </div>
        <div className="rail-wall">
          <div className="rail-portraits">
            {right.map((m) => (
              <Portrait key={m.id} mayor={m} size="sm" />
            ))}
          </div>
        </div>
        <div className="rail-desk">
          <Book color="#5d7a3a" rotate={-6} style={{ left: "6%", top: "5%" }} />
          <Newspaper {...clippings[3]} rotate={6} className="np-sm" style={{ right: "4%", top: "14%" }} />
          <Sheet rotate={-9} lined style={{ right: "12%", bottom: "16%" }} />
          <Newspaper {...clippings[5]} rotate={-10} className="np-sm" style={{ left: "2%", top: "42%" }} />
          <Book color="#c98f3b" rotate={12} style={{ right: "8%", bottom: "4%" }} />
        </div>
      </aside>
    </>
  );
}
