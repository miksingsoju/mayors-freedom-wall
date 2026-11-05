// How visitors decided on the Mayor's Dilemma: one bar per choice.
import { dilemma } from "@/lib/content";
import type { Comment } from "@/lib/types";

export function DecisionBars({ comments, mine }: { comments: Comment[]; mine?: string | null }) {
  const decisions = comments.filter((c) => c.station === "mayor" && !c.parentId && c.choice);
  const total = decisions.length || 1;

  return (
    <div className="bars">
      {dilemma.choices.map((c) => {
        const pct = Math.round((decisions.filter((d) => d.choice === c.id).length / total) * 100);
        return (
          <div key={c.id} className={mine === c.id ? "bar mine" : "bar"}>
            <span className="bar-label">
              {c.label}
              {mine === c.id && " (your order)"}
            </span>
            <span className="bar-track">
              <span className="bar-fill" style={{ width: `${pct}%` }} />
            </span>
            <span className="bar-value">{pct}%</span>
          </div>
        );
      })}
    </div>
  );
}
