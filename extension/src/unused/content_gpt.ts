// src/content.ts
import { convertToUnicode } from "../core/converter";

type Format = {
  bold: boolean;
  italic: boolean;
  underline: boolean;
  strikethrough: boolean;
  size: "normal" | "h1" | "h2" | "h3" | "h4";
  font: "normal" | "serif" | "monospace" | "script";
};

const DEFAULT_FORMAT: Format = {
  bold: false,
  italic: false,
  underline: false,
  strikethrough: false,
  size: "normal",
  font: "normal",
};

// ---------- selection cache ----------
type InputSel = {
  kind: "input";
  el: HTMLInputElement | HTMLTextAreaElement;
  start: number;
  end: number;
};

type CESel = {
  kind: "ce";
  el: HTMLElement;
  range: Range; // cloned when cached
};

let lastSel: InputSel | CESel | null = null;

// ---------- helpers ----------
const isEditable = (el: Element | null): el is HTMLElement => {
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

const activeEditable = (): HTMLElement | null => {
  const el = document.activeElement as HTMLElement | null;
  return isEditable(el) ? el : null;
};

const getSelectionRect = (sel: InputSel | CESel): DOMRect => {
  if (sel.kind === "input") return sel.el.getBoundingClientRect();
  const rect = sel.range.getBoundingClientRect();
  if (rect && rect.width + rect.height > 0) return rect;
  const rects = sel.range.getClientRects();
  return rects.length ? rects[0] : sel.el.getBoundingClientRect();
};

const getCachedText = (): string => {
  if (!lastSel) return "";
  if (lastSel.kind === "input") {
    const { el, start, end } = lastSel;
    return el.value.slice(start, end);
  }
  return lastSel.range.toString();
};

// Restore the visual selection so it “hangs” while using the tray
const restoreSelection = () => {
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
    // use a fresh clone to avoid stale DOM references
    const r = range.cloneRange();
    sel.addRange(r);
  }
};

// ---------- tray ----------
let tray: HTMLDivElement | null = null;
const current: Format = { ...DEFAULT_FORMAT };

const ensureTray = () => {
  if (tray) return tray;

  tray = document.createElement("div");
  tray.className = "fontier-tray";
  Object.assign(tray.style, {
    position: "fixed",
    zIndex: "2147483647",
    display: "none",
    background: "#1f2937",
    color: "#fff",
    border: "1px solid #374151",
    borderRadius: "10px",
    padding: "6px",
    boxShadow: "0 6px 24px rgba(0,0,0,.2)",
    fontFamily:
      "system-ui,-apple-system,Segoe UI,Roboto,Arial,Helvetica,Ubuntu,sans-serif",
    gap: "6px",
    alignItems: "center",
  } as CSSStyleDeclaration);

  // prevent losing selection when interacting with tray
  const swallow = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
    restoreSelection();
  };
  tray.addEventListener("mousedown", swallow, true);
  tray.addEventListener("pointerdown", swallow, true);

  const css = document.createElement("style");
  css.textContent = `
    .fontier-tray{display:flex}
    .fontier-btn{cursor:pointer;border:1px solid #4b5563;background:#374151;color:#fff;border-radius:8px;padding:4px 8px;font-size:12px;line-height:1}
    .fontier-btn.active{background:#2563eb;border-color:#2563eb}
    .fontier-sel{min-width:86px;margin-left:6px;border:1px solid #4b5563;background:#111827;color:#fff;border-radius:8px;padding:2px 6px;font-size:12px;appearance:auto}
    .fontier-sel:focus{outline:2px solid #2563eb;outline-offset:0}
    .fontier-divider{width:1px;height:16px;background:#4b5563;margin:0 4px}
  `;
  tray.appendChild(css);

  const mkToggle = (label: string, key: keyof Format) => {
    const b = document.createElement("button");
    b.textContent = label;
    b.className = "fontier-btn";
    b.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      // @ts-expect-error bool key
      current[key] = !current[key];
      b.classList.toggle("active", current[key]);
      restoreSelection();
    });
    return b;
  };

  const bB = mkToggle("B", "bold");
  const bI = mkToggle("I", "italic");
  const bU = mkToggle("U", "underline");
  const bS = mkToggle("S", "strikethrough");

  const sizeSel = document.createElement("select");
  sizeSel.className = "fontier-sel";
  ["normal", "h1", "h2", "h3", "h4"].forEach((v) => {
    const o = document.createElement("option");
    o.value = v;
    o.textContent = v.toUpperCase();
    sizeSel.appendChild(o);
  });
  sizeSel.value = current.size; // init
  sizeSel.addEventListener("change", (e) => {
    e.stopPropagation();
    current.size = sizeSel.value as Format["size"];
    restoreSelection();
  });

  const fontSel = document.createElement("select");
  fontSel.className = "fontier-sel";
  [
    ["normal", "Sans"],
    ["serif", "Serif"],
    ["monospace", "Mono"],
    ["script", "Script"],
  ].forEach(([v, l]) => {
    const o = document.createElement("option");
    o.value = v;
    o.textContent = l as string;
    fontSel.appendChild(o);
  });
  fontSel.value = current.font; // init
  fontSel.addEventListener("change", (e) => {
    e.stopPropagation();
    current.font = fontSel.value as Format["font"];
    restoreSelection();
  });

  const copyBtn = document.createElement("button");
  copyBtn.textContent = "Copy";
  copyBtn.className = "fontier-btn";
  copyBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const txt = getCachedText();
    if (!txt) return blink(copyBtn, false);
    const out = convertToUnicode(txt, current);
    try {
      await navigator.clipboard.writeText(out);
      blink(copyBtn, true);
    } catch {
      blink(copyBtn, false);
    }
    restoreSelection();
  });

  const replaceBtn = document.createElement("button");
  replaceBtn.textContent = "Replace";
  replaceBtn.className = "fontier-btn";
  replaceBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    doReplace();
    hideTray(); // commit + close
  });

  tray.append(
    bB,
    bI,
    bU,
    bS,
    divider(),
    sizeSel,
    fontSel,
    divider(),
    copyBtn,
    replaceBtn
  );
  document.documentElement.appendChild(tray);
  return tray;

  function divider() {
    const d = document.createElement("div");
    d.className = "fontier-divider";
    return d;
  }
};

