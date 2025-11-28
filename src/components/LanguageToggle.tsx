import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

export function LanguageToggle() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  const toggleLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('mezgebu-language', lang);
  };

  return (
    <div className="flex items-center gap-1 bg-background-secondary rounded-lg p-1">
      <button
        onClick={() => toggleLanguage('en')}
        className={cn(
          "flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium transition-all",
          currentLang === 'en'
            ? "bg-primary text-primary-foreground shadow-signature"
            : "text-muted-foreground hover:text-foreground"
        )}
        aria-label="Switch to English"
      >
        <span className="text-base">🇬🇧</span>
        <span className="hidden sm:inline">ENG</span>
      </button>
      <button
        onClick={() => toggleLanguage('am')}
        className={cn(
          "flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium transition-all",
          currentLang === 'am'
            ? "bg-primary text-primary-foreground shadow-signature"
            : "text-muted-foreground hover:text-foreground"
        )}
        aria-label="Switch to Amharic"
      >
        <span className="text-base">🇪🇹</span>
        <span className="hidden sm:inline">አማ</span>
      </button>
    </div>
  );
}
