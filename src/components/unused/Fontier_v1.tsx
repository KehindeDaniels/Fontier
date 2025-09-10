import { useState, useEffect } from "react";
import { Moon, Sun, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import FormattingToolbar from "../FormattingToolbar";
import TextEditor from "../TextEditor";
import PreviewPane from "../PreviewPane";
import { convertToUnicode } from "@/utils/unicodeConverter";

import type { TextFormat } from "../../core/types";

const Fontier = () => {
  const [isDark, setIsDark] = useState(true);
  const [text, setText] = useState("This is an example");
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
    const converted = convertToUnicode(text, format);
    setConvertedText(converted);
  }, [text, format]);

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(convertedText);
      toast({
        title: "Copied!",
        description: "Styled text copied to clipboard",
      });
    } catch (error) {
      toast({
        // title: "Copy failed",
        title: error instanceof Error ? error.message : "Copy failed",
        description: "Unable to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Header */}
      <header
        className={`border-b transition-colors duration-300 ${
          isDark ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"
        }`}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold">fontier</h1>
          </div>

          <div className="flex items-center space-x-3">
            <Button
              onClick={handleCopyToClipboard}
              className="bg-blue-600 hover:bg-blue-700 text-white"
              size="sm"
            >
              <Copy className="w-4 h-4 mr-2" />
              copy style
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className={isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"}
            >
              {isDark ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {/* Formatting Toolbar */}
        <FormattingToolbar
          format={format}
          setFormat={setFormat}
          isDark={isDark}
        />

        {/* Two-pane editor */}
        <div className="grid lg:grid-cols-2 gap-6 mt-6">
          {/* Left Pane - Input */}
          <TextEditor
            text={text}
            setText={setText}
            format={format}
            isDark={isDark}
          />

          {/* Right Pane - Preview */}
          <PreviewPane convertedText={convertedText} isDark={isDark} />
        </div>

        {/* Info section */}
        <div
          className={`mt-8 p-4 rounded-lg ${
            isDark
              ? "bg-gray-800 border-gray-700"
              : "bg-gray-100 border-gray-200"
          } border`}
        >
          <h3 className="font-semibold mb-2">How it works:</h3>
          <p className="text-sm opacity-75">
            Your formatted text is converted to Unicode characters that preserve
            styling even when pasted into platforms like Twitter, LinkedIn,
            Instagram, Discord, and WhatsApp that don't support HTML formatting.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Fontier;
