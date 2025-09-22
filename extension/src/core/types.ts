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

// Additional types for content script
export type InputSel = {
  kind: "input";
  el: HTMLInputElement | HTMLTextAreaElement;
  start: number;
  end: number;
};

export type CESel = {
  kind: "ce";
  el: HTMLElement;
  range: Range;
};

export type CachedSelection = InputSel | CESel | null;

// Simplified Format type without font and size options for the tray
export type TrayFormat = Omit<TextFormat, "font" | "size">;

export const DEFAULT_TRAY_FORMAT: TrayFormat = {
  bold: false,
  italic: false,
  underline: false,
  underlinePhrase: false,
  strikethrough: false,
};
