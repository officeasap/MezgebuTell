import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { MessageSquare, Plus, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// 🔑 Import service layer functions
import { sendSMS, getInbox } from "@/services/sms";

interface SMSRecord {
  id: string;
  number: string;
  message: string;
  timestamp: string;
  type: "sent" | "received";
}

export function SMSView() {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toNumber, setToNumber] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [smsList, setSmsList] = useState<SMSRecord[]>([]);

  // ✅ Fetch real SMS list from backend via service
  useEffect(() => {
    getInbox()
      .then((data) => setSmsList(data))
      .catch(() => setSmsList([]));
  }, []);

  // ✅ Use service layer for sending SMS
  const handleSend = async () => {
    if (!toNumber || !message) return;

    setIsSending(true);
    try {
      await sendSMS(toNumber, message);
      // Refresh inbox after sending
      const updated = await getInbox();
      setSmsList(updated);
    } finally {
      setIsSending(false);
      setIsModalOpen(false);
      setToNumber("");
      setMessage("");
    }
  };

  if (smsList.length === 0 && !isModalOpen) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="w-16 h-16 rounded-full bg-secondary/30 flex items-center justify-center mb-4">
          <MessageSquare className="w-8 h-8 text-muted-foreground icon-shadow" />
        </div>
        <p className="text-muted-foreground text-center">{t("sms.empty")}</p>
        <p className="text-sm text-muted-foreground/60 text-center mt-1">
          {t("sms.emptySubtitle")}
        </p>
        <Button variant="default" className="mt-6" onClick={() => setIsModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          {t("sms.newSms")}
        </Button>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">{t("sms.title")}</h2>
        <Button variant="default" size="default" onClick={() => setIsModalOpen(true)}>
          <Plus className="w-4 h-4 mr-1" />
          {t("sms.newSms")}
        </Button>
      </div>

      {/* SMS List */}
      <div className="space-y-2">
        {smsList.map((sms) => (
          <div key={sms.id} className="frame-glossy rounded-xl p-4 min-h-[72px]">
            <div className="flex items-start justify-between mb-2">
              <p className="font-medium text-foreground">{sms.number}</p>
              <span
                className={
                  sms.type === "sent"
                    ? "text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary"
                    : "text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground"
                }
              >
                {t(`sms.${sms.type}`)}
              </span>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">{sms.message}</p>
            <p className="text-xs text-muted-foreground/60 mt-2">{sms.timestamp}</p>
          </div>
        ))}
      </div>

      {/* New SMS Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          />
          <div className="relative z-10 w-full max-w-md bg-card border border-border rounded-t-2xl sm:rounded-2xl shadow-signature-lg animate-slide-up safe-area-bottom">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-border/30">
              <h3 className="text-lg font-semibold text-foreground">{t("sms.newSms")}</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-secondary/50 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">{t("sms.to")}</label>
                <Input
                  type="tel"
                  placeholder={t("sms.toPlaceholder")}
                  value={toNumber}
                  onChange={(e) => setToNumber(e.target.value)}
                  className="bg-background-secondary border-border"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground">{t("sms.message")}</label>
                  <span className="text-xs text-muted-foreground">
                    {t("sms.charCount", { count: message.length })}
                  </span>
                </div>
                <Textarea
                  placeholder={t("sms.messagePlaceholder")}
                  value={message}
                  onChange={(e) => setMessage(e.target.value.slice(0, 160))}
                  maxLength={160}
                  rows={4}
                  className="bg-background-secondary border-border resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button variant="default" className="flex-1" onClick={() => setIsModalOpen(false)}>
                  {t("sms.cancel")}
                </Button>
                <Button
                  variant="default"
                  className="flex-1"
                  onClick={handleSend}
                  disabled={!toNumber || !message || isSending}
                >
                  {isSending ? (
                    <span className="animate-pulse">{t("sms.send")}</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      {t("sms.send")}
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
