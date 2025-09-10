import type { TextFormat, UnicodeTransformOptions } from "./types";
import {
  BOLD,
  ITALIC,
  BOLD_ITALIC,
  SCRIPT,
  MONOSPACE,
  SERIF,
  H1,
  SANS,
  SANS_BOLD,
  FULLWIDTH,
  UNDERLINE,
  STRIKETHROUGH,
  DOUBLESTRUCK,
} from "./maps";

const NBSP = "\u00A0";
const LOW_UNDERLINE = "\u0332";

/** Underline across spaces: convert " " -> NBSP and underline NBSPs too. */
const applyPhraseUnderline = (text: string): string => {
  return Array.from(text)
    .map((ch) => {
      if (ch === " " || ch === NBSP) {
        // keep the rule visually continuous through the gap
        return NBSP + LOW_UNDERLINE;
      }
      if (ch === "\n" || ch === "\r" || ch === "\t") {
        // don't underline hard whitespace / line breaks
        return ch;
      }
      return ch + LOW_UNDERLINE;
    })
    .join("");
};

/** Map a string with a given variant table */
const applyUnicodeTransformation = (
  text: string,
  map: Record<string, string>
): string =>
  Array.from(text)
    .map((ch) => map[ch] ?? ch)
    .join("");

/** Append a combining mark (underline/strikethrough) to each glyph */
const applySpecialFormat = (
  text: string,
  formatChar: string,
  options: UnicodeTransformOptions = {}
): string => {
  const { skipSpacesForCombining = true } = options;
  return Array.from(text)
    .map((ch) =>
      skipSpacesForCombining && /\s/.test(ch) ? ch : ch + formatChar
    )
    .join("");
};

/** Choose ONE base variant map */
const chooseVariant = (f: TextFormat): Record<string, string> | null => {
  // Exclusive fonts first
  if (f.font === "monospace") return MONOSPACE;
  if (f.font === "script") return SCRIPT;
  if (f.font === "serif") return SERIF;

  // Headings (distinct looks)
  if (f.size === "h1") return SANS_BOLD; // loud
  if (f.size === "h2") return BOLD; // strong serif bold
  if (f.size === "h3") return DOUBLESTRUCK; // very distinct
  if (f.size === "h4") return SANS; // clean sans
  if (f.size === "h5") return ITALIC; // subtle
  // h6/normal => fall through

  // Style (when not using the above)
  if (f.bold && f.italic) return BOLD_ITALIC;
  if (f.bold) return BOLD;
  if (f.italic) return ITALIC;

  return null; // identity
};

/** Main conversion: apply ONE base variant, then combining marks last */
export const convertToUnicode = (
  text: string,
  format: TextFormat,
  options: UnicodeTransformOptions = {}
): string => {
  let out = text;

  // 1) Base variant
  const base = chooseVariant(format);
  if (base) out = applyUnicodeTransformation(out, base);

  // 2) Underline (phrase mode first)
  if ("underlinePhrase" in format && format.underlinePhrase) {
    out = applyPhraseUnderline(out);
  } else if (format.underline) {
    out = applySpecialFormat(out, UNDERLINE, {
      ...options,
      skipSpacesForCombining: true,
    });
  }

  // 3) Strikethrough
  if (format.strikethrough) {
    const strikeOpts =
      "underlinePhrase" in format && format.underlinePhrase
        ? { ...options, skipSpacesForCombining: false } // also strike NBSPs
        : options;
    out = applySpecialFormat(out, STRIKETHROUGH, strikeOpts);
  }

  return out;
};

/** Force-map with a specific variant (e.g., from a tray action) */
export const mapStringWithVariant = (
  text: string,
  variantMap: Record<string, string>,
  combiningOptions?: { underline?: boolean; strikethrough?: boolean },
  options: UnicodeTransformOptions = {}
): string => {
  let result = applyUnicodeTransformation(text, variantMap);
  if (combiningOptions?.underline) {
    result = applySpecialFormat(result, UNDERLINE, options);
  }
  if (combiningOptions?.strikethrough) {
    result = applySpecialFormat(result, STRIKETHROUGH, options);
  }
  return result;
};

/** Normalize styled text back to ASCII */
export const normalizeStyledText = (text: string): string => {
  const reverse = new Map<string, string>();
  const add = (m: Record<string, string>) => {
    for (const [plain, styled] of Object.entries(m)) reverse.set(styled, plain);
  };

  add(BOLD);
  add(ITALIC);
  add(BOLD_ITALIC);
  add(SCRIPT);
  add(MONOSPACE);
  add(SERIF);
  add(H1);
  add(SANS);
  add(SANS_BOLD);
  add(FULLWIDTH);
  add(DOUBLESTRUCK);

  // Strip combining marks then reverse-map
  return Array.from(text.replace(/[\u0332\u0336]/g, ""))
    .map((ch) => reverse.get(ch) ?? ch)
    .join("");
};