const blink = (el: HTMLElement, ok: boolean) => {
  const old = el.textContent;
  el.textContent = ok ? "✓" : "✕";
  setTimeout(() => {
    el.textContent = old || "";
  }, 650);
};

const showTray = (rect: DOMRect) => {
  const t = ensureTray();
  const margin = 6;
  const maxLeft =
    window.scrollX + window.innerWidth - (t.offsetWidth || 240) - 8;
  const left = Math.min(Math.max(8, rect.left + window.scrollX), maxLeft);
  let top = rect.top + window.scrollY - (t.offsetHeight || 36) - margin;
  if (top < window.scrollY + 8) top = rect.bottom + window.scrollY + margin; // flip under if no room
  t.style.left = `${left}px`;
  t.style.top = `${top}px`;
  t.style.display = "flex";
};

const hideTray = () => {
  if (tray) tray.style.display = "none";
};

const doReplace = () => {
  if (!lastSel) return;
  const txt = getCachedText();
  if (!txt) return;
  const out = convertToUnicode(txt, current);

  if (lastSel.kind === "input") {
    const { el, start, end } = lastSel;
    el.focus();
    el.setSelectionRange(start, end);
    el.setRangeText(out, start, end, "end");
    el.dispatchEvent(new Event("input", { bubbles: true }));
    return;
  }

  const { el, range } = lastSel;
  const sel = window.getSelection();
  if (!sel) return;
  el.focus();
  sel.removeAllRanges();
  const r = range.cloneRange();
  sel.addRange(r);
  r.deleteContents();
  r.insertNode(document.createTextNode(out));
  r.collapse(false);
  sel.removeAllRanges();
  sel.addRange(r);
};

// ---------- track selection & show tray ----------
const updateSelectionCache = () => {
  const el = activeEditable();
  if (!el) {
    lastSel = null;
    hideTray();
    return;
  }

  if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
    const start = el.selectionStart ?? 0;
    const end = el.selectionEnd ?? 0;
    if (start === end) {
      lastSel = null;
      hideTray();
      return;
    }
    lastSel = { kind: "input", el, start, end };
    showTray(getSelectionRect(lastSel));
    return;
  }

  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0 || sel.isCollapsed) {
    lastSel = null;
    hideTray();
    return;
  }
  const r = sel.getRangeAt(0);
  if (!el.contains(r.commonAncestorContainer)) {
    lastSel = null;
    hideTray();
    return;
  }
  lastSel = { kind: "ce", el, range: r.cloneRange() };
  showTray(getSelectionRect(lastSel));
};

// events
document.addEventListener("selectionchange", updateSelectionCache);
document.addEventListener("mouseup", updateSelectionCache, true);
document.addEventListener("keyup", updateSelectionCache, true);

// hide when scrolling/clicking elsewhere (but not when using tray)
document.addEventListener("scroll", () => hideTray(), true);
document.addEventListener(
  "mousedown",
  (e) => {
    if (tray && e.target instanceof Node && tray.contains(e.target)) return;
    hideTray();
  },
  true
);

console.log("Content script loaded (Fontier, tray v3).");
