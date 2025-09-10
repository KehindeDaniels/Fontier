import { useState, useEffect } from "react";
import FormattingToolbar from "./FormattingToolbar";
import TextEditor from "./TextEditor";
import PreviewPane from "./PreviewPane";
import InfoSection from "./InfoSection";
import { convertToUnicode } from "@/utils/unicodeConverter";
import { cn } from "@/lib/utils";
import type { TextFormat } from "../core/types";
import { Toaster } from "sonner";
import TipModal from "./TipModal";
import Header from "./Header";

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
  const [isTipModalOpen, setIsTipModalOpen] = useState(false); // ← Added missing state

  useEffect(() => {
    setConvertedText(convertToUnicode(text, format));
  }, [text, format]);

  const toggleTheme = () => setIsDark((v) => !v);
  const openTipModal = () => setIsTipModalOpen(true); // ← Added missing function
  const closeTipModal = () => setIsTipModalOpen(false); // ← Added missing function

  return (
    <div
      className={cn(
        "min-h-screen",
        isDark ? "bg-[#2C2E3A] text-white" : "bg-gray-100 text-gray-900"
      )}
    >
      {/* sonner host */}
      <Toaster richColors position="top-right" />

      {/* Header Component */}
      <Header
        isDark={isDark}
        onToggleTheme={toggleTheme}
        onOpenTipModal={openTipModal}
      />

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

        {/* Info section component */}
        <InfoSection isDark={isDark} />
      </div>

      {/* Tip Modal */}
      <TipModal
        isOpen={isTipModalOpen}
        onClose={closeTipModal}
        isDark={isDark}
      />
    </div>
  );
};

export default Fontier;
