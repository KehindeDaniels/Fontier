import { cn } from "@/lib/utils";
import type { TextFormat } from "../core/types";

interface TextEditorProps {
  text: string;
  setText: (text: string) => void;
  format: TextFormat;
  isDark: boolean;
}

const TextEditor = ({ text, setText, format, isDark }: TextEditorProps) => {
  const base = cn(
    "w-full sm:h-[350px] mt-32 sm:mt-0 sm:w-1/2 p-4 shadow",
    "rounded-xl sm:rounded-lg",
    isDark ? "bg-[#2E323E]" : "bg-white"
  );

  const textarea = cn(
    "w-full resize-none sm:w-full h-10 sm:h-full py-2 px-8 rounded focus:outline-none transition-all",
    isDark ? "bg-[#2E323E] text-[#D0D0D0]" : "bg-white text-[#606060]"
  );

  const visual = cn(
    format.bold && "font-bold",
    format.italic && "italic",
    format.underline && "underline",
    format.strikethrough && "line-through",
    format.font === "serif"
      ? "font-serif"
      : format.font === "monospace"
      ? "font-mono"
      : "font-sans",
    format.size === "h1"
      ? "text-3xl"
      : format.size === "h2"
      ? "text-2xl"
      : format.size === "h3"
      ? "text-xl"
      : format.size === "h4"
      ? "text-lg"
      : "text-base"
  );

  return (
    <div className={base}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your text here..."
        className={cn(textarea, visual)}
      />
    </div>
  );
};

export default TextEditor;
