import { Moon, Sun } from "lucide-react";

interface HeaderProps {
  isDark: boolean;
  setIsDark: (v: boolean) => void;
}

const Header = ({ isDark, setIsDark }: HeaderProps) => {
  return (
    <div className="flex justify-between items-center px-4 py-3 border-b border-slate-200/20">
      <h1 className="text-2xl font-normal font-[Itim,cursive] text-[#e8dede] dark:text-[#000000]">
        fontier
      </h1>

      <button
        onClick={() => setIsDark(!isDark)}
        className={`p-2 rounded-lg transition-colors duration-200 ${
          isDark
            ? "hover:bg-slate-700 text-slate-400 hover:text-slate-200"
            : "hover:bg-slate-100 text-slate-600 hover:text-slate-900"
        }`}
      >
        {isDark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
      </button>
    </div>
  );
};

export default Header;
