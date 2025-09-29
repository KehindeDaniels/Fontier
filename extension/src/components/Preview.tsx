interface PreviewProps {
  converted: string;
  isDark: boolean;
}

const Preview = ({ converted, isDark }: PreviewProps) => {
  return (
    <div className="px-5 py-2 flex-1">
      <div
        className={`h-full rounded-xl p-4 overflow-y-auto text-sm transition-all duration-200 ${
          isDark
            ? "bg-gray-800/40 text-gray-200 border border-gray-700/50"
            : "bg-white text-gray-800 border border-gray-200 shadow-sm"
        }`}
      >
        {converted ? (
          <div className="leading-relaxed">{converted}</div>
        ) : (
          <div
            className={`h-full ${isDark ? "text-gray-500" : "text-gray-400"}`}
          >
            <span className="text-sm block">
              Your styled text appears here...
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Preview;
