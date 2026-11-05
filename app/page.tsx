import { redirect } from "next/navigation";

// Visitors start at Station 1. The overview for the presentation lives at /guide.
export default function Home() {
  redirect("/citizen");
}
