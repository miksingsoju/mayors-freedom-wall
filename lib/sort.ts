import type { Comment } from "./types";

export type SortMode = "top" | "controversial" | "both" | "new";

export const sortLabels: Record<SortMode, string> = {
  top: "Most voted",
  controversial: "Controversial",
  both: "Both sides",
  new: "Newest",
};

const score = (c: Comment) => c.up - c.down;
// Reddit-style: lots of votes, split close to 50/50, ranks highest.
const controversy = (c: Comment) =>
  c.up === 0 || c.down === 0 ? 0 : (c.up + c.down) ** (Math.min(c.up, c.down) / Math.max(c.up, c.down));

export function sortComments(list: Comment[], mode: SortMode): Comment[] {
  const copy = [...list];
  switch (mode) {
    case "top":
      return copy.sort((a, b) => score(b) - score(a));
    case "controversial":
      return copy.sort((a, b) => controversy(b) - controversy(a));
    case "new":
      return copy.sort((a, b) => b.createdAt - a.createdAt);
    case "both": {
      // Alternate the most upvoted and most downvoted so both sides get airtime.
      const byUp = copy.sort((a, b) => score(b) - score(a));
      const out: Comment[] = [];
      let i = 0;
      let j = byUp.length - 1;
      while (i <= j) {
        out.push(byUp[i++]);
        if (i <= j) out.push(byUp[j--]);
      }
      return out;
    }
  }
}
