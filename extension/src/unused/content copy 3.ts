// src/content.ts
import type { TextFormat } from "../core";
import { convertToUnicode, convertFromUnicode } from "../core/converter";

// Simplified Format type without font and size options
type Format = Omit<TextFormat, "font" | "size">;

const DEFAULT_FORMAT: Format = {
  bold: false,
  italic: false,
  underline: false,
  underlinePhrase: false,
  strikethrough: false,
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

// Check if text contains Unicode characters that we can convert back
const containsStyledUnicode = (text: string): boolean => {
  // Check for any characters from our unicode maps or combining marks
  const unicodePattern =
    /[\u0332\u0336\u2100-\u214F\u1D400-\u1D7FF\uFF00-\uFFEF]/;
  return unicodePattern.test(text);
};

// Restore the visual selection so it "hangs" while using the tray
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
let isReverseMode = false; // Track whether we're in reverse conversion mode

// Update preview when format changes
const updatePreview = () => {
  if (!tray) return;

  const previewEl = tray.querySelector(".fontier-preview") as HTMLElement;
  const reverseBtn = tray.querySelector(".fontier-reverse") as HTMLElement;
  const styleButtons = tray.querySelectorAll(".fontier-style-btn");

  if (!previewEl || !reverseBtn) return;

  const txt = getCachedText();
  if (!txt) {
    previewEl.textContent = "Select text to preview...";
    return;
  }

  try {
    let out: string;

    if (isReverseMode) {
      // Convert back to normal ASCII - ignore styling options
      out = convertFromUnicode(txt);
      reverseBtn.classList.add("active");

      // Disable style buttons in reverse mode
      styleButtons.forEach((btn) => {
        btn.classList.add("disabled");
        (btn as HTMLButtonElement).disabled = true;
      });
    } else {
      // Convert to styled Unicode - use styling options
      const formatToUse: TextFormat = {
        ...current,
        font: "normal",
        size: "normal",
      };
      out = convertToUnicode(txt, formatToUse);
      reverseBtn.classList.remove("active");

      // Enable style buttons in forward mode
      styleButtons.forEach((btn) => {
        btn.classList.remove("disabled");
        (btn as HTMLButtonElement).disabled = false;
      });
    }

    previewEl.textContent = out;
  } catch (e) {
    previewEl.textContent = "Error generating preview";
    console.error("Conversion error:", e);
  }
};

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
    flexDirection: "column",
  } as CSSStyleDeclaration);

  // Preview area
  const preview = document.createElement("div");
  preview.className = "fontier-preview";
  preview.textContent = "Select text to preview...";
  Object.assign(preview.style, {
    fontSize: "12px",
    padding: "4px 8px",
    marginBottom: "6px",
    borderRadius: "4px",
    background: "#374151",
    maxWidth: "200px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  });
  tray.appendChild(preview);

  // Controls container
  const controls = document.createElement("div");
  controls.className = "fontier-controls";
  Object.assign(controls.style, {
    display: "flex",
    alignItems: "center",
    gap: "6px",
  });
  tray.appendChild(controls);

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
    .fontier-btn.disabled{opacity:0.5;cursor:not-allowed}
    .fontier-divider{width:1px;height:16px;background:#4b5563;margin:0 4px}
  `;
  tray.appendChild(css);

  const mkToggle = (label: string, key: keyof Format) => {
    const b = document.createElement("button");
    b.textContent = label;
    b.className = "fontier-btn fontier-style-btn";
    b.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      // Don't allow style changes in reverse mode
      if (isReverseMode) return;

      current[key] = !current[key];
      b.classList.toggle("active", current[key]);
      restoreSelection();
      updatePreview();
    });
    return b;
  };

  // Reverse conversion button
  const reverseBtn = document.createElement("button");
  reverseBtn.textContent = "↺";
  reverseBtn.className = "fontier-btn fontier-reverse";
  reverseBtn.title = "Convert back to normal text";
  reverseBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    isReverseMode = !isReverseMode;
    reverseBtn.classList.toggle("active", isReverseMode);
    restoreSelection();
    updatePreview();
  });

  const bB = mkToggle("B", "bold");
  const bI = mkToggle("I", "italic");
  const bU = mkToggle("U", "underline");
  const bS = mkToggle("S", "strikethrough");

  const copyBtn = document.createElement("button");
  copyBtn.textContent = "Copy";
  copyBtn.className = "fontier-btn";
  copyBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const txt = getCachedText();
    if (!txt) return blink(copyBtn, false);

    let out: string;
    if (isReverseMode) {
      out = convertFromUnicode(txt);
    } else {
      const formatToUse: TextFormat = {
        ...current,
        font: "normal",
        size: "normal",
      };
      out = convertToUnicode(txt, formatToUse);
    }

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

  controls.append(
    reverseBtn,
    divider(),
    bB,
    bI,
    bU,
    bS,
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

  // Auto-detect if selected text contains styled unicode
  const txt = getCachedText();
  isReverseMode = containsStyledUnicode(txt);

  // Update preview when showing
  updatePreview();
};

const hideTray = () => {
  if (tray) tray.style.display = "none";
  // Reset reverse mode when hiding tray
  isReverseMode = false;
};

const doReplace = () => {
  if (!lastSel) return;
  const txt = getCachedText();
  if (!txt) return;

  let out: string;
  if (isReverseMode) {
    out = convertFromUnicode(txt);
  } else {
    const formatToUse: TextFormat = {
      ...current,
      font: "normal",
      size: "normal",
    };
    out = convertToUnicode(txt, formatToUse);
  }

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

// System theme detection for shadcn
const updateTrayTheme = () => {
  if (!tray) return;

  const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (isDark) {
    tray.style.background = "#1f2937";
    tray.style.color = "#fff";
    tray.style.borderColor = "#374151";
  } else {
    tray.style.background = "#fff";
    tray.style.color = "#000";
    tray.style.borderColor = "#e5e7eb";

    // Update CSS for light mode
    const lightCSS = `
      .fontier-btn { background: #f3f4f6; color: #000; border-color: #d1d5db; }
      .fontier-btn.active { background: #3b82f6; color: #fff; border-color: #3b82f6; }
      .fontier-btn.disabled { background: #f3f4f6; color: #9ca3af; }
      .fontier-divider { background: #d1d5db; }
      .fontier-preview { background: #f3f4f6; color: #000; }
    `;

    // Remove any existing light mode style
    const existingLightStyle = tray.querySelector(".fontier-light-style");
    if (existingLightStyle) {
      existingLightStyle.remove();
    }

    // Add light mode style
    const style = document.createElement("style");
    style.className = "fontier-light-style";
    style.textContent = lightCSS;
    tray.appendChild(style);
  }
};

// Listen for theme changes
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", updateTrayTheme);

console.log("Content script loaded (Fontier, with reverse conversion).");
