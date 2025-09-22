export const DEFAULT_FORMAT = {
  bold: false,
  italic: false,
  underline: false,
  underlinePhrase: false,
  strikethrough: false,
} as const;

export const TRAY_STYLES = {
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
} as const;

export const PREVIEW_STYLES = {
  fontSize: "12px",
  padding: "4px 8px",
  marginBottom: "6px",
  borderRadius: "4px",
  background: "#374151",
  maxWidth: "200px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
} as const;
