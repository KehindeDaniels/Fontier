import type { TextFormat } from "../core/types";

interface TextEditorProps {
  text: string;
  setText: (text: string) => void;
  format: TextFormat;
  isDark: boolean;
}

const TextEditor = ({ text, setText, format, isDark }: TextEditorProps) => {
  const base =
    "w-full sm:h-[350px] mt-16 sm:mt-0 sm:w-1/2 p-4 bg-white dark:bg-[#2E323E] sm:rounded-lg rounded-full shadow";
  const textarea =
    "w-full resize-none sm:w-full h-10 sm:h-full py-2 px-8 rounded focus:outline-none bg-[#FFFFFF] dark:bg-[#2E323E] " +
    "text-[#606060] dark:text-[#D0D0D0] transition-all";

  // purely visual preview classes (like v1) applied to textarea text
  const visual = [
    format.bold ? "font-bold" : "",
    format.italic ? "italic" : "",
    format.underline ? "underline" : "",
    format.strikethrough ? "line-through" : "",
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
      : "text-base",
  ].join(" ");

  return (
    <div className={base}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your text here..."
        className={`${textarea} ${visual}`}
      />
    </div>
  );
};

export default TextEditor;
