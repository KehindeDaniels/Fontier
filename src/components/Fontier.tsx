import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import FormattingToolbar from "./FormattingToolbar";
import TextEditor from "./TextEditor";
import PreviewPane from "./PreviewPane";
import { convertToUnicode } from "@/utils/unicodeConverter";
import { cn } from "@/lib/utils";
import type { TextFormat } from "../core/types";
import { Toaster } from "sonner"; // ⬅️ add this

const Fontier = () => {
  const [isDark, setIsDark] = useState(true);
  const [text, setText] = useState("");
  const [format, setFormat] = useState<TextFormat>({
    bold: false,
    italic: false,
    underline: false,
    strikethrough: false,
    size: "normal",
    font: "normal",
  });
  const [convertedText, setConvertedText] = useState("");

  useEffect(() => {
    setConvertedText(convertToUnicode(text, format));
  }, [text, format]);

  const toggleTheme = () => setIsDark((v) => !v);

  return (
    <div
      className={cn(
        "min-h-screen",
        isDark ? "bg-[#2C2E3A] text-white" : "bg-gray-100 text-gray-900"
      )}
    >
      {/* sonner host */}
      <Toaster richColors position="top-right" />

      {/* Header */}
      <header
        className={cn(
          "border-b",
          isDark ? "bg-[#2E323E] border-[#2E323E]" : "bg-white border-gray-200"
        )}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Left: logo + theme toggle */}
          <div className="flex items-center w-full justify-between sm:justify-normal gap-6">
            <h1 className="text-2xl font-semibold font-[Itim,cursive] text-[#606060] dark:text-[#D0D0D0]">
              fontier
            </h1>

            <button
              onClick={toggleTheme}
              className="text-[#606060] dark:text-[#D0D0D0] transition-transform hover:scale-105 focus:outline-none"
              aria-label="Toggle theme"
              title="Toggle theme"
            >
              {isDark ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Right side: (removed copy button) */}
          <div className="hidden sm:flex items-center space-x-3" />
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="relative">
          {/* Toolbar: absolute on mobile, static on desktop */}
          <div
            className={cn(
              "absolute left-0 right-0 z-20 px-3 w-full",
              "top-80", // 🔧 MOBILE offset: tweak up/down to sit above editor
              "sm:static sm:mt-2 sm:px-0" // desktop: normal flow above row
            )}
          >
            <FormattingToolbar
              format={format}
              setFormat={setFormat}
              isDark={isDark}
            />
          </div>

          {/* pad content so absolute toolbar doesn't overlap on mobile */}
          <div className="pt-[5.5rem] sm:pt-0">
            <div className="flex flex-col-reverse sm:flex-row justify-center mt-4 sm:mt-8 sm:space-x-8 space-y-4 sm:space-y-0">
              <TextEditor
                text={text}
                setText={setText}
                format={format}
                isDark={isDark}
              />

              <PreviewPane convertedText={convertedText} isDark={isDark} />
            </div>
          </div>
        </div>

        {/* Info section */}
        <div
          className={cn(
            "mt-8 p-4 rounded-lg border",
            isDark
              ? "bg-[#2E323E] border-[#2E323E]"
              : "bg-gray-100 border-gray-200"
          )}
        >
          <h3 className="font-semibold mb-2">How it works:</h3>
          <p className="text-sm opacity-75">
            Your formatted text is converted to Unicode characters that preserve
            styling even when pasted into platforms like Twitter, LinkedIn,
            Instagram, Discord, and WhatsApp that don&apos;t support HTML
            formatting.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Fontier;
