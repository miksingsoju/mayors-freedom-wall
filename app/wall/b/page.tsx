"use client";
import { useState } from "react";
import { DecisionBars } from "@/components/DecisionBars";
import { Portrait } from "@/components/Decor";
import { SortTabs } from "@/components/SortTabs";
import { Thread } from "@/components/Thread";
import { ballotCandidates, dilemma, featuredMayor, mayorById } from "@/lib/content";
import type { SortMode } from "@/lib/sort";
import { useExhibit } from "@/lib/useExhibit";

const choiceLabels = Object.fromEntries(dilemma.choices.map((c) => [c.id, c.label]));

// Projector B, beside the wall of mayors: the Mayor of the Day and every
// "If I were the Mayor…" proclamation, live.
export default function ProjectorB() {
  const { state } = useExhibit();
  const [sort, setSort] = useState<SortMode>("top");

  const leader = state
    ? [...ballotCandidates].sort((a, b) => (state.ballot[b.id] ?? 0) - (state.ballot[a.id] ?? 0))[0]
    : null;

  return (
    <div className="projector">
      <div className="projection">
        <div className="projection-inner projector-b">
          <aside className="motd">
            <p className="eyebrow">Mayor of the Day</p>
            <Portrait mayor={mayorById.moreno} size="lg" plate={false} />
            <h1>{featuredMayor.name}</h1>
            <p className="muted">{featuredMayor.term}</p>
            {leader && (
              <p className="motd-next">
                Next up, by visitor ballot: <strong>{leader.name}</strong>
              </p>
            )}
          </aside>

          <section>
            <header className="projector-head">
              <div>
                <p className="eyebrow">
                  Projector B · If I were the Mayor… · {dilemma.title}, {dilemma.year}
                </p>
                <h1 className="projector-title">{dilemma.question}</h1>
                <p className="prompt-en">{dilemma.questionEn}</p>
              </div>
              <SortTabs value={sort} onChange={setSort} />
            </header>
            {state ? (
              <>
                <DecisionBars comments={state.comments} />
                <Thread comments={state.comments} station="mayor" sort={sort} readOnly choiceLabels={choiceLabels} />
              </>
            ) : (
              <p className="empty">Loading…</p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
