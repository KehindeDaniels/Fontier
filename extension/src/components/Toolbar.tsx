import type { TextFormat } from "@/core";
import { Bold, Italic, Underline, Strikethrough } from "lucide-react";

interface ToolbarProps {
  format: TextFormat;
  toggle: (key: keyof TextFormat, value?: string | boolean) => void;
  isDark: boolean;
}

const Toolbar = ({ format, toggle, isDark }: ToolbarProps) => {
  const buttons = [
    { key: "bold", icon: Bold },
    { key: "italic", icon: Italic },
    { key: "underline", icon: Underline },
    { key: "strikethrough", icon: Strikethrough },
  ];

  return (
    <div className="flex items-center gap-1 px-4 py-3">
      <div className="flex gap-1">
        {buttons.map(({ key, icon: Icon }) => (
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
  );
};

export default Toolbar;
