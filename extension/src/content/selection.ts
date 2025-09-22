import type { CachedSelection } from "../core/types";
import { activeEditable } from "./utils";

let lastSel: CachedSelection = null;

export const getCachedSelection = (): CachedSelection => lastSel;

export const setCachedSelection = (sel: CachedSelection): void => {
  lastSel = sel;
};

export const getCachedText = (): string => {
  if (!lastSel) return "";

  if (lastSel.kind === "input") {
    const { el, start, end } = lastSel;
    return el.value.slice(start, end);
  }

  return lastSel.range.toString();
};

export const restoreSelection = (): void => {
  if (!lastSel) return;

  if (lastSel.kind === "input") {
    const { el, start, end } = lastSel;
    el.focus();
    el.setSelectionRange(start, end);
  } else {
    const { el, range } = lastSel;
    const sel = window.getSelection();
    if (!sel) return;

    el.focus();
    sel.removeAllRanges();
    const r = range.cloneRange();
    sel.addRange(r);
  }
};

export const updateSelectionCache = (): void => {
  const el = activeEditable();
  if (!el) {
    lastSel = null;
    return;
  }

  if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
    const start = el.selectionStart ?? 0;
    const end = el.selectionEnd ?? 0;

    if (start === end) {
      lastSel = null;
      return;
    }

    lastSel = { kind: "input", el, start, end };
    return;
  }

  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0 || sel.isCollapsed) {
    lastSel = null;
    return;
  }

  const r = sel.getRangeAt(0);
  if (!el.contains(r.commonAncestorContainer)) {
    lastSel = null;
    return;
  }

  lastSel = { kind: "ce", el, range: r.cloneRange() };
};
