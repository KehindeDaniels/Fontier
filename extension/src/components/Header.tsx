import { Moon, Sun } from "lucide-react";

interface HeaderProps {
  isDark: boolean;
  setIsDark: (v: boolean) => void;
}

const Header = ({ isDark, setIsDark }: HeaderProps) => {
  return (
    <div
      className={`px-5 py-4 border-b ${
        isDark ? "border-slate-800" : "border-slate-200"
      }`}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div
            className={`p-1.5 rounded-lg ${
              isDark ? "bg-blue-500/10" : "bg-blue-50"
            }`}
          >
            <img
              src="/icons/f128.png"
              alt="Fontier Logo"
              className="w-4 h-4 object-contain"
            />
          </div>
          <h1
            className={`text-xl font-semibold tracking-tight ${
              isDark ? "text-slate-100" : "text-slate-900"
            }`}
          >
            fontier
          </h1>
        </div>

        <button
          onClick={() => setIsDark(!isDark)}
          className={`p-2 rounded-lg transition-all duration-200 ${
            isDark
              ? "hover:bg-slate-800 text-slate-400 hover:text-slate-300"
              : "hover:bg-slate-100 text-slate-600 hover:text-slate-900"
          }`}
        >
          {isDark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};

export default Header;
