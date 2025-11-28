import { useState } from "react";
import { MessageSquare, Plus, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SMSMessage {
  id: string;
  number: string;
  message: string;
  timestamp: string;
  type: "sent" | "received";
}

const mockMessages: SMSMessage[] = [
  { id: "1", number: "+1 555 0123", message: "Hey, are you available for a call?", timestamp: "Today, 2:30 PM", type: "sent" },
  { id: "2", number: "+1 555 0456", message: "Thanks for calling back!", timestamp: "Today, 11:15 AM", type: "received" },
  { id: "3", number: "+1 555 0789", message: "Meeting rescheduled to 3 PM", timestamp: "Yesterday, 8:45 PM", type: "sent" },
];

export function SMSView() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toNumber, setToNumber] = useState("");
  const [messageText, setMessageText] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSend = async () => {
    if (!toNumber || !messageText) return;
    setIsSending(true);
    // Simulate API call - in production this would call POST /sms/send
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSending(false);
    setIsModalOpen(false);
    setToNumber("");
    setMessageText("");
  };

  return (
    <div className="px-4 py-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Messages</h2>
        <Button
          variant="default"
          size="sm"
          onClick={() => setIsModalOpen(true)}
          className="gap-2"
        >
          <Plus className="w-4 h-4" />
          New SMS
        </Button>
      </div>

      {mockMessages.length === 0 ? (
        <div className="frame-glossy p-8 text-center">
          <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-3 icon-shadow" />
          <p className="text-muted-foreground">No messages yet</p>
        </div>
      ) : (
        <div className="space-y-2">
          {mockMessages.map((sms, index) => (
            <div
              key={sms.id}
              className="frame-glossy p-4 animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex items-start justify-between mb-2">
                <p className="text-foreground font-medium">{sms.number}</p>
                <span className={cn(
                  "text-xs px-2 py-0.5 rounded-full",
                  sms.type === "sent" ? "bg-primary/20 text-primary" : "bg-secondary text-muted-foreground"
                )}>
                  {sms.type}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{sms.message}</p>
              <p className="text-xs text-muted-foreground/60">{sms.timestamp}</p>
            </div>
          ))}
        </div>
      )}

      {/* New SMS Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-background/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-card border border-border rounded-t-2xl shadow-signature-lg animate-slide-up">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="text-lg font-semibold text-foreground">New Message</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-secondary/50 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5 icon-shadow" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">To</label>
                <input
                  type="tel"
                  value={toNumber}
                  onChange={(e) => setToNumber(e.target.value)}
                  placeholder="+1 555 0000"
                  className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Message</label>
                <textarea
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Type your message..."
                  rows={4}
                  className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>
              <Button
                variant="default"
                size="lg"
                onClick={handleSend}
                disabled={!toNumber || !messageText || isSending}
                className="w-full gap-2"
              >
                {isSending ? (
                  <>
                    <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
