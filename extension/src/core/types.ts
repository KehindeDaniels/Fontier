export interface TextFormat {
  bold: boolean;
  italic: boolean;
  underline: boolean;
  underlinePhrase?: boolean;
  strikethrough: boolean;
  size: "normal" | "h1" | "h2" | "h3" | "h4" | "h5";
  font: "normal" | "serif" | "monospace" | "script";
}

export interface UnicodeTransformOptions {
  skipSpacesForCombining?: boolean;
}
