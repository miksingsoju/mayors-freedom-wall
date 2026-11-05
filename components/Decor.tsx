// Decorative pieces drawn from the Mayor's Office wall: framed portraits,
// newspapers on the desk, the teal map panels, and the chair behind the desk.
import { useId } from "react";
import type { Look, WallMayor } from "@/lib/content";

/* ---------- Portraits ---------- */

const attireColor = { suit: "#2b2624", barong: "#efe6d2", blouse: "#c7d9e6" };

function PortraitArt({ look }: { look: Look }) {
  const uid = useId().replace(/:/g, "");
  const { skin, hair, hairColor, attire, glasses } = look;
  return (
    <svg viewBox="0 0 100 125" className="portrait-art" aria-hidden>
      <defs>
        <radialGradient id={`bg${uid}`} cx="50%" cy="38%" r="75%">
          <stop offset="0" stopColor="#d9c3a0" />
          <stop offset="0.6" stopColor="#a98a63" />
          <stop offset="1" stopColor="#5e4630" />
        </radialGradient>
        <linearGradient id={`sh${uid}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.18" />
          <stop offset="1" stopColor="#000" stopOpacity="0.25" />
        </linearGradient>
      </defs>
      <rect width="100" height="125" fill={`url(#bg${uid})`} />
      {/* shoulders */}
      <path d="M6 125 C8 97 27 87 50 87 C73 87 92 97 94 125 Z" fill={attireColor[attire]} />
      {attire === "suit" && (
        <>
          <path d="M41 88 L50 110 L59 88 Z" fill="#f4efe6" />
          <path d="M48 94 L50 114 L52 94 Z" fill="#7a2a22" />
        </>
      )}
      {attire === "barong" && (
        <g stroke="#cdbf9f" strokeWidth="0.8" fill="none">
          <path d="M44 89 L50 98 L56 89" />
          <path d="M50 98 L50 125" />
          <path d="M45 104 q5 4 10 0 M45 110 q5 4 10 0 M45 116 q5 4 10 0" />
        </g>
      )}
      {attire === "blouse" && <path d="M40 89 Q50 100 60 89" stroke="#9fb6c6" strokeWidth="1.5" fill="none" />}
      <path d="M6 125 C8 97 27 87 50 87 C73 87 92 97 94 125 Z" fill={`url(#sh${uid})`} />
      {/* neck, ears, head */}
      <rect x="43" y="70" width="14" height="20" rx="5" fill={skin} />
      <rect x="43" y="70" width="14" height="20" rx="5" fill="#000" opacity="0.12" />
      <ellipse cx="33.5" cy="58" rx="3.5" ry="5.5" fill={skin} />
      <ellipse cx="66.5" cy="58" rx="3.5" ry="5.5" fill={skin} />
      <ellipse cx="50" cy="56" rx="16.5" ry="20.5" fill={skin} />
      <ellipse cx="44" cy="50" rx="6" ry="9" fill="#fff" opacity="0.12" />
      {/* hair */}
      {hair === "short" && <path d="M33 54 C31 35 41 30 50 30 C60 30 69 35 67 54 C66 44 60 39 50 39 C40 39 34 44 33 54Z" fill={hairColor} />}
      {hair === "slick" && <path d="M33 52 C32 33 44 29 52 29 C62 30 69 37 67 52 C64 41 57 37 46 38 C40 39 35 44 33 52Z" fill={hairColor} />}
      {hair === "wave" && <path d="M33 54 C30 36 40 28 51 29 C63 30 70 38 67 54 C65 45 62 42 56 40 C52 43 45 42 41 40 C37 43 34 47 33 54Z" fill={hairColor} />}
      {hair === "bald" && <path d="M33 56 C32 47 34 42 37 40 C36 46 35 51 35 58Z M67 56 C68 47 66 42 63 40 C64 46 65 51 65 58Z" fill={hairColor} />}
      {hair === "bob" && (
        <path d="M30 66 C26 36 41 28 51 29 C66 30 74 42 70 66 C68 74 64 77 61 77 L63 52 C58 42 42 42 37 52 L39 77 C35 77 31 73 30 66Z" fill={hairColor} />
      )}
      {/* face */}
      <path d="M40 50 q4 -2 7 0 M53 50 q4 -2 7 0" stroke="#3a2a20" strokeWidth="1.1" fill="none" />
      <ellipse cx="43.5" cy="55" rx="1.6" ry="1.2" fill="#2a1d16" />
      <ellipse cx="56.5" cy="55" rx="1.6" ry="1.2" fill="#2a1d16" />
      <path d="M50 57 q-1.5 6 0 8" stroke="#000" strokeOpacity="0.2" strokeWidth="1" fill="none" />
      <path d="M45 68 q5 3 10 0" stroke="#7a3f30" strokeWidth="1.2" fill="none" />
      {glasses && (
        <g stroke="#2a2420" strokeWidth="1" fill="none">
          <rect x="38.5" y="51" width="10" height="7.5" rx="2.5" />
          <rect x="51.5" y="51" width="10" height="7.5" rx="2.5" />
          <path d="M48.5 54 h3" />
        </g>
      )}
    </svg>
  );
}

export function Portrait({ mayor, size = "md", plate = true }: { mayor: WallMayor; size?: "sm" | "md" | "lg"; plate?: boolean }) {
  return (
    <figure className={`portrait portrait-${size}`}>
      <div className="frame">
        {mayor.photo ? <img src={mayor.photo} alt={mayor.name} className="portrait-art" /> : <PortraitArt look={mayor.look} />}
      </div>
      {plate && <figcaption className="plate">{size === "sm" ? mayor.short : mayor.name}</figcaption>}
    </figure>
  );
}

/* ---------- Newspapers & desk clutter ---------- */

export function Newspaper({
  masthead,
  headline,
  date,
  rotate = 0,
  children,
  className = "",
  style,
}: {
  masthead: string;
  headline: string;
  date: string;
  rotate?: number;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <article className={`newspaper ${className}`} style={{ ...style, transform: `rotate(${rotate}deg)` }}>
      <div className="np-mast">{masthead}</div>
      <div className="np-dateline">
        <span>{date}</span>
        <span>Maynila</span>
        <span>₱5.00</span>
      </div>
      <h4 className="np-head">{headline}</h4>
      {children ?? (
        <div className="np-body" aria-hidden>
          <div className="np-photo" />
          <div className="np-lines" />
          <div className="np-lines" />
        </div>
      )}
    </article>
  );
}

export function Sheet({ rotate, style, lined }: { rotate: number; style: React.CSSProperties; lined?: boolean }) {
  return <div className={lined ? "sheet lined" : "sheet"} style={{ ...style, transform: `rotate(${rotate}deg)` }} aria-hidden />;
}

export function Book({ color, rotate, style }: { color: string; rotate: number; style: React.CSSProperties }) {
  return <div className="book" style={{ ...style, background: color, transform: `rotate(${rotate}deg)` }} aria-hidden />;
}

/* ---------- Emblem (exhibit mark, not the official city seal) ---------- */

export function Emblem({ size = 120 }: { size?: number }) {
  const uid = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 200 200" width={size} height={size} className="emblem" aria-label="Mayor's Freedom Wall emblem">
      <defs>
        <path id={`ring${uid}`} d="M100 100 m-74 0 a74 74 0 1 1 148 0 a74 74 0 1 1 -148 0" />
      </defs>
      <circle cx="100" cy="100" r="97" fill="#fbf8f1" stroke="#2a211b" strokeWidth="3" />
      <circle cx="100" cy="100" r="58" fill="none" stroke="#2a211b" strokeWidth="2" />
      <text fontFamily="var(--font-display)" fontSize="17" fontWeight="700" letterSpacing="3" fill="#2a211b">
        <textPath href={`#ring${uid}`} startOffset="2%">
          MAYOR&apos;S FREEDOM WALL ★ MAYNILA ★ MALAYANG PAHAYAG ★
        </textPath>
      </text>
      {/* Clock tower */}
      <g transform="translate(100 104)">
        <rect x="-15" y="-10" width="30" height="48" fill="#6e2b1d" />
        <rect x="-11" y="-30" width="22" height="22" fill="#8a3a28" />
        <path d="M-13 -30 L0 -50 L13 -30 Z" fill="#2a211b" />
        <circle cx="0" cy="-19" r="7.5" fill="#fbf8f1" stroke="#2a211b" strokeWidth="1.5" />
        <path d="M0 -19 V-24 M0 -19 H4" stroke="#2a211b" strokeWidth="1.3" />
        <rect x="-6" y="12" width="12" height="26" rx="6" fill="#2a211b" />
        <path d="M-40 38 H40" stroke="#2a211b" strokeWidth="2" />
        <path d="M-36 44 q9 -5 18 0 t18 0 t18 0 t18 0" stroke="#5fae9c" strokeWidth="2.5" fill="none" />
      </g>
    </svg>
  );
}

/* ---------- The Mayor's seat ---------- */

export function MayorScene({ seated, name }: { seated: boolean; name?: string }) {
  return (
    <svg viewBox="0 0 800 330" className="scene" role="img" aria-label="The Mayor's desk and chair">
      <defs>
        <linearGradient id="leather" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#5a3326" />
          <stop offset="1" stopColor="#2c1710" />
        </linearGradient>
        <linearGradient id="deskTop" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#3d2619" />
          <stop offset="1" stopColor="#24150e" />
        </linearGradient>
        <radialGradient id="spot" cx="50%" cy="40%" r="50%">
          <stop offset="0" stopColor="#fff6d8" stopOpacity="0.9" />
          <stop offset="1" stopColor="#fff6d8" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* back wall + teal map panels */}
      <rect width="800" height="330" fill="#f4efe4" />
      <rect x="0" width="70" height="330" fill="#a9dccf" />
      <rect x="730" width="70" height="330" fill="#a9dccf" />
      <g stroke="#fff" strokeOpacity="0.6" fill="none">
        <path d="M0 40 L70 70 M0 120 L70 95 M20 0 L35 330 M0 210 L70 250 M50 0 L60 330" />
        <path d="M730 60 L800 30 M730 150 L800 180 M760 0 L745 330 M730 260 L800 240 M785 0 L790 330" />
      </g>

      {/* small framed portraits on either wall */}
      {[0, 1].map((side) =>
        [0, 1].map((row) =>
          [0, 1, 2, 3].map((col) => {
            const x = side === 0 ? 92 + col * 52 : 506 + col * 52;
            const y = 22 + row * 64;
            return (
              <g key={`${side}${row}${col}`}>
                <rect x={x} y={y} width="42" height="52" fill="#6e2b1d" />
                <rect x={x + 4} y={y + 4} width="34" height="44" fill="#a98a63" />
                <ellipse cx={x + 21} cy={y + 22} rx="7" ry="9" fill="#c99467" />
                <path d={`M${x + 8} ${y + 48} q13 -16 26 0`} fill="#2b2624" />
              </g>
            );
          }),
        ),
      )}

      {/* emblem behind the chair */}
      <circle cx="400" cy="92" r="58" fill="#fbf8f1" stroke="#2a211b" strokeWidth="2.5" />
      <circle cx="400" cy="92" r="40" fill="none" stroke="#2a211b" strokeWidth="1.5" />
      <g transform="translate(400 96)">
        <rect x="-9" y="-6" width="18" height="30" fill="#6e2b1d" />
        <rect x="-7" y="-19" width="14" height="14" fill="#8a3a28" />
        <path d="M-8 -19 L0 -31 L8 -19 Z" fill="#2a211b" />
        <circle cx="0" cy="-12" r="4.5" fill="#fbf8f1" />
      </g>

      {seated && <ellipse cx="400" cy="200" rx="150" ry="110" fill="url(#spot)" />}

      {/* chair */}
      <rect x="338" y="138" width="124" height="128" rx="16" fill="url(#leather)" />
      <rect x="332" y="132" width="136" height="20" rx="10" fill="#4a2a1f" />
      {[0, 1, 2].map((r) =>
        [0, 1, 2, 3].map((c) => <circle key={`${r}${c}`} cx={358 + c * 28 + (r % 2) * 14} cy={168 + r * 26} r="2.6" fill="#1c0e09" />),
      )}

      {/* desk */}
      <path d="M130 250 H670 L720 292 H80 Z" fill="url(#deskTop)" />
      <rect x="80" y="292" width="640" height="38" fill="#1c100a" />
      {/* clutter on the desk */}
      <g>
        <rect x="170" y="258" width="70" height="22" fill="#f1e8d4" transform="rotate(-6 205 269)" />
        <rect x="215" y="262" width="60" height="18" fill="#3c5c8a" transform="rotate(4 245 271)" />
        <rect x="300" y="256" width="80" height="26" fill="#ece4d1" transform="rotate(2 340 269)" />
        <rect x="430" y="258" width="64" height="20" fill="#5d7a3a" transform="rotate(-3 462 268)" />
        <rect x="470" y="262" width="96" height="24" fill="#f6f1e6" transform="rotate(5 518 274)" />
        <rect x="590" y="256" width="52" height="24" fill="#c98f3b" transform="rotate(-8 616 268)" />
        <rect x="140" y="270" width="48" height="16" fill="#8a3a28" transform="rotate(10 164 278)" />
      </g>
      {/* brass nameplate */}
      <rect x="320" y="296" width="160" height="22" rx="2" fill="#b8924a" />
      <text x="400" y="311.5" textAnchor="middle" fontSize="11" fontFamily="var(--font-display)" fontWeight="700" fill="#2a211b" letterSpacing="1.5">
        {seated ? `HON. ${(name || "YOU").toUpperCase().slice(0, 22)}` : "OFFICE OF THE MAYOR"}
      </text>
    </svg>
  );
}
