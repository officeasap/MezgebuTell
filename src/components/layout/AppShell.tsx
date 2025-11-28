import { ReactNode } from "react";
import { Phone, History, MessageSquare, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface AppShellProps {
  children: ReactNode;
  activeTab: "call" | "history" | "sms" | "account";
  onTabChange: (tab: "call" | "history" | "sms" | "account") => void;
}

const tabs = [
  { id: "call" as const, label: "CALL", icon: Phone },
  { id: "history" as const, label: "HISTORY", icon: History },
  { id: "sms" as const, label: "SMS", icon: MessageSquare },
  { id: "account" as const, label: "ACCOUNT", icon: User },
];

export function AppShell({ children, activeTab, onTabChange }: AppShellProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="px-4 py-4 text-center border-b border-border/30">
        <h1 className="text-xl font-bold tracking-tight text-foreground">
          MEZGEBU PHONE
        </h1>
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

      {/* Footer Navigation (redundancy) */}
      <footer className="px-4 py-3 border-t border-border/30 bg-background-secondary/50">
        <div className="flex justify-around">
          {tabs.slice(0, 3).map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex flex-col items-center gap-1 text-muted-foreground transition-colors",
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
