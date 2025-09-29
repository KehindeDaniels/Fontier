interface TextInputProps {
  text: string;
  setText: (v: string) => void;
  onCopy: () => void;
  isDark: boolean;
}

const TextInput = ({ text, setText, onCopy, isDark }: TextInputProps) => {
  return (
    <div className="px-5 py-3">
      <div
        className={`flex rounded-xl overflow-hidden border transition-all duration-200 ${
          isDark
            ? "border-gray-700 shadow-lg shadow-black/10"
            : "border-gray-200 shadow-md"
        }`}
      >
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your text here..."
          rows={2}
          className={`flex-1 px-4 py-3 resize-none text-sm outline-none transition-colors duration-200 ${
            isDark
              ? "bg-gray-800 text-gray-200 placeholder-gray-500"
              : "bg-white text-gray-800 placeholder-gray-400"
          }`}
        />
        <button
          onClick={onCopy}
          disabled={!text}
          className={`px-5 text-sm font-medium transition-all duration-200 ${
            text
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : isDark
              ? "bg-gray-700 text-gray-500 cursor-not-allowed"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          Copy
        </button>
      </div>
    </div>
  );
};

export default TextInput;
