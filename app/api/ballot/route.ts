import { NextResponse } from "next/server";
import { castBallot, store } from "@/lib/store";

export async function POST(req: Request) {
  const { mayorId } = await req.json();
  if (!castBallot(mayorId)) return NextResponse.json({ error: "Unknown candidate" }, { status: 400 });
  return NextResponse.json(store.ballot);
}
