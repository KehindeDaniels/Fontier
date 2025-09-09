import { convertToUnicode as coreConvertToUnicode } from "../core/index";
import type { TextFormat } from "../core/types";
// Re-export the core function for backward compatibility
export const convertToUnicode = (text: string, format: TextFormat): string => {
  return coreConvertToUnicode(text, format);
};
