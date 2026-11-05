"use client";
import { useState } from "react";

type Props = {
  placeholder: string;
  submitLabel: string;
  onSubmit: (author: string, body: string) => Promise<boolean>;
  compact?: boolean;
  onCancel?: () => void;
};

export function Composer({ placeholder, submitLabel, onSubmit, compact, onCancel }: Props) {
  const [author, setAuthor] = useState("");
  const [body, setBody] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!body.trim()) return;
    setBusy(true);
    if (await onSubmit(author, body)) setBody("");
    setBusy(false);
  }

  return (
    <form className={compact ? "composer compact" : "composer"} onSubmit={submit}>
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder={placeholder}
        maxLength={500}
        rows={compact ? 2 : 4}
      />
      <div className="composer-row">
        <input
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder='Name or "Visitor from …" (optional)'
          maxLength={40}
        />
        {onCancel && (
          <button type="button" className="ghost" onClick={onCancel}>
            Cancel
          </button>
        )}
        <button type="submit" disabled={busy || !body.trim()}>
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
