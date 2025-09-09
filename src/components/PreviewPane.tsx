interface PreviewPaneProps {
  convertedText: string;
  isDark: boolean;
}

const PreviewPane = ({ convertedText, isDark }: PreviewPaneProps) => {
  return (
    <div
      className={`p-4 rounded-lg border ${
        isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      }`}
    >
      <h3 className="font-semibold mb-3">Unicode Preview</h3>
      <div
        className={`p-4 rounded border min-h-64 ${
          isDark ? "bg-gray-900 border-gray-600" : "bg-gray-50 border-gray-200"
        }`}
      >
        <div className="whitespace-pre-wrap break-words font-mono text-sm leading-relaxed">
          {convertedText || "Your styled text will appear here..."}
        </div>
      </div>
      <p className="text-xs mt-2 opacity-60">
        This is how your text will look when pasted anywhere. Copy and paste
        into Twitter, LinkedIn, etc.
      </p>
    </div>
  );
};

export default PreviewPane;
