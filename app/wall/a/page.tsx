"use client";
import { useState } from "react";
import { SortTabs } from "@/components/SortTabs";
import { Thread } from "@/components/Thread";
import { promptOfTheDay } from "@/lib/content";
import type { SortMode } from "@/lib/sort";
import { useExhibit } from "@/lib/useExhibit";

// Projector A, beside the wall of mayors: every Citizen's Voice post, live.
export default function ProjectorA() {
  const { state } = useExhibit();
  const [sort, setSort] = useState<SortMode>("top");

  return (
    <div className="projector">
      <div className="projection">
        <div className="projection-inner">
          <header className="projector-head">
            <div>
              <p className="eyebrow">Projector A · Citizen&apos;s Voice</p>
              <h1 className="projector-title">{promptOfTheDay.question}</h1>
              <p className="prompt-en">{promptOfTheDay.questionEn}</p>
            </div>
            <SortTabs value={sort} onChange={setSort} />
          </header>
          {state ? (
            <div className="projector-columns">
              <Thread comments={state.comments} station="citizen" sort={sort} readOnly />
            </div>
          ) : (
            <p className="empty">Loading…</p>
          )}
        </div>
      </div>
    </div>
  );
}
