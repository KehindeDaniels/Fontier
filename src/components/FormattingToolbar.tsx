import { Button } from "@/components/ui/button";
import type { TextFormat } from "../core/types";

interface FormattingToolbarProps {
  format: TextFormat;
  setFormat: (format: TextFormat) => void;
  isDark: boolean;
}

const Divider = () => <div className="h-4 w-px bg-gray-300 dark:bg-gray-500" />;

const FormattingToolbar = ({
  format,
  setFormat,
  isDark,
}: FormattingToolbarProps) => {
  const toggleFormat = (key: keyof TextFormat, value?: string | boolean) => {
    if (key === "size" || key === "font") {
      setFormat({ ...format, [key]: value as TextFormat[typeof key] });
    } else {
      setFormat({ ...format, [key]: !format[key] });
    }
  };

  return (
    <div
      className={`

        absolute top-80 left-0 right-0 z-20 px-3
        w-full
      
        sm:top-2   /* 💡 tweak this value for desktop */
      `}
    >
      <div
        className={`
          mx-auto w-full max-w-[95%]
          rounded-lg border shadow
          ${
            isDark
              ? "bg-[#2E323E]/90 border-gray-700"
              : "bg-white/95 border-gray-200"
          }
          backdrop-blur px-2 py-1
        `}
      >
        <div className="w-full flex items-center gap-1 flex-wrap justify-center sm:justify-start">
          {/* Bold */}
          <Button
            onClick={() => toggleFormat("bold")}
            className={`h-8 w-8 sm:h-9 sm:w-9 grid place-content-center rounded transition-transform hover:scale-105 focus:outline-none focus:ring-0 ${
              format.bold ? "bg-blue-600 text-white hover:scale-[1.03]" : ""
            }`}
            size="sm"
            variant="ghost"
          >
            <span className="font-bold">B</span>
          </Button>

          <Divider />

          {/* Italic */}
          <Button
            onClick={() => toggleFormat("italic")}
            className={`h-8 w-8 sm:h-9 sm:w-9 grid place-content-center rounded transition-transform hover:scale-105 focus:outline-none focus:ring-0 ${
              format.italic ? "bg-blue-600 text-white hover:scale-[1.03]" : ""
            }`}
            size="sm"
            variant="ghost"
          >
            <span className="italic">i</span>
          </Button>

          <Divider />

          {/* Underline */}
          <Button
            onClick={() => toggleFormat("underline")}
            className={`h-8 w-8 sm:h-9 sm:w-9 grid place-content-center rounded transition-transform hover:scale-105 focus:outline-none focus:ring-0 ${
              format.underline
                ? "bg-blue-600 text-white hover:scale-[1.03]"
                : ""
            }`}
            size="sm"
            variant="ghost"
          >
            <span className="underline">U</span>
          </Button>

          <Divider />

          {/* Strikethrough */}
          <Button
            onClick={() => toggleFormat("strikethrough")}
            className={`h-8 w-8 sm:h-9 sm:w-9 grid place-content-center rounded transition-transform hover:scale-105 focus:outline-none focus:ring-0 ${
              format.strikethrough
                ? "bg-blue-600 text-white hover:scale-[1.03]"
                : ""
            }`}
            size="sm"
            variant="ghost"
          >
            <span className="line-through">S</span>
          </Button>

          {/* Spacer for selects */}
          <div className="grow basis-full sm:grow-0 sm:basis-auto sm:w-2" />

          {/* Size */}
          <select
            value={format.size}
            onChange={(e) => toggleFormat("size", e.target.value)}
            className={`
              px-2 py-1 text-xs sm:text-sm rounded border
              ${
                isDark
                  ? "bg-[#2E323E] border-gray-600 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              }
              focus:outline-none shrink-0 w-24 sm:w-28
            `}
          >
            <option value="normal">Normal</option>
            <option value="h1">H1 Large</option>
            <option value="h2">H2 Big</option>
            <option value="h3">H3 Medium</option>
            <option value="h4">H4 Small</option>
          </select>

          {/* Font */}
          <select
            value={format.font}
            onChange={(e) => toggleFormat("font", e.target.value)}
            className={`
              px-2 py-1 text-xs sm:text-sm rounded border ml-1
              ${
                isDark
                  ? "bg-[#2E323E] border-gray-600 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              }
              focus:outline-none shrink-0 w-20 sm:w-28
            `}
          >
            <option value="normal">Sans</option>
            <option value="serif">Serif</option>
            <option value="monospace">Mono</option>
            <option value="script">Script</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FormattingToolbar;
