import { ExternalLink } from "lucide-react";

interface FooterProps {
  isDark: boolean;
}

const Footer = ({ isDark }: FooterProps) => {
  return (
    <div
      className={`px-4 pb-3 text-center ${
        isDark ? "text-slate-400" : "text-slate-500"
      }`}
    >
      <p className="text-xs">
        Created by{" "}
        <span className="font-medium text-blue-500">Kehinde Daniels</span> •{" "}
        <a
          href="https://fontier-pied.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-blue-500 hover:text-blue-400 transition-colors duration-200"
        >
          Web App <ExternalLink className="w-3 h-3" />
        </a>
      </p>
    </div>
  );
};

export default Footer;
