import { Button } from "@/components/ui/button";
import type { TextFormat } from "../core/types";

interface FormattingToolbarProps {
  format: TextFormat;
  setFormat: (format: TextFormat) => void;
  isDark: boolean;
}

const FormattingToolbar = ({
  format,
  setFormat,
  isDark,
}: FormattingToolbarProps) => {
  const toggleFormat = (key: keyof TextFormat, value?: string | boolean) => {
    if (key === "size" || key === "font") {
      setFormat({ ...format, [key]: value });
    } else {
      setFormat({ ...format, [key]: !format[key] });
    }
  };

  const buttonClass = (isActive: boolean) =>
    `px-3 py-2 text-sm font-medium rounded transition-colors ${
      isActive
        ? "bg-blue-600 text-white hover:bg-blue-700"
        : isDark
        ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
    }`;

  return (
    <div
      className={`p-4 rounded-lg border ${
        isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      }`}
    >
      <div className="flex flex-wrap gap-2">
        {/* Text Style Buttons */}
        <Button
          onClick={() => toggleFormat("bold")}
          className={buttonClass(format.bold)}
          size="sm"
        >
          <span className="font-bold">B</span>
        </Button>

        <Button
          onClick={() => toggleFormat("italic")}
          className={buttonClass(format.italic)}
          size="sm"
        >
          <span className="italic">I</span>
        </Button>

        <Button
          onClick={() => toggleFormat("underline")}
          className={buttonClass(format.underline)}
          size="sm"
        >
          <span className="underline">U</span>
        </Button>

        <Button
          onClick={() => toggleFormat("strikethrough")}
          className={buttonClass(format.strikethrough)}
          size="sm"
        >
          <span className="line-through">S</span>
        </Button>

        {/* Size Dropdown */}
        <select
          value={format.size}
          onChange={(e) => toggleFormat("size", e.target.value)}
          className={`px-3 py-2 text-sm rounded border ${
            isDark
              ? "bg-gray-700 border-gray-600 text-white"
              : "bg-white border-gray-300 text-gray-900"
          }`}
        >
          <option value="normal">Normal</option>
          <option value="h1">H1 Large</option>
          <option value="h2">H2 Big</option>
          <option value="h3">H3 Medium</option>
          <option value="h4">H4 Small</option>
        </select>

        {/* Font Style Dropdown */}
        <select
          value={format.font}
          onChange={(e) => toggleFormat("font", e.target.value)}
          className={`px-3 py-2 text-sm rounded border ${
            isDark
              ? "bg-gray-700 border-gray-600 text-white"
              : "bg-white border-gray-300 text-gray-900"
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

export default FormattingToolbar;
