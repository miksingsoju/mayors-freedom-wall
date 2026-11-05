"use client";
import Link from "next/link";
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
  const [posted, setPosted] = useState(false);

  return (
    <div className="page">
      <section className="front-page">
        <div className="np-mast">Mahal Kong Maynila</div>
        <div className="np-dateline">
          <span>{today}</span>
          <span>Boses ng Mamamayan</span>
          <span>Libre</span>
        </div>
        <span className="kicker">{promptOfTheDay.label}</span>
        <h1>{promptOfTheDay.question}</h1>
        <p className="prompt-en">{promptOfTheDay.questionEn}</p>
        <figure className="photo">
          <img src="/divisoria.webp" alt="Vendor stalls and shoppers sharing a crowded street in Divisoria, Manila" />
          <figcaption>Divisoria, Manila</figcaption>
        </figure>
        <p className="deck">{promptOfTheDay.helper}</p>
        <p className="letter-label">Your letter to the editor</p>
        <Composer
          placeholder="Dear Editor, …"
          submitLabel="Pin it to the wall"
          onSubmit={async (author, body) => {
            const ok = await post({ station: "citizen", author, body });
            if (ok) setPosted(true);
            return ok;
          }}
        />
        {posted && (
          <div className="next-bar">
            <p>Your letter is on the wall. Vote on or reply to others below, or move on.</p>
            <Link className="button" href="/mayor">
              Next: The Mayor&apos;s Dilemma →
            </Link>
          </div>
        )}
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
