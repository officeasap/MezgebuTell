import { useTranslation } from 'react-i18next';
import { Phone, PhoneOff, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface IncomingCallModalProps {
  isOpen: boolean;
  callerName?: string;
  callerNumber: string;
  onAccept: () => void;
  onReject: () => void;
}

export function IncomingCallModal({
  isOpen,
  callerName,
  callerNumber,
  onAccept,
  onReject
}: IncomingCallModalProps) {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/90 backdrop-blur-sm" />
      
      {/* Modal */}
      <div className="relative z-10 w-full max-w-sm mx-4 animate-fade-in">
        <div className="frame-glossy rounded-2xl p-8 text-center">
          {/* Pulsing ring animation */}
          <div className="relative mx-auto mb-6 w-24 h-24">
            <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
            <div className="absolute inset-2 rounded-full bg-primary/30 animate-pulse" />
            <div className="absolute inset-4 rounded-full bg-background-secondary flex items-center justify-center shadow-signature">
              <User className="w-8 h-8 text-foreground icon-shadow" />
            </div>
          </div>

          {/* Call info */}
          <p className="text-sm text-primary font-semibold mb-2 tracking-wide">
            {t('incoming.call')}
          </p>
          
          {callerName && (
            <h2 className="text-2xl font-bold text-foreground mb-1">
              {callerName}
            </h2>
          )}
          
          <p className="text-lg text-muted-foreground font-medium mb-8">
            {callerNumber}
          </p>

          {/* Action buttons */}
          <div className="flex justify-center gap-8">
            <button
              onClick={onReject}
              className={cn(
                "flex flex-col items-center gap-2 group"
              )}
              aria-label={t('incoming.reject')}
            >
              <div className="w-16 h-16 rounded-full bg-destructive flex items-center justify-center shadow-signature transition-transform group-hover:scale-105 group-active:scale-95">
                <PhoneOff className="w-7 h-7 text-foreground" />
              </div>
              <span className="text-xs text-muted-foreground font-medium">
                {t('incoming.reject')}
              </span>
            </button>

            <button
              onClick={onAccept}
              className={cn(
                "flex flex-col items-center gap-2 group"
              )}
              aria-label={t('incoming.accept')}
            >
              <div className="w-16 h-16 rounded-full bg-green-600 flex items-center justify-center shadow-signature transition-transform group-hover:scale-105 group-active:scale-95 animate-pulse">
                <Phone className="w-7 h-7 text-foreground" />
              </div>
              <span className="text-xs text-muted-foreground font-medium">
                {t('incoming.accept')}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
