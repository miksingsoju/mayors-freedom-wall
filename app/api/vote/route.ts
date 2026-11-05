import { NextResponse } from "next/server";
import { applyVote } from "@/lib/store";
import type { VoteDir } from "@/lib/types";

const valid = (d: unknown): d is VoteDir => d === "up" || d === "down" || d === null;

export async function POST(req: Request) {
  const { id, from, to } = await req.json();
  if (!valid(from) || !valid(to)) return NextResponse.json({ error: "Bad vote" }, { status: 400 });
  const comment = applyVote(id, from, to);
  if (!comment) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(comment);
}
