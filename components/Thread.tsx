"use client";
import { useEffect, useRef, useState } from "react";
import { Composer } from "./Composer";
import { readMyVotes, writeMyVote } from "@/lib/useExhibit";
import { sortComments, type SortMode } from "@/lib/sort";
import type { Comment, Station, VoteDir } from "@/lib/types";

type Props = {
  comments: Comment[];
  station: Station;
  sort: SortMode;
  readOnly?: boolean; // projector wall: display only
  choiceLabels?: Record<string, string>;
  highlightId?: string | null;
  onVote?: (id: string, from: VoteDir, to: VoteDir) => Promise<void>;
  onReply?: (parentId: string, author: string, body: string) => Promise<boolean>;
};

type Ctx = Omit<Props, "comments" | "station" | "sort"> & {
  childrenOf: (id: string) => Comment[];
  myVotes: Record<string, VoteDir>;
  vote: (c: Comment, dir: "up" | "down") => void;
};

export function Thread({ comments, station, sort, ...rest }: Props) {
  const [myVotes, setMyVotes] = useState<Record<string, VoteDir>>({});
  // Ref mirrors state so rapid taps always read the latest vote, not a stale render.
  const votesRef = useRef<Record<string, VoteDir>>({});
  useEffect(() => {
    votesRef.current = readMyVotes();
    setMyVotes(votesRef.current);
  }, []);

  const mine = comments.filter((c) => c.station === station);
  const childrenOf = (id: string | null) => mine.filter((c) => c.parentId === id);

  function vote(c: Comment, dir: "up" | "down") {
    const from = votesRef.current[c.id] ?? null;
    const to = from === dir ? null : dir; // tapping the same arrow again undoes it
    votesRef.current = { ...votesRef.current, [c.id]: to };
    writeMyVote(c.id, to);
    setMyVotes(votesRef.current);
    rest.onVote?.(c.id, from, to);
  }

  const ctx: Ctx = { ...rest, childrenOf, myVotes, vote };
  const top = sortComments(childrenOf(null), sort);
  if (top.length === 0) return <p className="empty">No posts yet. Be the first.</p>;
  return (
    <ul className="thread">
      {top.map((c) => (
        <Node key={c.id} c={c} depth={0} ctx={ctx} />
      ))}
    </ul>
  );
}

function Node({ c, depth, ctx }: { c: Comment; depth: number; ctx: Ctx }) {
  const [replying, setReplying] = useState(false);
  const kids = sortComments(ctx.childrenOf(c.id), "top");
  const my = ctx.myVotes[c.id] ?? null;

  return (
    <li className={`comment${c.id === ctx.highlightId ? " highlight" : ""}`}>
      <div className="votes">
        {!ctx.readOnly && (
          <button aria-label="Upvote" className={my === "up" ? "arrow on-up" : "arrow"} onClick={() => ctx.vote(c, "up")}>
            ▲
          </button>
        )}
        <span className="score">{c.up - c.down}</span>
        {!ctx.readOnly && (
          <button aria-label="Downvote" className={my === "down" ? "arrow on-down" : "arrow"} onClick={() => ctx.vote(c, "down")}>
            ▼
          </button>
        )}
      </div>
      <div className="comment-main">
        <div className="meta">
          <strong>{c.author}</strong>
          <span>{timeAgo(c.createdAt)}</span>
          <span className="tally">
            ▲{c.up} ▼{c.down}
          </span>
        </div>
        {c.choice && ctx.choiceLabels?.[c.choice] && <div className="choice-tag">Chose: {ctx.choiceLabels[c.choice]}</div>}
        <p>{c.body}</p>
        {!ctx.readOnly && !replying && depth < 4 && (
          <button className="link" onClick={() => setReplying(true)}>
            Reply
          </button>
        )}
        {replying && (
          <Composer
            compact
            placeholder={`Reply to ${c.author}…`}
            submitLabel="Reply"
            onCancel={() => setReplying(false)}
            onSubmit={async (author, body) => {
              const ok = (await ctx.onReply?.(c.id, author, body)) ?? false;
              if (ok) setReplying(false);
              return ok;
            }}
          />
        )}
        {kids.length > 0 && (
          <ul className="replies">
            {kids.map((k) => (
              <Node key={k.id} c={k} depth={depth + 1} ctx={ctx} />
            ))}
          </ul>
        )}
      </div>
    </li>
  );
}

function timeAgo(ts: number) {
  const m = Math.round((Date.now() - ts) / 60_000);
  if (m < 1) return "just now";
  if (m < 60) return `${m} min ago`;
  const h = Math.round(m / 60);
  return `${h} hr${h > 1 ? "s" : ""} ago`;
}
