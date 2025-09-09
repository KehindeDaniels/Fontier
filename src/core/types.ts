export interface TextFormat {
  bold: boolean;
  italic: boolean;
  underline: boolean;
  strikethrough: boolean;
  size: "normal" | "h1" | "h2" | "h3" | "h4";
  font: "normal" | "serif" | "monospace" | "script";
}

export interface UnicodeTransformOptions {
  skipSpacesForCombining?: boolean;
}
