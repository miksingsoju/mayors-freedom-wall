// In-memory store: no database. Everything resets when the server restarts,
// which gives every demo a fresh start with the seeded posts below.
import { ballotCandidates } from "./content";
import type { Comment, ExhibitState, Station, VoteDir } from "./types";

const MIN = 60_000;

function seed(): ExhibitState {
  const now = Date.now();
  const c = (
    id: string,
    station: Station,
    parentId: string | null,
    author: string,
    body: string,
    up: number,
    down: number,
    minsAgo: number,
    choice?: string,
  ): Comment => ({ id, station, parentId, author, body, up, down, createdAt: now - minsAgo * MIN, choice });

  return {
    comments: [
      c("s1", "citizen", null, "Visitor from Tondo", "Both. Paint vendor boxes on the sidewalk and keep a 1-meter walking lane clear. Fine whoever blocks it.", 24, 3, 180),
      c("s1r1", "citizen", "s1", "Visitor from Sampaloc", "Who enforces the 1 meter though? That's where it always falls apart.", 9, 1, 150),
      c("s1r2", "citizen", "s1r1", "Visitor from Tondo", "The vendors themselves — give the stall to whoever keeps the lane clear, take it from whoever doesn't.", 6, 2, 120),
      c("s2", "citizen", null, "Visitor from Quezon City", "Pedestrians. Sidewalks are for walking. Build a proper covered market for vendors instead.", 15, 11, 140),
      c("s2r1", "citizen", "s2", "Visitor from Binondo", "Nobody shops at markets that are far from foot traffic. That's why they go back to the street.", 12, 2, 100),
      c("s3", "citizen", null, "Student, UST", "Vendors. Divisoria IS the vendors. Without them it's just a road.", 7, 9, 60),

      c("m1", "mayor", null, "Visitor from Pasay", "Relocate first. Clearing without a place to go just moves the problem to the next street.", 19, 4, 170, "relocate"),
      c("m1r1", "mayor", "m1", "Visitor from Manila", "There was no site big enough. Waiting means nothing changes for years.", 8, 3, 130),
      c("m2", "mayor", null, "Visitor from Makati", "Clear it immediately. If you wait, you lose the political capital of being new.", 13, 10, 110, "clear"),
      c("m3", "mayor", null, "Visitor from Caloocan", "Night market only. Roads are for cars during the day, vendors at night.", 16, 2, 70, "schedule"),
    ],
    ballot: Object.fromEntries(ballotCandidates.map((m, i) => [m.id, [12, 7, 8, 5, 21, 6, 9, 5][i] ?? 0])),
  };
}

// Keep the store on globalThis so hot reloads in dev don't wipe it.
const g = globalThis as unknown as { __exhibit?: ExhibitState };
export const store: ExhibitState = (g.__exhibit ??= seed());

export function addComment(input: {
  station: Station;
  parentId: string | null;
  author: string;
  body: string;
  choice?: string;
}): Comment {
  const comment: Comment = {
    id: crypto.randomUUID(),
    station: input.station,
    parentId: input.parentId,
    author: input.author.trim() || "Anonymous visitor",
    body: input.body.trim(),
    choice: input.parentId ? undefined : input.choice,
    up: 0,
    down: 0,
    createdAt: Date.now(),
  };
  store.comments.push(comment);
  return comment;
}

// Applies a change from one vote state to another, e.g. up -> down undoes the
// upvote and adds a downvote. Each device remembers its own vote locally.
export function applyVote(id: string, from: VoteDir, to: VoteDir): Comment | undefined {
  const comment = store.comments.find((x) => x.id === id);
  if (!comment) return undefined;
  if (from === "up") comment.up = Math.max(0, comment.up - 1);
  if (from === "down") comment.down = Math.max(0, comment.down - 1);
  if (to === "up") comment.up += 1;
  if (to === "down") comment.down += 1;
  return comment;
}

export function castBallot(mayorId: string): boolean {
  if (!(mayorId in store.ballot)) return false;
  store.ballot[mayorId] += 1;
  return true;
}
