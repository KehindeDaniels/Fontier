import type { CachedSelection } from "../core/types";

export const isEditable = (el: Element | null): el is HTMLElement => {
  if (!el) return false;
  if (el instanceof HTMLTextAreaElement) return !el.disabled && !el.readOnly;
  if (el instanceof HTMLInputElement) {
    return (
      ["text", "search", "tel", "url", "email", ""].includes(el.type) &&
      !el.disabled &&
      !el.readOnly
    );
  }
  const ce = (el as HTMLElement).getAttribute?.("contenteditable");
  return ce === "" || ce === "true";
};

export const activeEditable = (): HTMLElement | null => {
  const el = document.activeElement as HTMLElement | null;
  return isEditable(el) ? el : null;
};

export const getSelectionRect = (sel: CachedSelection): DOMRect => {
  if (!sel) return new DOMRect();

  if (sel.kind === "input") return sel.el.getBoundingClientRect();

  const rect = sel.range.getBoundingClientRect();
  if (rect && rect.width + rect.height > 0) return rect;

  const rects = sel.range.getClientRects();
  return rects.length ? rects[0] : sel.el.getBoundingClientRect();
};

export const containsStyledUnicode = (text: string): boolean => {
  const unicodePattern =
    /[\u0332\u0336\u2100-\u214F\u1D400-\u1D7FF\uFF00-\uFFEF]/;
  return unicodePattern.test(text);
};

export const blink = (el: HTMLElement, ok: boolean) => {
  const old = el.textContent;
  el.textContent = ok ? "✓" : "✕";
  setTimeout(() => {
    el.textContent = old || "";
  }, 650);
};
