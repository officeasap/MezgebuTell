import { useTranslation } from "react-i18next";
import { CreditCard, Bitcoin, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BuyCredits() {
  const { t } = useTranslation();

  const handleVisa = () => {
    // In production: redirect to /payments/visa
    window.open("#visa-payment", "_blank");
  };

  const handleCrypto = () => {
    // In production: open CRYPTO_WALLET_URL
    window.open("#crypto-payment", "_blank");
  };

  return (
    <div className="p-4 space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">{t('account.title')}</h2>
        <p className="text-sm text-muted-foreground">{t('account.subtitle')}</p>
      </div>

      {/* Payment Options */}
      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="payment"
          className="h-auto py-6 flex-col gap-3"
          onClick={handleVisa}
        >
          <CreditCard className="w-8 h-8 icon-shadow" />
          <span className="font-semibold">{t('account.visa')}</span>
        </Button>

        <Button
          variant="payment"
          className="h-auto py-6 flex-col gap-3"
          onClick={handleCrypto}
        >
          <Bitcoin className="w-8 h-8 icon-shadow" />
          <span className="font-semibold">{t('account.crypto')}</span>
        </Button>
      </div>

      {/* QR Code Placeholder */}
      <div className="flex flex-col items-center py-6">
        <div className="w-48 h-48 rounded-xl border-2 border-dashed border-border flex items-center justify-center shadow-signature mb-4">
          <div className="text-center text-muted-foreground">
            <Bitcoin className="w-12 h-12 mx-auto mb-2 icon-shadow" />
            <span className="text-xs">QR Code</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground text-center">
          {t('account.qrLabel')}
        </p>
      </div>

      {/* Info Card */}
      <div className="frame-glossy rounded-xl p-4">
        <div className="flex gap-3">
          <Info className="w-5 h-5 text-primary flex-shrink-0 icon-shadow" />
          <p className="text-sm text-muted-foreground">
            {t('account.note')}
          </p>
        </div>
      </div>
    </div>
  );
}
