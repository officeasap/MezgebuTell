import { useTranslation } from 'react-i18next';
import { Phone } from 'lucide-react';

interface DashboardNumberProps {
  number?: string;   // optional, defaults to MEZGEBU PHONE number
  balance?: string;  // optional, defaults to $0.06
}

export function DashboardNumber({
  number = '+1 579 900 5133',
  balance = '$0.06',
}: DashboardNumberProps) {
  const { t } = useTranslation();

  return (
    <div className="rounded-lg p-3 mb-3 border border-muted-foreground/20 space-y-3">
      {/* Your Number */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-secondary/60 flex items-center justify-center shadow-[0_3px_6px_#d3f5da]">
          <Phone className="w-4 h-4 text-foreground" />
        </div>
        <div>
          <p className="text-[10px] text-muted-foreground font-medium tracking-wide">
            Your Number
          </p>
          <p className="text-sm font-semibold text-foreground tracking-wide">
            {number}
          </p>
        </div>
      </div>

      {/* Available Balance */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-secondary/60 flex items-center justify-center shadow-[0_3px_6px_#d3f5da]">
          💵
        </div>
        <div>
          <p className="text-[10px] text-muted-foreground font-medium tracking-wide">
            Available Balance
          </p>
          <p className="text-sm font-semibold text-green-600 tracking-wide">
            {balance}
          </p>
        </div>
      </div>
    </div>
  );
}
