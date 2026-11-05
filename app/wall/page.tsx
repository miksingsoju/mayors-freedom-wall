"use client";
import { useState } from "react";
import { Emblem, Portrait } from "@/components/Decor";
import { SortTabs } from "@/components/SortTabs";
import { Thread } from "@/components/Thread";
import { ballotCandidates, dilemma, mayorById, promptOfTheDay, wallOfMayors } from "@/lib/content";
import type { SortMode } from "@/lib/sort";
import { useExhibit } from "@/lib/useExhibit";

const choiceLabels = Object.fromEntries(dilemma.choices.map((c) => [c.id, c.label]));
const featured = mayorById.moreno;
const others = wallOfMayors.filter((m) => m.id !== featured.id);

// What the two side projectors show. Display only — visitors interact at the laptops.
export default function WallPage() {
  const { state } = useExhibit();
  const [sort, setSort] = useState<SortMode>("top");

  const leader = state
    ? [...ballotCandidates].sort((a, b) => (state.ballot[b.id] ?? 0) - (state.ballot[a.id] ?? 0))[0]
    : null;

  return (
    <div className="wall">
      <header className="wall-gallery">
        <div className="side">
          {others.slice(0, 4).map((m) => (
            <Portrait key={m.id} mayor={m} size="sm" />
          ))}
        </div>
        <div className="featured">
          <Emblem size={70} />
          <p className="eyebrow">Mayor of the Day</p>
          <Portrait mayor={featured} size="lg" plate={false} />
          <h1>{featured.name}</h1>
        </div>
        <div className="side">
          {others.slice(4, 8).map((m) => (
            <Portrait key={m.id} mayor={m} size="sm" />
          ))}
        </div>
      </header>

      <div className="wall-controls">
        {leader && (
          <p className="muted">
            Ballot leader for the next rotation: <strong>{leader.name}</strong>
          </p>
        )}
        <SortTabs value={sort} onChange={setSort} />
      </div>

      <div className="wall-grid">
        <section className="projection">
          <div className="projection-inner">
            <h2 className="wall-title">Projector A · Citizen&apos;s Voice</h2>
            <p className="wall-prompt">{promptOfTheDay.question}</p>
            {state && <Thread comments={state.comments} station="citizen" sort={sort} readOnly />}
          </div>
        </section>
        <section className="projection">
          <div className="projection-inner">
            <h2 className="wall-title">Projector B · &ldquo;If I were the Mayor…&rdquo;</h2>
            <p className="wall-prompt">{dilemma.title}</p>
            {state && <Thread comments={state.comments} station="mayor" sort={sort} readOnly choiceLabels={choiceLabels} />}
          </div>
        </section>
      </div>
    </div>
  );
}
