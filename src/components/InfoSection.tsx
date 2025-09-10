import { useState } from "react";
import { ChevronDown, ChevronUp, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface InfoSectionProps {
  isDark: boolean;
}

const InfoSection = ({ isDark }: InfoSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => setIsExpanded(!isExpanded);

  return (
    <div className="mt-8">
      {/* Button to toggle info */}
      <button
        onClick={toggleExpanded}
        className={cn(
          "w-full p-4 rounded-lg border transition-colors duration-200 flex items-center justify-between hover:opacity-80",
          isDark
            ? "bg-[#2E323E] border-[#2E323E] hover:bg-[#363A47]"
            : "bg-gray-100 border-gray-200 hover:bg-gray-200"
        )}
      >
        <div className="flex items-center gap-3">
          <Info className="w-5 h-5 text-blue-500" />
          <span className="font-semibold">How it works</span>
        </div>

        {isExpanded ? (
          <ChevronUp className="w-5 h-5 opacity-60" />
        ) : (
          <ChevronDown className="w-5 h-5 opacity-60" />
        )}
      </button>

      {/* Expandable content */}
      {isExpanded && (
        <div
          className={cn(
            "mt-2 p-4 rounded-lg border animate-in slide-in-from-top-2 duration-200",
            isDark
              ? "bg-[#2E323E] border-[#2E323E]"
              : "bg-gray-100 border-gray-200"
          )}
        >
          <p className="text-sm opacity-75">
            Your formatted text is converted to Unicode characters that preserve
            styling even when pasted into platforms like Twitter, LinkedIn,
            Instagram, Discord, and WhatsApp that don&apos;t support HTML
            formatting.
          </p>
        </div>
      )}
    </div>
  );
};

export default InfoSection;
