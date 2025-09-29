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
    <div className="flex items-center gap-3 px-5 py-3">
      <div
        className={`flex gap-1 p-1 rounded-lg ${
          isDark ? "bg-gray-800/50" : "bg-gray-100"
        }`}
      >
        {buttons.map(({ key, icon: Icon }) => (
          <button
            key={key}
            onClick={() => toggle(key as keyof TextFormat)}
            className={`p-2 rounded-md transition-all duration-200 ${
              format[key as keyof TextFormat]
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                : isDark
                ? "text-gray-400 hover:bg-gray-700 hover:text-gray-200"
                : "text-gray-600 hover:bg-white hover:text-gray-900"
            }`}
          >
            <Icon size={16} strokeWidth={2.5} />
          </button>
        ))}
      </div>

      <div className="flex gap-2 ml-auto">
        <select
          value={format.size}
          onChange={(e) => toggle("size", e.target.value)}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all duration-200 cursor-pointer ${
            isDark
              ? "bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-600"
              : "bg-white border-gray-200 text-gray-700 hover:border-gray-300 shadow-sm"
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
          className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all duration-200 cursor-pointer ${
            isDark
              ? "bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-600"
              : "bg-white border-gray-200 text-gray-700 hover:border-gray-300 shadow-sm"
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
