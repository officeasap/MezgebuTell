import { useTranslation } from 'react-i18next';
import { MessageSquare, X, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';

interface IncomingSMSNotificationProps {
  isOpen: boolean;
  senderName?: string;
  senderNumber: string;
  messagePreview: string;
  onView: () => void;
  onDismiss: () => void;
}

export function IncomingSMSNotification({
  isOpen,
  senderName,
  senderNumber,
  messagePreview,
  onView,
  onDismiss
}: IncomingSMSNotificationProps) {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div className="fixed top-4 left-4 right-4 z-50 animate-slide-down">
      <div className="frame-glossy rounded-xl p-4 max-w-md mx-auto">
        <div className="flex items-start gap-3">
          {/* Icon */}
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
            <MessageSquare className="w-5 h-5 text-primary icon-shadow" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs text-primary font-semibold tracking-wide">
                {t('incoming.sms')}
              </p>
              <button
                onClick={onDismiss}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label={t('incoming.dismiss')}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <p className="text-sm font-semibold text-foreground truncate">
              {senderName || senderNumber}
            </p>
            
            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
              {messagePreview}
            </p>

            {/* Actions */}
            <div className="flex gap-2 mt-3">
              <button
                onClick={onView}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-foreground text-xs font-medium rounded-lg shadow-signature transition-all hover:bg-primary-glow"
              >
                <Eye className="w-3.5 h-3.5" />
                {t('incoming.view')}
              </button>
              <button
                onClick={onDismiss}
                className="px-3 py-1.5 bg-secondary text-foreground text-xs font-medium rounded-lg shadow-signature transition-all hover:bg-secondary/80"
              >
                {t('incoming.dismiss')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
