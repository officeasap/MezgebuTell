// src/components/layout/AppShell.tsx
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Phone, History, MessageSquare } from "lucide-react"; // ✅ removed User
import { cn } from "@/lib/utils";
import { LanguageToggle } from "@/components/LanguageToggle";

type Tab = "call" | "history" | "sms"; // ✅ no "account"

interface AppShellProps {
  children: ReactNode;
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export function AppShell({ children, activeTab, onTabChange }: AppShellProps) {
  const { t } = useTranslation();

  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: "call", label: t("tabs.call"), icon: Phone },
    { id: "history", label: t("tabs.history"), icon: History },
    { id: "sms", label: t("tabs.sms"), icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="px-4 py-3 border-b border-border/30 flex items-center justify-between">
        <div className="w-20" /> {/* Spacer for centering */}
        <h1 className="text-lg font-bold tracking-tight text-foreground">
          {t("app.name")}
        </h1>
        <LanguageToggle />
      </header>

      {/* Tab Navigation */}
      <nav className="px-2 py-2 border-b border-border/30">
        <div className="flex justify-around">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn("tab-item", activeTab === tab.id && "active")}
            >
              <tab.icon className="w-5 h-5 icon" />
              <span className="text-xs">{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="animate-fade-in">{children}</div>
      </main>

      {/* Footer Navigation */}
      <footer className="px-4 py-3 border-t border-border/30 bg-background-secondary/50 safe-area-bottom">
        <div className="flex justify-around">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex flex-col items-center gap-1 text-muted-foreground transition-colors min-w-[64px] min-h-[44px] justify-center",
                activeTab === tab.id && "text-primary"
              )}
            >
              <tab.icon className="w-5 h-5 icon-shadow" />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </footer>
    </div>
  );
}
