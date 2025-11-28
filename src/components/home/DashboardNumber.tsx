import { useTranslation } from 'react-i18next';
import { Phone } from 'lucide-react';

interface DashboardNumberProps {
  number: string;
}

export function DashboardNumber({ number }: DashboardNumberProps) {
  const { t } = useTranslation();

  return (
    <div className="frame-glossy rounded-xl p-4 mb-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
          <Phone className="w-5 h-5 text-primary icon-shadow" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground font-medium tracking-wide">
            {t('balance.yourNumber')}
          </p>
          <p className="text-lg font-bold text-foreground tracking-wide text-shadow-signature">
            {number}
          </p>
        </div>
      </div>
    </div>
  );
}
