"use client";
import Link from "next/link";
import { useState } from "react";
import { DecisionBars } from "@/components/DecisionBars";
import { Newspaper } from "@/components/Decor";
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
      <Steps current={step} />

      {step === "brief" && (
        <>
        <figure className="photo photo-wide">
          <img src="/divisoria.webp" alt="Vendor stalls and umbrellas lining a crowded street in Divisoria, Manila" />
          <figcaption>Divisoria, Manila</figcaption>
        </figure>
        <section className="folder">
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
          <h2 className="folder-question">{dilemma.question}</h2>
          <p className="prompt-en">{dilemma.questionEn}</p>
          <button
            onClick={() => {
              setStep("decide");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Take the Mayor&apos;s seat →
          </button>
        </section>
        </>
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
            <button disabled={!choice || !reasons.trim() || signing} onClick={sign}>
              {signing ? "Signing…" : "Sign proclamation"}
            </button>
          </div>
        </section>
      )}

      {step === "reveal" && (
        <>
          <Newspaper masthead="The City Gazette" headline={dilemma.reveal.heading} date={dilemma.reveal.date} className="clipping">
            <div className="byline">On the record · {featuredMayor.name}</div>
            <div className="np-text">
              {dilemma.reveal.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <p className="source-line">
              Source:{" "}
              <a href={dilemma.reveal.sourceUrl} target="_blank" rel="noreferrer">
                {dilemma.reveal.source}
              </a>
            </p>
          </Newspaper>
          <div className="next-bar">
            <p>Your proclamation is signed. Debate the others below, or move on.</p>
            <Link className="button" href="/ballot">
              Next: Cast your ballot →
            </Link>
          </div>

          <div className="section-head">
            <h2>How the visiting mayors decided</h2>
          </div>
          {state && <DecisionBars comments={state.comments} mine={choice} />}

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
