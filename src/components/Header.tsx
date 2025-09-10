import { Moon, Sun, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenTipModal: () => void;
}

const Header = ({ isDark, onToggleTheme, onOpenTipModal }: HeaderProps) => {
  return (
    <header
      className={cn(
        "border-b",
        isDark ? "bg-[#2E323E] border-[#2E323E]" : "bg-white border-gray-200"
      )}
    >
      <div className="container mx-auto px-4 py-4 md:pl-16 flex items-center justify-between">
        {/* Left: logo + action buttons */}
        <div className="flex items-center w-full justify-between sm:justify-normal gap-6">
          <h1 className="text-2xl font-semibold font-[Itim,cursive] text-[#606060] dark:text-[#D0D0D0]">
            fontier
          </h1>

          <div className="flex items-center gap-4">
            <button
              onClick={onToggleTheme}
              className="text-[#606060] dark:text-[#D0D0D0] transition-transform hover:scale-105 focus:outline-none"
              aria-label="Toggle theme"
              title="Toggle theme"
            >
              {isDark ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </button>

            <button
              onClick={onOpenTipModal}
              className="text-[#606060] dark:text-[#D0D0D0] transition-transform hover:scale-105 focus:outline-none"
              aria-label="Show tips"
              title="Show tips"
            >
              <Lightbulb className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Right side: reserved for future features */}
        <div className="hidden sm:flex items-center space-x-3" />
      </div>
    </header>
  );
};

export default Header;
