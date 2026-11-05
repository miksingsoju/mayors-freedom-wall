"use client";
import { useState } from "react";
import { Composer } from "@/components/Composer";
import { SortTabs } from "@/components/SortTabs";
import { Thread } from "@/components/Thread";
import { promptOfTheDay } from "@/lib/content";
import type { SortMode } from "@/lib/sort";
import { useExhibit } from "@/lib/useExhibit";

const today = new Date().toLocaleDateString("en-PH", { weekday: "long", month: "long", day: "numeric", year: "numeric" });

export default function CitizenPage() {
  const { state, post, vote } = useExhibit();
  const [sort, setSort] = useState<SortMode>("top");

  return (
    <div className="page">
      <p className="eyebrow">Station I · Citizen&apos;s Voice — you are a resident of Manila</p>
      <section className="front-page">
        <div className="np-mast">Ang Tinig ng Maynila</div>
        <div className="np-dateline">
          <span>{today}</span>
          <span>The Citizen&apos;s Voice</span>
          <span>Libre</span>
        </div>
        <span className="kicker">{promptOfTheDay.label}</span>
        <h1>{promptOfTheDay.question}</h1>
        <p className="deck">{promptOfTheDay.helper}</p>
        <p className="letter-label">Your letter to the editor</p>
        <Composer
          placeholder="Dear Editor, …"
          submitLabel="Pin it to the wall"
          onSubmit={(author, body) => post({ station: "citizen", author, body })}
        />
      </section>

      <div className="section-head">
        <h2>On the freedom wall</h2>
        <SortTabs value={sort} onChange={setSort} />
      </div>
      {state ? (
        <Thread
          comments={state.comments}
          station="citizen"
          sort={sort}
          onVote={vote}
          onReply={(parentId, author, body) => post({ station: "citizen", parentId, author, body })}
        />
      ) : (
        <p className="empty">Loading…</p>
      )}
    </div>
  );
}
