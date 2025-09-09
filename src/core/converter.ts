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
  UNDERLINE,
  STRIKETHROUGH,
} from "./maps";

// Helper function to apply a single Unicode transformation
const applyUnicodeTransformation = (
  text: string,
  map: Record<string, string>
): string => {
  return Array.from(text)
    .map((char) => map[char] || char)
    .join("");
};

// Helper function to apply underline or strikethrough
const applySpecialFormat = (
  text: string,
  formatChar: string,
  options: UnicodeTransformOptions = {}
): string => {
  const { skipSpacesForCombining = true } = options;

  return Array.from(text)
    .map((char) => {
      if (skipSpacesForCombining && /\s/.test(char)) {
        return char;
      }
      return char + formatChar;
    })
    .join("");
};

// Main conversion function
export const convertToUnicode = (
  text: string,
  format: TextFormat,
  options: UnicodeTransformOptions = {}
): string => {
  let result = text;

  // Apply font style first
  if (format.font === "serif") {
    result = applyUnicodeTransformation(result, SERIF);
  } else if (format.font === "monospace") {
    result = applyUnicodeTransformation(result, MONOSPACE);
  } else if (format.font === "script") {
    result = applyUnicodeTransformation(result, SCRIPT);
    // For script font, we don't apply other styles as they're not compatible
    return result;
  }

  // Apply size (if it's not normal and not script font)
  if (format.size === "h1") {
    result = applyUnicodeTransformation(result, H1);
    // For h1, we return immediately as it doesn't compose well with other styles
    return result;
  }

  // Apply bold and italic
  if (format.bold && format.italic) {
    result = applyUnicodeTransformation(result, BOLD_ITALIC);
  } else if (format.bold) {
    result = applyUnicodeTransformation(result, BOLD);
  } else if (format.italic) {
    result = applyUnicodeTransformation(result, ITALIC);
  }

  // Apply underline and strikethrough
  if (format.underline) {
    result = applySpecialFormat(result, UNDERLINE, options);
  }

  if (format.strikethrough) {
    result = applySpecialFormat(result, STRIKETHROUGH, options);
  }

  return result;
};

// Quick transformations for extension tray
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

// Normalize styled text back to ASCII
export const normalizeStyledText = (text: string): string => {
  // Create reverse mappings for all character sets
  const reverseMaps = new Map<string, string>();

  const addReverseMapping = (map: Record<string, string>) => {
    Object.entries(map).forEach(([original, styled]) => {
      reverseMaps.set(styled, original);
    });
  };

  addReverseMapping(BOLD);
  addReverseMapping(ITALIC);
  addReverseMapping(BOLD_ITALIC);
  addReverseMapping(SCRIPT);
  addReverseMapping(MONOSPACE);
  addReverseMapping(SERIF);
  addReverseMapping(H1);
  addReverseMapping(SANS);
  addReverseMapping(SANS_BOLD);

  // Remove combining characters and convert styled characters back to ASCII
  return Array.from(text)
    .filter((char) => char !== UNDERLINE && char !== STRIKETHROUGH)
    .map((char) => reverseMaps.get(char) || char)
    .join("");
};
