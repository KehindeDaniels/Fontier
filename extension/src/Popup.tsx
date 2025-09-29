import { useState, useEffect } from "react";
import { convertToUnicode } from "./core/converter";
import type { TextFormat } from "./core/types";
import { Toaster, toast } from "sonner";
import Header from "./components/Header";
import Toolbar from "./components/Toolbar";
import Preview from "./components/Preview";
import TextInput from "./components/TextInput";
import Footer from "./components/Footer";

const defaultFormat: TextFormat = {
  bold: false,
  italic: false,
  underline: false,
  strikethrough: false,
  size: "normal",
  font: "normal",
};

const Popup = () => {
  const [isDark, setIsDark] = useState(true);
  const [text, setText] = useState("");
  const [format, setFormat] = useState<TextFormat>(defaultFormat);
  const [converted, setConverted] = useState("");

  useEffect(() => {
    setConverted(convertToUnicode(text, format));
  }, [text, format]);

  const toggle = (key: keyof TextFormat, value?: string | boolean) => {
    setFormat((prev) => ({
      ...prev,
      [key]:
        value !== undefined ? (value as TextFormat[typeof key]) : !prev[key],
    }));
  };

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(converted || "");
      toast.success("Styled text copied!");
    } catch {
      toast.error("Copy failed");
    }
  };

  return (
    <div
      className={`w-[420px] h-[320px] flex flex-col ${
        isDark
          ? "bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800"
          : "bg-gradient-to-br from-gray-50 via-white to-gray-100"
      }`}
    >
      <Toaster richColors position="top-center" />

      <Header isDark={isDark} setIsDark={setIsDark} />

      <Toolbar format={format} toggle={toggle} isDark={isDark} />

      <Preview converted={converted} isDark={isDark} />

      <TextInput
        text={text}
        setText={setText}
        onCopy={onCopy}
        isDark={isDark}
      />

      <Footer isDark={isDark} />
    </div>
  );
};

export default Popup;
