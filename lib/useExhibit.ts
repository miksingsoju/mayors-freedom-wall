"use client";
import { useCallback, useEffect, useState } from "react";
import type { ExhibitState, Station, VoteDir } from "./types";

const POLL_MS = 1500;

// Every screen polls the server so kiosks and the projector wall stay in sync.
export function useExhibit() {
  const [state, setState] = useState<ExhibitState | null>(null);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/state", { cache: "no-store" });
      if (res.ok) setState(await res.json());
    } catch {
      // Server briefly unreachable; the next poll will catch up.
    }
  }, []);

  useEffect(() => {
    refresh();
    const t = setInterval(refresh, POLL_MS);
    return () => clearInterval(t);
  }, [refresh]);

  const post = useCallback(
    async (input: { station: Station; parentId?: string | null; author: string; body: string; choice?: string }) => {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      await refresh();
      return res.ok;
    },
    [refresh],
  );

  const vote = useCallback(
    async (id: string, from: VoteDir, to: VoteDir) => {
      await fetch("/api/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, from, to }),
      });
      await refresh();
    },
    [refresh],
  );

  const castBallot = useCallback(
    async (mayorId: string) => {
      await fetch("/api/ballot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mayorId }),
      });
      await refresh();
    },
    [refresh],
  );

  return { state, post, vote, castBallot };
}

// Each device remembers its own votes so a visitor can't upvote twice.
const KEY = "mfw-votes";

export function readMyVotes(): Record<string, VoteDir> {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "{}");
  } catch {
    return {};
  }
}

export function writeMyVote(id: string, dir: VoteDir) {
  try {
    const all = readMyVotes();
    all[id] = dir;
    localStorage.setItem(KEY, JSON.stringify(all));
  } catch {
    // Storage unavailable (private mode); votes still count, just not remembered.
  }
}
