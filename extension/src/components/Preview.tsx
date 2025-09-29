interface PreviewProps {
  converted: string;
  isDark: boolean;
}

const Preview = ({ converted, isDark }: PreviewProps) => {
  return (
    <div className="px-4 flex-1">
      <div
        className={`h-full rounded-xl border p-3 overflow-y-auto text-sm transition-colors duration-200 ${
          isDark
            ? "bg-slate-800/50 text-slate-200 border-slate-700"
            : "bg-slate-50 text-slate-700 border-slate-200"
        }`}
      >
        {converted || (
          <span className="text-slate-400 italic">
            Styled text will appear here…
          </span>
        )}
      </div>
    </div>
  );
};

export default Preview;
