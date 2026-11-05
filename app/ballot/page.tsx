"use client";
import { useEffect, useState } from "react";
import { Portrait } from "@/components/Decor";
import { ballotCandidates, ballotRotationDays } from "@/lib/content";
import { useExhibit } from "@/lib/useExhibit";

const RESET_MS = 8000; // kiosk resets for the next visitor

export default function BallotPage() {
  const { state, castBallot } = useExhibit();
  const [pick, setPick] = useState<string | null>(null);
  const [cast, setCast] = useState(false);

  useEffect(() => {
    if (!cast) return;
    const t = setTimeout(() => {
      setCast(false);
      setPick(null);
    }, RESET_MS);
    return () => clearTimeout(t);
  }, [cast]);

  const tally = state?.ballot ?? {};
  const total = Object.values(tally).reduce((a, b) => a + b, 0) || 1;

  return (
    <div className="page">
      <div className="ballot-head">
        <p className="eyebrow">Station III · Digital Ballot — on the Mayor&apos;s desk screen</p>
        <h1>Who should hang in the spotlight next?</h1>
        <p className="muted">Tap a portrait. The winner becomes the exhibit&apos;s featured mayor for the next {ballotRotationDays} days.</p>
      </div>

      {!cast ? (
        <>
          <div className="candidates" role="radiogroup" aria-label="Candidates">
            {ballotCandidates.map((m) => (
              <button
                key={m.id}
                role="radio"
                aria-checked={pick === m.id}
                className={pick === m.id ? "candidate selected" : "candidate"}
                onClick={() => setPick(m.id)}
              >
                <Portrait mayor={m} size="md" />
                <span className="term">{m.term}</span>
                <span className="check">{pick === m.id ? "✓ Your pick" : ""}</span>
              </button>
            ))}
          </div>
          <div className="ballot-box">
            <div className="slot" />
            <button
              className="cast"
              disabled={!pick}
              onClick={async () => {
                if (!pick) return;
                await castBallot(pick);
                setCast(true);
              }}
            >
              {pick ? `Drop my ballot for ${ballotCandidates.find((m) => m.id === pick)?.short}` : "Choose a mayor first"}
            </button>
          </div>
        </>
      ) : (
        <section className="thanks">
          <span className="script">Salamat, botante!</span>
          <p className="muted">Your ballot is in. Here is how the vote stands:</p>
          <div className="bars">
            {[...ballotCandidates]
              .sort((a, b) => (tally[b.id] ?? 0) - (tally[a.id] ?? 0))
              .map((m) => {
                const pct = Math.round(((tally[m.id] ?? 0) / total) * 100);
                return (
                  <div key={m.id} className={pick === m.id ? "bar mine" : "bar"}>
                    <span className="bar-label">{m.name}</span>
                    <span className="bar-track">
                      <span className="bar-fill" style={{ width: `${pct}%` }} />
                    </span>
                    <span className="bar-value">{pct}%</span>
                  </div>
                );
              })}
          </div>
          <p className="muted">This screen resets for the next visitor in a few seconds.</p>
        </section>
      )}
    </div>
  );
}
