"use client";

import { useState } from "react";

// Dlouhá recenze je sbalená na 7 řádků. Celý text je v HTML pořád (kvůli vyhledávačům), ořez je jen vizuální.
const LONG = 250;

export default function ReviewText({ text }: { text: string }) {
  const [open, setOpen] = useState(false);
  const long = text.length > LONG;

  return (
    <>
      <blockquote className={`mt-4 text-body-m whitespace-pre-line text-ink-700 ${long && !open ? "line-clamp-7" : ""}`}>{text}</blockquote>
      {long && (
        <button
          type="button"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="mt-3 self-start text-label-m whitespace-pre text-brass-600 hover:text-brass-500"
        >
          {open ? "Sbalit  ↑" : "Číst celou recenzi  ↓"}
        </button>
      )}
    </>
  );
}
