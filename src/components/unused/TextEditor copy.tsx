import type { TextFormat } from "../../core/types";

interface TextEditorProps {
  text: string;
  setText: (text: string) => void;
  format: TextFormat;
  isDark: boolean;
}

const TextEditor = ({ text, setText, format, isDark }: TextEditorProps) => {
  const getPreviewStyle = () => {
    let className =
      "w-full h-64 p-4 rounded-lg border resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 ";

    if (isDark) {
      className += "bg-gray-800 border-gray-600 text-white ";
    } else {
      className += "bg-white border-gray-300 text-gray-900 ";
    }

    if (format.bold) className += "font-bold ";
    if (format.italic) className += "italic ";
    if (format.underline) className += "underline ";
    if (format.strikethrough) className += "line-through ";

    switch (format.size) {
      case "h1":
        className += "text-3xl ";
        break;
      case "h2":
        className += "text-2xl ";
        break;
      case "h3":
        className += "text-xl ";
        break;
      case "h4":
        className += "text-lg ";
        break;
      default:
        className += "text-base ";
    }

    switch (format.font) {
      case "serif":
        className += "font-serif ";
        break;
      case "monospace":
        className += "font-mono ";
        break;
      case "script":
        className += "font-cursive ";
        break;
      default:
        className += "font-sans ";
    }

    return className;
  };

  return (
    <div
      className={`p-4 rounded-lg border ${
        isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      }`}
    >
      <h3 className="font-semibold mb-3">Edit Text</h3>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your text here..."
        className={getPreviewStyle()}
      />
      <p className="text-xs mt-2 opacity-60">
        Type and format your text. The preview will show how it looks with
        Unicode styling.
      </p>
    </div>
  );
};

export default TextEditor;
