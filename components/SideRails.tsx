"use client";
// The left and right margins on wide screens: the wall of mayors, 12 per side
// in order like the real wall at the Mayor's Office. Purely decorative.
import { usePathname } from "next/navigation";
import { railMayors } from "@/lib/content";
import { Portrait } from "./Decor";

export function SideRails() {
  // The projector pages use the full width.
  if (usePathname().startsWith("/wall/")) return null;

  return (
    <>
      <aside className="rail rail-left" aria-hidden>
        <div className="map-strip">
        </div>
        <div className="rail-wall">
          <div className="rail-portraits">
            {railMayors.slice(0, 12).map((m) => (
              <Portrait key={m.id} mayor={m} size="sm" />
            ))}
          </div>
        </div>
      </aside>

      <aside className="rail rail-right" aria-hidden>
        <div className="map-strip">
        </div>
        <div className="rail-wall">
          <div className="rail-portraits">
            {railMayors.slice(12, 24).map((m) => (
              <Portrait key={m.id} mayor={m} size="sm" />
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}
