"use client";
import { sortLabels, type SortMode } from "@/lib/sort";

export function SortTabs({ value, onChange }: { value: SortMode; onChange: (m: SortMode) => void }) {
  return (
    <div className="tabs" role="tablist">
      {(Object.keys(sortLabels) as SortMode[]).map((m) => (
        <button key={m} role="tab" aria-selected={value === m} className={value === m ? "tab active" : "tab"} onClick={() => onChange(m)}>
          {sortLabels[m]}
        </button>
      ))}
    </div>
  );
}
