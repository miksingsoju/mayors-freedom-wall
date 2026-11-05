"use client";
import Link from "next/link";
import { useState } from "react";
import { MayorScene, Newspaper } from "@/components/Decor";
import { SortTabs } from "@/components/SortTabs";
import { Thread } from "@/components/Thread";
import { dilemma, featuredMayor, proclamation } from "@/lib/content";
import type { SortMode } from "@/lib/sort";
import { useExhibit } from "@/lib/useExhibit";

const choiceLabels = Object.fromEntries(dilemma.choices.map((c) => [c.id, c.label]));

export default function MayorPage() {
  const { state, post, vote } = useExhibit();
  const [step, setStep] = useState<"brief" | "decide" | "reveal">("brief");
  const [choice, setChoice] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [reasons, setReasons] = useState("");
  const [signing, setSigning] = useState(false);
  const [sort, setSort] = useState<SortMode>("top");

  const decisions = state?.comments.filter((c) => c.station === "mayor" && !c.parentId && c.choice) ?? [];
  const total = decisions.length || 1;

  async function sign() {
    if (!choice || !reasons.trim()) return;
    setSigning(true);
    const ok = await post({ station: "mayor", author: name ? `Mayor ${name}` : "", body: reasons, choice });
    setSigning(false);
    if (ok) {
      setStep("reveal");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <div className="page">
      <p className="eyebrow">Station II · The Mayor&apos;s Dilemma — you are the Mayor of Manila</p>
      <Steps current={step} />
      <MayorScene seated={step !== "brief"} name={name} />

      {step === "brief" && (
        <section className="folder">
          <div className="stamp-mark">For the Mayor&apos;s eyes</div>
          <div>Briefing · {dilemma.year}</div>
          <h1>{dilemma.title}</h1>
          {dilemma.situation.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <h3>Your constraints</h3>
          <ul>
            {dilemma.constraints.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
          <button
            onClick={() => {
              setStep("decide");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Take the Mayor&apos;s seat →
          </button>
        </section>
      )}

      {step === "decide" && (
        <section className="proclamation">
          <header className="proc-head">
            <div className="republic">Republic of the Philippines</div>
            <div className="office">City of Manila · Office of the Mayor</div>
            <h1 className="proc-title">Mayoral Proclamation</h1>
            <div className="proc-number">{proclamation.number}</div>
          </header>
          <hr className="proc-rule" />

          {proclamation.whereas.map((w) => (
            <p key={w} className="whereas">
              <strong>WHEREAS,</strong> {w}
            </p>
          ))}

          <p className="proc-order">
            <strong>NOW, THEREFORE, I,</strong>{" "}
            <input
              className="inline-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="your name"
              maxLength={32}
              aria-label="Your name"
            />
            , Mayor of the City of Manila, by virtue of the powers vested in me by law, do hereby <strong>ORDER</strong> the
            following <em>(choose one)</em>:
          </p>

          <div className="sections" role="radiogroup" aria-label="Your order">
            {dilemma.choices.map((c, i) => (
              <button
                key={c.id}
                role="radio"
                aria-checked={choice === c.id}
                className={choice === c.id ? "section-choice selected" : "section-choice"}
                onClick={() => setChoice(c.id)}
              >
                <span className="box">{choice === c.id ? "✓" : ""}</span>
                <span>
                  <span className="sec">Section {i + 1}.</span> {c.label}
                </span>
              </button>
            ))}
          </div>

          <p className="whereas">
            <strong>LET IT BE KNOWN</strong> to the people of Manila that this order is made for the following reasons:
          </p>
          <textarea
            value={reasons}
            onChange={(e) => setReasons(e.target.value)}
            maxLength={500}
            placeholder="Why this order? Who benefits, and who pays the cost?"
            aria-label="Your reasons"
          />

          <p className="dateline">{proclamation.dateline}</p>

          <div className="signature-block">
            <div className="signature">
              <div className="sig">{name}</div>
              <div className="sig-line">Mayor, City of Manila</div>
            </div>
            <button className="seal-button" disabled={!choice || !reasons.trim() || signing} onClick={sign}>
              {signing ? "Sealing…" : (
                <span>
                  Sign
                  <br />& Seal
                </span>
              )}
            </button>
          </div>
        </section>
      )}

      {step === "reveal" && (
        <>
          <Newspaper masthead="The City Gazette" headline={dilemma.reveal.heading} date={dilemma.year} className="clipping">
            <div className="byline">On the record · {featuredMayor.name}</div>
            <div className="np-text">
              {dilemma.reveal.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Newspaper>

          <div className="section-head">
            <h2>How the visiting mayors decided</h2>
          </div>
          <div className="bars">
            {dilemma.choices.map((c) => {
              const n = decisions.filter((d) => d.choice === c.id).length;
              const pct = Math.round((n / total) * 100);
              return (
                <div key={c.id} className={choice === c.id ? "bar mine" : "bar"}>
                  <span className="bar-label">
                    {c.label}
                    {choice === c.id && " (your order)"}
                  </span>
                  <span className="bar-track">
                    <span className="bar-fill" style={{ width: `${pct}%` }} />
                  </span>
                  <span className="bar-value">{pct}%</span>
                </div>
              );
            })}
          </div>

          <div className="section-head">
            <h2>Debate the proclamations</h2>
            <SortTabs value={sort} onChange={setSort} />
          </div>
          {state && (
            <Thread
              comments={state.comments}
              station="mayor"
              sort={sort}
              choiceLabels={choiceLabels}
              onVote={vote}
              onReply={(parentId, author, body) => post({ station: "mayor", parentId, author, body })}
            />
          )}
          <div className="next">
            <Link className="button" href="/ballot">
              Last step: cast your ballot →
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

function Steps({ current }: { current: "brief" | "decide" | "reveal" }) {
  const steps = [
    ["brief", "Briefing"],
    ["decide", "Proclamation"],
    ["reveal", "The record"],
  ] as const;
  const idx = steps.findIndex(([k]) => k === current);
  return (
    <ol className="steps">
      {steps.map(([k, label], i) => (
        <li key={k} className={i === idx ? "active" : i < idx ? "done" : ""}>
          {label}
        </li>
      ))}
    </ol>
  );
}
