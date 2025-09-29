import { useState, useEffect } from "react";
import { convertToUnicode } from "./core/converter";
import type { TextFormat } from "./core/types";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Moon,
  Sun,
  ExternalLink,
} from "lucide-react";
import { Toaster, toast } from "sonner";

const defaultFormat: TextFormat = {
  bold: false,
  italic: false,
  underline: false,
  strikethrough: false,
  size: "normal",
  font: "normal",
};

const Popup = () => {
  const [isDark, setIsDark] = useState(true);
  const [text, setText] = useState("");
  const [format, setFormat] = useState<TextFormat>(defaultFormat);
  const [converted, setConverted] = useState("");

  useEffect(() => {
    setConverted(convertToUnicode(text, format));
  }, [text, format]);

  const toggle = (key: keyof TextFormat, value?: string | boolean) => {
    setFormat((prev) => ({
      ...prev,
      [key]:
        value !== undefined ? (value as TextFormat[typeof key]) : !prev[key],
    }));
  };

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(converted || "");
      toast.success("Styled text copied!");
    } catch {
      toast.error("Copy failed");
    }
  };

  return (
    <div
      className={`w-[420px] h-[320px] flex flex-col  ${
        isDark
          ? "bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100"
          : "bg-gradient-to-br from-white to-slate-50 text-slate-900"
      }`}
    >
      {/* Toast host */}
      <Toaster richColors position="top-center" />

      {/* Header */}
      <div className="flex justify-between items-center px-4 py-3 border-b border-slate-200/20">
        <h1 className="text-2xl font-normal font-[Itim,cursive] text-[#e8dede] dark:text-[#000000]">
          fontier
        </h1>

        <button
          onClick={() => setIsDark((v) => !v)}
          className={`p-2 rounded-lg transition-colors duration-200 ${
            isDark
              ? "hover:bg-slate-700 text-slate-400 hover:text-slate-200"
              : "hover:bg-slate-100 text-slate-600 hover:text-slate-900"
          }`}
        >
          {isDark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-1 px-4 py-3">
        <div className="flex gap-1">
          {[
            { key: "bold", icon: Bold },
            { key: "italic", icon: Italic },
            { key: "underline", icon: Underline },
            { key: "strikethrough", icon: Strikethrough },
          ].map(({ key, icon: Icon }) => (
            <button
              key={key}
              onClick={() => toggle(key as keyof TextFormat)}
              className={`p-2 rounded-sm transition-all duration-200 ${
                format[key as keyof TextFormat]
                  ? "bg-blue-500 text-white shadow-md scale-95"
                  : isDark
                  ? "bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white"
                  : "bg-slate-200 text-slate-600 hover:bg-slate-300 hover:text-slate-900"
              }`}
            >
              <Icon size={14} />
            </button>
          ))}
        </div>

        <div className="flex gap-2 ml-auto">
          <select
            value={format.size}
            onChange={(e) => toggle("size", e.target.value)}
            className={`px-2 py-1.5 text-xs rounded-lg border transition-colors duration-200 ${
              isDark
                ? "bg-slate-800 border-slate-600 text-slate-200 hover:border-slate-500"
                : "bg-white border-slate-300 text-slate-700 hover:border-slate-400"
            }`}
          >
            <option value="normal">Normal</option>
            <option value="h1">H1</option>
            <option value="h2">H2</option>
            <option value="h3">H3</option>
            <option value="h4">H4</option>
          </select>

          <select
            value={format.font}
            onChange={(e) => toggle("font", e.target.value)}
            className={`px-2 py-1.5 text-xs rounded-lg border transition-colors duration-200 ${
              isDark
                ? "bg-slate-800 border-slate-600 text-slate-200 hover:border-slate-500"
                : "bg-white border-slate-300 text-slate-700 hover:border-slate-400"
            }`}
          >
            <option value="normal">Sans</option>
            <option value="serif">Serif</option>
            <option value="monospace">Mono</option>
            <option value="script">Script</option>
          </select>
        </div>
      </div>

      {/* Preview */}
      <div className="px-4 flex-1">
        <div
          className={`h-full rounded-xl border p-3 overflow-y-auto text-sm transition-colors duration-200 ${
            isDark
              ? "bg-slate-800/50 text-slate-200 border-slate-700"
              : "bg-slate-50 text-slate-700 border-slate-200"
          }`}
        >
          {converted || (
            <span className="text-slate-400 italic">
              Styled text will appear here…
            </span>
          )}
        </div>
      </div>

      {/* Input + Copy */}
      <div className="p-4 pt-3 ">
        <div className="flex rounded-xl overflow-hidden border">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type here…"
            rows={2}
            className={`flex-1 px-3 py-2 resize-none text-sm outline-none transition-colors duration-200 ${
              isDark
                ? "bg-slate-800 text-slate-200 placeholder-slate-400 border-slate-700"
                : "bg-white text-slate-700 placeholder-slate-400 border-slate-200"
            }`}
          />
          <button
            onClick={onCopy}
            className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors duration-200 rounded-r-xl"
          >
            Copy
          </button>
        </div>
      </div>

      {/* Footer */}
      <div
        className={`px-4 pb-3 text-center ${
          isDark ? "text-slate-400" : "text-slate-500"
        }`}
      >
        <p className="text-xs">
          Created by{" "}
          <span className="font-medium text-blue-500">Kehinde Daniels</span> •{" "}
          <a
            href="https://fontier-pied.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-blue-500 hover:text-blue-400 transition-colors duration-200"
          >
            Web App <ExternalLink className="w-3 h-3" />
          </a>
        </p>
      </div>
    </div>
  );
};

export default Popup;
