interface TextInputProps {
  text: string;
  setText: (v: string) => void;
  onCopy: () => void;
  isDark: boolean;
}

const TextInput = ({ text, setText, onCopy, isDark }: TextInputProps) => {
  return (
    <div className="p-4 pt-3">
      <div className="flex rounded-xl overflow-hidden border">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type here…"
          rows={2}
          className={`flex-1 px-3 py-2 resize-none text-sm outline-none transition-colors duration-200 ${
            isDark
              ? "bg-slate-800 text-slate-200 placeholder-slate-400 border-slate-700"
              : "bg-white text-slate-700 placeholder-slate-400 border-slate-200"
          }`}
        />
        <button
          onClick={onCopy}
          className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors duration-200 rounded-r-xl"
        >
          Copy
        </button>
      </div>
    </div>
  );
};

export default TextInput;
