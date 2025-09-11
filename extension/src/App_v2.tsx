import { useEffect, useMemo, useState } from "react";
import { Moon, Sun, Copy } from "lucide-react";
import { convertToUnicode } from "./core";
// ⬇️ update this path to match your extension folder structure
// e.g. "../core/converter" or "@/core/converter" if you have aliasing set up for the extension project
// import { convertToUnicode } from "../core/converter";

type Format = {
  bold: boolean;
  italic: boolean;
  underline: boolean;
  strikethrough: boolean;
};

const COLORS = {
  backgroundDark: "#2C2E3A",
  panelDark: "#2E323E",
  lightText: "#606060",
  darkText: "#D0D0D0",
};

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [text, setText] = useState("");
  const [format, setFormat] = useState<Format>({
    bold: false,
    italic: false,
    underline: false,
    strikethrough: false,
  });
  const [copied, setCopied] = useState(false);

  // v1 mapping → v2 TextFormat for the converter
  const textFormatForCore = useMemo(
    () => ({
      bold: format.bold,
      italic: format.italic,
      underline: format.underline,
      strikethrough: format.strikethrough,
      size: "normal" as const,
      font: "normal" as const,
    }),
    [format]
  );

  const converted = useMemo(
    () => convertToUnicode(text, textFormatForCore),
    [text, textFormatForCore]
  );

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1200);
    return () => clearTimeout(t);
  }, [copied]);

  const toggle = (key: keyof Format) =>
    setFormat((f) => ({ ...f, [key]: !f[key] }));

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(converted);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div
      className={`min-h-screen p-4 ${
        isDark ? "dark" : ""
      }`} /* Tailwind v4 uses class-based dark */
      style={{ width: 400 }}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4 px-2">
        <h1 className="text-2xl font-semibold font-[Itim,cursive] text-[#606060] dark:text-[#D0D0D0]">
          Fontier
        </h1>
        <button
          onClick={() => setIsDark((v) => !v)}
          className="text-xl text-[#606060] dark:text-[#D0D0D0] transition-transform hover:scale-105 focus:outline-none"
          aria-label="Toggle theme"
          title="Toggle theme"
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>

      {/* Output */}
      <div
        className={`w-full h-full p-3 rounded overflow-auto border min-h-[60px] ${
          isDark
            ? "bg-[#2E323E] border-gray-700 text-[#D0D0D0]"
            : "bg-white border-gray-200 text-[#606060]"
        }`}
        style={{ height: "100%", padding: "0.5rem", overflow: "auto" }}
      >
        <div className="whitespace-pre-wrap break-words">
          {converted || "Styled text appears here..."}
        </div>
      </div>

      {/* Buttons row (B / i / U / S) */}
      <div className="flex justify-around items-center my-4 gap-2">
        <IconToggle
          active={format.bold}
          onClick={() => toggle("bold")}
          label="B"
          className="font-bold"
          isDark={isDark}
        />
        <Divider />
        <IconToggle
          active={format.italic}
          onClick={() => toggle("italic")}
          label="i"
          className="italic"
          isDark={isDark}
        />
        <Divider />
        <IconToggle
          active={format.underline}
          onClick={() => toggle("underline")}
          label="U"
          className="underline"
          isDark={isDark}
        />
        <Divider />
        <IconToggle
          active={format.strikethrough}
          onClick={() => toggle("strikethrough")}
          label="S"
          className="line-through"
          isDark={isDark}
        />
      </div>

      {/* Textarea */}
      <div className="mb-2">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          placeholder="Type here..."
          className={`w-full resize-none p-3 rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
            isDark
              ? "bg-[#2E323E] text-[#D0D0D0] border border-gray-700"
              : "bg-white text-[#606060] border border-gray-200"
          }`}
          style={{ borderRadius: 4 }}
        />
      </div>

      {/* Copy button */}
      <div className="flex">
        <button
          onClick={handleCopy}
          className="text-xs mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded inline-flex items-center justify-center gap-2"
          style={{ width: "50%" }}
          title="Copy"
        >
          <Copy className="w-4 h-4" />
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      {/* page background (match v1) */}
      <style>{`
        :root {
          color-scheme: ${isDark ? "dark" : "light"};
        }
        body { background: ${isDark ? COLORS.backgroundDark : "#F9FAFB"}; }
      `}</style>
    </div>
  );
}

function Divider() {
  return <div className="h-4 w-[1px] bg-gray-300 dark:bg-gray-500" />;
}

function IconToggle({
  active,
  onClick,
  label,
  className = "",
  isDark,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  className?: string;
  isDark: boolean;
}) {
  const base = `
    text-lg h-10 w-10 grid place-content-center rounded
    transition-transform hover:scale-105 focus:outline-none
  `;
  const inactiveColor = isDark ? COLORS.darkText : COLORS.lightText;
  return (
    <button
      onClick={onClick}
      className={`${base} ${
        active ? "bg-blue-600 text-white" : ""
      } ${className}`}
      style={!active ? { color: inactiveColor } : undefined}
      aria-pressed={active}
    >
      {label}
    </button>
  );
}
