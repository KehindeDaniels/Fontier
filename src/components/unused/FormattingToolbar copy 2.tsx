import type { TextFormat } from "../../core/types";

interface FormattingToolbarProps {
  format: TextFormat;
  setFormat: (format: TextFormat) => void;
  isDark: boolean;
}

const FormattingToolbar = ({
  format,
  setFormat,
  isDark,
}: FormattingToolbarProps) => {
  const wrap = `
    flex gap-6 sm:order-none sm:flex-row order-2 justify-center sm:justify-end
    mt-4 sm:mt-0 sm:relative sm:top-auto sm:left-auto sm:right-8
    absolute left-0 right-0 top-[370px]
  `;
  const iconColor = isDark ? "text-[#D0D0D0]" : "text-[#606060]";
  const btn = `h-10 w-10 grid place-content-center transition-transform hover:scale-105 ${iconColor}`;
  const Divider = () => (
    <div className="h-4 w-[1px] bg-gray-300 dark:bg-gray-500" />
  );

  const toggle = (k: keyof TextFormat) =>
    setFormat({ ...format, [k]: !format[k] });

  return (
    <div className={wrap}>
      <div className="flex items-center gap-2">
        <button
          onClick={() => toggle("bold")}
          className={`${btn} font-bold`}
          title="Bold"
        >
          B
        </button>
        <Divider />
        <button
          onClick={() => toggle("italic")}
          className={`${btn} italic`}
          title="Italic"
        >
          i
        </button>
        <Divider />
        <button
          onClick={() => toggle("underline")}
          className={`${btn} underline`}
          title="Underline"
        >
          U
        </button>
        <Divider />
        <button
          onClick={() => toggle("strikethrough")}
          className={`${btn} line-through`}
          title="Strikethrough"
        >
          S
        </button>
        {/* Mono disabled (like v1) */}
        <Divider />
        <button
          className={`${btn} font-mono opacity-50`}
          title="Mono (coming soon)"
          disabled
        >{`{}`}</button>
      </div>
    </div>
  );
};

export default FormattingToolbar;
