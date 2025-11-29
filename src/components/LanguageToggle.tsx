import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

export function LanguageToggle() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  const toggleLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("mezgebu-language", lang);
  };

  return (
    <div className="flex gap-3">
      {/* English Button */}
      <button
        onClick={() => toggleLanguage("en")}
        className={cn(
          "flex items-center justify-center px-3 py-2 transition-none",
          "bg-[#2c2a2c] rounded-[18px] shadow-[0_4px_10px_#d3f5da]",
          currentLang === "en" ? "opacity-100" : "opacity-70"
        )}
        aria-label="Switch to English"
      >
        <span className="text-2xl">🇬🇧</span>
      </button>

      {/* Amharic Button */}
      <button
        onClick={() => toggleLanguage("am")}
        className={cn(
          "flex items-center justify-center px-3 py-2 transition-none",
          "bg-[#2c2a2c] rounded-[18px] shadow-[0_4px_10px_#d3f5da]",
          currentLang === "am" ? "opacity-100" : "opacity-70"
        )}
        aria-label="Switch to Amharic"
      >
        <span className="text-2xl">🇪🇹</span>
      </button>
    </div>
  );
}
