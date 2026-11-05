import { NextResponse } from "next/server";
import { addComment, store } from "@/lib/store";

export async function POST(req: Request) {
  const { station, parentId = null, author = "", body = "", choice } = await req.json();
  if (station !== "citizen" && station !== "mayor") {
    return NextResponse.json({ error: "Unknown station" }, { status: 400 });
  }
  if (typeof body !== "string" || !body.trim() || body.length > 500) {
    return NextResponse.json({ error: "Write 1–500 characters" }, { status: 400 });
  }
  if (parentId && !store.comments.some((c) => c.id === parentId)) {
    return NextResponse.json({ error: "Reply target not found" }, { status: 404 });
  }
  return NextResponse.json(addComment({ station, parentId, author: String(author).slice(0, 40), body, choice }));
}
