import { Phone, PhoneIncoming, PhoneOutgoing, PhoneMissed } from "lucide-react";
import { cn } from "@/lib/utils";

interface CallRecord {
  id: string;
  number: string;
  type: "incoming" | "outgoing" | "missed";
  duration: string;
  timestamp: string;
}

const mockHistory: CallRecord[] = [
  { id: "1", number: "+1 555 0123", type: "outgoing", duration: "2:34", timestamp: "Today, 2:30 PM" },
  { id: "2", number: "+1 555 0456", type: "incoming", duration: "5:12", timestamp: "Today, 11:15 AM" },
  { id: "3", number: "+1 555 0789", type: "missed", duration: "-", timestamp: "Yesterday, 8:45 PM" },
  { id: "4", number: "+1 555 0321", type: "outgoing", duration: "1:05", timestamp: "Yesterday, 3:20 PM" },
  { id: "5", number: "+1 555 0654", type: "incoming", duration: "8:47", timestamp: "Dec 26, 9:00 AM" },
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

interface CallHistoryProps {
  onCallBack: (number: string) => void;
}

export function CallHistory({ onCallBack }: CallHistoryProps) {
  return (
    <div className="px-4 py-4">
      <h2 className="text-lg font-semibold text-foreground mb-4">Call History</h2>
      
      {mockHistory.length === 0 ? (
        <div className="frame-glossy p-8 text-center">
          <Phone className="w-12 h-12 text-muted-foreground mx-auto mb-3 icon-shadow" />
          <p className="text-muted-foreground">No call history yet</p>
        </div>
      ) : (
        <div className="space-y-2">
          {mockHistory.map((call, index) => {
            const Icon = typeIcons[call.type];
            return (
              <button
                key={call.id}
                onClick={() => onCallBack(call.number.replace(/\s/g, ""))}
                className="w-full frame-glossy p-4 flex items-center gap-4 hover:bg-secondary/30 transition-colors animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center",
                  call.type === "missed" ? "bg-destructive/20" : "bg-primary/20"
                )}>
                  <Icon className={cn("w-5 h-5 icon-shadow", typeColors[call.type])} />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-foreground font-medium">{call.number}</p>
                  <p className="text-xs text-muted-foreground">{call.timestamp}</p>
                </div>
                <div className="text-right">
                  <p className={cn("text-sm", typeColors[call.type])}>
                    {call.type === "missed" ? "Missed" : call.duration}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
