import { useState, useEffect } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Lightbulb,
  Keyboard,
  Mouse,
  Monitor,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TipModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
}

const TipModal = ({ isOpen, onClose, isDark }: TipModalProps) => {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  const tips = [
    {
      icon: <Monitor className="w-5 h-5" />,
      text: "🪟 + V (Windows) or ⌘ + V (Mac) opens a clipboard manager to see recently copied items.",
    },
    {
      icon: <Keyboard className="w-5 h-5" />,
      text: "Ctrl + Shift + V (Windows) or ⌘ + Shift + V (Mac) pastes without formatting in many apps. Perfect for copying from the web into a document.",
    },
    {
      icon: <Mouse className="w-5 h-5" />,
      text: "Double-click a word to select it. Triple-click to select the entire paragraph.",
    },
    {
      icon: <Keyboard className="w-5 h-5" />,
      text: "Ctrl + D (Windows) or ⌘ + D (Mac) duplicates the current line in many code editors and word processors.",
    },
    {
      icon: <Keyboard className="w-5 h-5" />,
      text: "Ctrl + Backspace (Windows) or ⌘ + Backspace (Mac) deletes the previous entire word instead of just a single character.",
    },
    {
      icon: <Monitor className="w-5 h-5" />,
      text: "Alt + Tab (Windows) or ⌘ + Tab (Mac) lets you quickly switch between open applications.",
    },
    {
      icon: <Lightbulb className="w-5 h-5" />,
      text: "You're not copying Plain text, but Unicode characters!!!",
    },
    {
      icon: <Mouse className="w-5 h-5" />,
      text: "You can drag and drop text in many text editors to move it around easily.",
    },
    {
      icon: <Monitor className="w-5 h-5" />,
      text: "Windows Key + L (Windows) or Ctrl + ⌘ + Q (Mac) quickly locks your computer. Perfect for stepping away from your desk.",
    },
    {
      icon: <Monitor className="w-5 h-5" />,
      text: "Use Windows + Left/Right Arrow (Windows) or Control + ⌘ + F (Mac) to snap windows to the sides or full screen for multitasking.",
    },
  ];

  // Reset to first tip when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentTipIndex(0);
    }
  }, [isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "ArrowLeft" && currentTipIndex > 0) {
        setCurrentTipIndex(currentTipIndex - 1);
      } else if (e.key === "ArrowRight" && currentTipIndex < tips.length - 1) {
        setCurrentTipIndex(currentTipIndex + 1);
      } else if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentTipIndex, tips.length, onClose]);

  const goToPrevious = () => {
    if (currentTipIndex > 0) {
      setCurrentTipIndex(currentTipIndex - 1);
    }
  };

  const goToNext = () => {
    if (currentTipIndex < tips.length - 1) {
      setCurrentTipIndex(currentTipIndex + 1);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div
        className={cn(
          "relative w-full max-w-lg rounded-xl shadow-2xl border animate-in zoom-in-95 duration-200",
          isDark
            ? "bg-[#2E323E] border-[#404654] text-white"
            : "bg-white border-gray-200 text-gray-900"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-[#404654]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-yellow-500/20">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
            </div>
            <h2 className="text-xl font-semibold">Pro Tips</h2>
          </div>
          <button
            onClick={onClose}
            className={cn(
              "p-1 rounded-lg transition-colors",
              isDark
                ? "hover:bg-gray-700 text-gray-400 hover:text-white"
                : "hover:bg-gray-100 text-gray-500 hover:text-gray-700"
            )}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start gap-4 mb-6">
            <div
              className={cn(
                "p-2 rounded-lg mt-1",
                isDark
                  ? "bg-blue-500/20 text-blue-400"
                  : "bg-blue-500/20 text-blue-600"
              )}
            >
              {tips[currentTipIndex].icon}
            </div>
            <p className="text-sm leading-relaxed flex-1">
              {tips[currentTipIndex].text}
            </p>
          </div>

          {/* Progress indicators */}
          <div className="flex justify-center mb-4">
            <div className="flex gap-2">
              {tips.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTipIndex(index)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-colors",
                    index === currentTipIndex
                      ? "bg-blue-500"
                      : isDark
                      ? "bg-gray-600 hover:bg-gray-500"
                      : "bg-gray-300 hover:bg-gray-400"
                  )}
                />
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={goToPrevious}
              disabled={currentTipIndex === 0}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors",
                currentTipIndex === 0
                  ? "opacity-40 cursor-not-allowed"
                  : isDark
                  ? "hover:bg-gray-700 text-gray-300 hover:text-white"
                  : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
              )}
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>

            <div className="text-sm text-gray-500">
              {currentTipIndex + 1} of {tips.length}
            </div>

            <button
              onClick={goToNext}
              disabled={currentTipIndex === tips.length - 1}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors",
                currentTipIndex === tips.length - 1
                  ? "opacity-40 cursor-not-allowed"
                  : isDark
                  ? "hover:bg-gray-700 text-gray-300 hover:text-white"
                  : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
              )}
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Footer hint */}
        <div
          className={cn(
            "px-6 py-3 border-t text-xs text-center",
            isDark
              ? "border-[#404654] text-gray-400"
              : "border-gray-200 text-gray-500"
          )}
        >
          Use ← → arrow keys to navigate • Press Esc to close
        </div>
      </div>
    </div>
  );
};

export default TipModal;
