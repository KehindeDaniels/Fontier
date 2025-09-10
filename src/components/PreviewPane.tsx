import { Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface PreviewPaneProps {
  convertedText: string;
  isDark: boolean;
}

const PreviewPane = ({ convertedText, isDark }: PreviewPaneProps) => {
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(convertedText || "");
      toast.success("Styled text copied to clipboard");
    } catch (e) {
      toast.error(
        e instanceof Error ? e.message : "Unable to copy to clipboard"
      );
    }
  };

  return (
    <div
      className={cn(
        "w-full sm:w-1/2 relative p-4 shadow",
        "rounded-2xl sm:rounded-lg",
        isDark ? "bg-[#2E323E]" : "bg-white"
      )}
    >
      {/* Copy button at top-right */}
      <button
        onClick={onCopy}
        className={cn(
          "absolute top-4 right-4 px-2 py-1 text-xs rounded transition-transform hover:scale-105",
          isDark ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-500"
        )}
        title="Copy style"
      >
        <span className="inline-flex items-center gap-1">
          <Copy className="w-3.5 h-3.5" />
          copy style
        </span>
      </button>

      <div
        className={cn(
          "p-4 h-full min-h-[200px]",
          "rounded-2xl sm:rounded-lg",
          isDark ? "text-[#D0D0D0] bg-[#2C2E3A]" : "text-[#606060] bg-gray-50"
        )}
      >
        <div className="whitespace-pre-wrap break-words">
          {convertedText || "Your styled text will appear here..."}
        </div>
      </div>
    </div>
  );
};

export default PreviewPane;
