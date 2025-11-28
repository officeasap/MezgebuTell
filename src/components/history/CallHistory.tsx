import { useTranslation } from "react-i18next";
import { PhoneIncoming, PhoneOutgoing, PhoneMissed, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

interface CallRecord {
  id: string;
  type: "incoming" | "outgoing" | "missed";
  number: string;
  duration: string;
  timestamp: string;
}

interface CallHistoryProps {
  onCallBack: (number: string) => void;
}

// Mock data
const mockHistory: CallRecord[] = [
  { id: "1", type: "outgoing", number: "+1 555 0123", duration: "2:34", timestamp: "10:30 AM" },
  { id: "2", type: "incoming", number: "+1 555 0456", duration: "5:12", timestamp: "9:15 AM" },
  { id: "3", type: "missed", number: "+1 555 0789", duration: "", timestamp: "Yesterday" },
  { id: "4", type: "outgoing", number: "+1 555 0321", duration: "1:05", timestamp: "Yesterday" },
];

const typeIcons = {
  incoming: PhoneIncoming,
  outgoing: PhoneOutgoing,
  missed: PhoneMissed,
};

const typeColors = {
  incoming: "text-primary",
  outgoing: "text-foreground",
  missed: "text-destructive",
};

export function CallHistory({ onCallBack }: CallHistoryProps) {
  const { t } = useTranslation();

  if (mockHistory.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="w-16 h-16 rounded-full bg-secondary/30 flex items-center justify-center mb-4">
          <Phone className="w-8 h-8 text-muted-foreground icon-shadow" />
        </div>
        <p className="text-muted-foreground text-center">{t('history.empty')}</p>
        <p className="text-sm text-muted-foreground/60 text-center mt-1">
          {t('history.emptySubtitle')}
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-lg font-semibold text-foreground px-1">{t('history.title')}</h2>
      
      <div className="space-y-2">
        {mockHistory.map((record) => {
          const Icon = typeIcons[record.type];
          const colorClass = typeColors[record.type];
          
          return (
            <button
              key={record.id}
              onClick={() => onCallBack(record.number)}
              className="w-full frame-glossy rounded-xl p-4 flex items-center gap-4 hover:bg-secondary/30 transition-colors min-h-[72px]"
            >
              <div className={cn("w-10 h-10 rounded-full bg-secondary/50 flex items-center justify-center", colorClass)}>
                <Icon className="w-5 h-5 icon-shadow" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-foreground">{record.number}</p>
                <p className="text-xs text-muted-foreground">
                  {t(`history.${record.type}`)} • {record.timestamp}
                  {record.duration && ` • ${record.duration}`}
                </p>
              </div>
              <Phone className="w-5 h-5 text-primary icon-shadow" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
