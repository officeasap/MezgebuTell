import { useTranslation } from 'react-i18next';

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

  // No demo UI, just return null
  if (!isOpen) return null;

  return null;
}
