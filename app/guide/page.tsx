import Link from "next/link";
import { Emblem, Portrait } from "@/components/Decor";
import { featuredMayor, wallOfMayors } from "@/lib/content";

const stations = [
  {
    href: "/citizen",
    title: "Citizen's Voice",
    where: "Laptop 1 · the Citizen chair",
    body: "Answer the prompt of the day as a resident of Manila. Pin your letter to the wall, then upvote, downvote and reply to other visitors.",
  },
  {
    href: "/mayor",
    title: "The Mayor's Dilemma",
    where: "Laptop 2 · the Mayor's desk",
    body: "Take the seat. Read the briefing, sign a proclamation on a real decision from 2019, then see what the mayor actually did.",
  },
  {
    href: "/ballot",
    title: "Digital Ballot",
    where: "Laptop 2 · after the dilemma",
    body: "Tap a portrait to vote for the next mayor the exhibit features. The theme rotates every 3 days.",
  },
  {
    href: "/wall",
    title: "Projector Walls",
    where: "Two side projectors · beside the wall of mayors",
    body: "Posts and votes from both stations appear here live, sorted by most voted, controversial, both sides, or newest.",
  },
];

export default function Guide() {
  return (
    <div className="page narrow">
      <section className="hero">
        <Emblem size={130} />
        <p className="eyebrow" style={{ marginTop: 14 }}>
          Manila Clock Tower · 5th Floor · Mayor&apos;s Office
        </p>
        <h1>The Mayor&apos;s Interactive Freedom Wall</h1>
        <p className="lead">
          Today&apos;s featured mayor: <strong>{featuredMayor.name}</strong>
        </p>
      </section>

      <div className="portrait-row">
        {wallOfMayors.map((m) => (
          <Portrait key={m.id} mayor={m} size="sm" />
        ))}
      </div>

      <div className="stations">
        {stations.map((s) => (
          <Link key={s.href} href={s.href} className="station-card">
            <span>
              <div className="where">{s.where}</div>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </span>
          </Link>
        ))}
      </div>

      <p className="hint">
        <strong>Demo tip:</strong> open <code>/citizen</code> and <code>/wall/a</code> side by side. Post or vote in one and watch the
        other update.
      </p>
    </div>
  );
}
