export * from "./types";
export * from "./maps";
export * from "./converter";

// (re)export concrete functions for convenient named imports
export {
  convertToUnicode,
  mapStringWithVariant,
  normalizeStyledText,
} from "./converter";
