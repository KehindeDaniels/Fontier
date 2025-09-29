import { ExternalLink } from "lucide-react";

interface FooterProps {
  isDark: boolean;
}

const Footer = ({ isDark }: FooterProps) => {
  return (
    <div className="px-5 pb-3 pt-1">
      <div
        className={`flex items-center justify-center gap-2 text-xs ${
          isDark ? "text-gray-500" : "text-gray-500"
        }`}
      >
        <span>Built by</span>
        <a
          href="https://kdanielsv1.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className={`font-medium transition-colors duration-200 ${
            isDark
              ? "text-gray-300 hover:text-blue-400"
              : "text-gray-700 hover:text-blue-600"
          }`}
        >
          Kehinde Daniels
        </a>
        <span>•</span>
        <a
          href="https://fontier-pied.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-1 font-medium transition-colors duration-200 ${
            isDark
              ? "text-blue-400 hover:text-blue-300"
              : "text-blue-600 hover:text-blue-700"
          }`}
        >
          Web App
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
};

export default Footer;
